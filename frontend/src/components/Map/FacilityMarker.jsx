import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { createCategoryMarkerIcon } from './mapConfig';
import MapPopup from './MapPopup';

export default function FacilityMarker({ 
  facility, 
  isSelected = false, 
  onSelect, 
  onFindAround 
}) {
  if (!facility || !facility.coordinates || facility.coordinates.length < 2) {
    return null;
  }

  const icon = createCategoryMarkerIcon(facility, { isSelected });

  return (
    <Marker
      position={facility.coordinates}
      icon={icon}
      eventHandlers={{
        click: () => onSelect(facility)
      }}
    >
      <Popup 
        className="anthoor-custom-popup"
        autoPan={true}
        autoPanPaddingTopLeft={[50, 260]}
        autoPanPaddingBottomRight={[50, 60]}
      >
        <MapPopup 
          facility={facility} 
          onSelect={onSelect} 
          onFindAround={onFindAround} 
        />
      </Popup>
    </Marker>
  );
}
