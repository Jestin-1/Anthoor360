import React from 'react';
import { Polyline, Tooltip, Popup } from 'react-leaflet';
import { ANTHOOR_ROADS } from '../../data/roadsData';
import { useLanguage } from '../../context/LanguageContext';
import { Route, MapPin } from 'lucide-react';

export default function RoadLayer({ visible = true, onSelectRoad }) {
  const { language } = useLanguage();
  if (!visible) return null;

  return (
    <>
      {ANTHOOR_ROADS.map((road) => {
        const displayName = language === 'ml' && road.name_ml ? road.name_ml : road.name;
        const displayType = language === 'ml' && road.type_ml ? road.type_ml : road.type;

        return (
          <Polyline
            key={`road-${road.id}`}
            positions={road.coordinates}
            pathOptions={{
              color: road.color,
              weight: road.weight,
              opacity: 0.88,
              dashArray: road.dashArray
            }}
            eventHandlers={{
              click: () => onSelectRoad && onSelectRoad(road)
            }}
          >
            <Tooltip sticky direction="top">
              <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0F172A' }}>
                {displayName}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                {displayType} • {road.lengthKm} km
              </div>
            </Tooltip>

            <Popup>
              <div style={{ minWidth: '210px', padding: '4px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: '#F1F5F9',
                  color: road.color,
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  marginBottom: '4px'
                }}>
                  <Route size={11} />
                  <span>{displayType}</span>
                </div>

                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, margin: '2px 0 6px 0', color: '#0F172A' }}>
                  {displayName}
                </h4>

                <p style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.4, margin: '0 0 8px 0' }}>
                  {road.description}
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 8px',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '6px',
                  fontSize: '0.74rem',
                  color: '#64748B'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={11} color="#059669" />
                    <span>{road.wards}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: '#0F172A' }}>{road.lengthKm} km</span>
                </div>
              </div>
            </Popup>
          </Polyline>
        );
      })}
    </>
  );
}
