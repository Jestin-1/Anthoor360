import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useMap, Marker } from 'react-leaflet';
import Supercluster from 'supercluster';
import FacilityMarker from './FacilityMarker';
import { createClusterMarkerIcon } from './mapConfig';

export default function MarkerClusterGroup({
  facilities = [],
  selectedFacility = null,
  onSelectFacility,
  onFindAround
}) {
  const map = useMap();

  // Transform facilities into GeoJSON Feature array for Supercluster
  const points = useMemo(() => {
    return facilities
      .filter(f => f.coordinates && f.coordinates.length === 2 && !isNaN(f.coordinates[0]) && !isNaN(f.coordinates[1]))
      .map(f => ({
        type: 'Feature',
        properties: {
          cluster: false,
          facilityId: f.id,
          facility: f
        },
        geometry: {
          type: 'Point',
          coordinates: [f.coordinates[1], f.coordinates[0]] // [lng, lat] for GeoJSON
        }
      }));
  }, [facilities]);

  // Create Supercluster index
  const superclusterIndex = useMemo(() => {
    const index = new Supercluster({
      radius: 45,
      maxZoom: 15, // At zoom 16+, all markers expand into individual category pins
      minPoints: 2
    });
    index.load(points);
    return index;
  }, [points]);

  // Function to calculate clusters in current viewport
  const getVisibleClusters = useCallback(() => {
    if (!map) return [];
    try {
      const bounds = map.getBounds();
      const zoom = Math.floor(map.getZoom());
      const bbox = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth()
      ];
      return superclusterIndex.getClusters(bbox, zoom);
    } catch {
      return points;
    }
  }, [map, superclusterIndex, points]);

  // Initialize clusters directly from current viewport
  const [clusters, setClusters] = useState(() => getVisibleClusters());

  // Listen to map movement and zoom events to update visible clusters
  useEffect(() => {
    const handleMapChange = () => {
      setClusters(getVisibleClusters());
    };

    map.on('moveend', handleMapChange);
    map.on('zoomend', handleMapChange);

    return () => {
      map.off('moveend', handleMapChange);
      map.off('zoomend', handleMapChange);
    };
  }, [map, getVisibleClusters]);

  // Handle clicking on a cluster to zoom in
  const handleClusterClick = useCallback((clusterId, latitude, longitude) => {
    try {
      const expansionZoom = Math.min(
        superclusterIndex.getClusterExpansionZoom(clusterId),
        17
      );
      map.flyTo([latitude, longitude], expansionZoom, {
        duration: 0.8
      });
    } catch {
      map.flyTo([latitude, longitude], map.getZoom() + 2);
    }
  }, [map, superclusterIndex]);

  return (
    <>
      {clusters.map((item) => {
        const [longitude, latitude] = item.geometry.coordinates;
        const isCluster = item.properties.cluster;

        if (isCluster) {
          const clusterId = item.properties.cluster_id;
          const pointCount = item.properties.point_count;
          const clusterIcon = createClusterMarkerIcon(pointCount);

          return (
            <Marker
              key={`cluster-${clusterId}-${latitude}-${longitude}`}
              position={[latitude, longitude]}
              icon={clusterIcon}
              eventHandlers={{
                click: () => handleClusterClick(clusterId, latitude, longitude)
              }}
            />
          );
        }

        // Individual facility pin
        const facility = item.properties.facility;
        if (!facility) return null;

        const isSelected = selectedFacility && selectedFacility.id === facility.id;

        return (
          <FacilityMarker
            key={`facility-${facility.id}`}
            facility={facility}
            isSelected={isSelected}
            onSelect={onSelectFacility}
            onFindAround={onFindAround}
          />
        );
      })}
    </>
  );
}
