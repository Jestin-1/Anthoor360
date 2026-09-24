import React from 'react';
import { Polygon, Tooltip } from 'react-leaflet';
import { MUNICIPALITY_INFO } from '../../data/anthoorData';
import { useLanguage } from '../../context/LanguageContext';

export default function MunicipalityBoundary({ visible = true, maskOutside = true }) {
  const { language } = useLanguage();
  if (!visible) return null;

  // Inverse GIS World Mask: outer world box with Anthoor inner hole
  // This shades/masks everything outside Anthoor, spotlighting ONLY the municipality
  const worldMaskPositions = [
    [
      [-90, -180],
      [-90, 180],
      [90, 180],
      [90, -180],
      [-90, -180]
    ],
    MUNICIPALITY_INFO.boundaryPolygon
  ];

  return (
    <>
      {/* 1. External Dimming Mask: Highlights ONLY Anthoor Municipality */}
      {maskOutside && (
        <Polygon
          positions={worldMaskPositions}
          pathOptions={{
            stroke: false,
            fillColor: '#0F172A',
            fillOpacity: 0.62,
            interactive: false
          }}
        />
      )}

      {/* 2. Official Municipality Perimeter Outline */}
      <Polygon
        positions={MUNICIPALITY_INFO.boundaryPolygon}
        pathOptions={{
          color: '#10B981',
          weight: 3,
          opacity: 0.95,
          fillColor: '#059669',
          fillOpacity: 0.05,
          dashArray: '8, 6'
        }}
      >
        <Tooltip sticky direction="top" className="boundary-tooltip">
          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#064E3B' }}>
            {language === 'ml' ? 'ആന്തൂർ നഗരസഭാ അതിർത്തി' : 'Anthoor Municipality Boundary'}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
            {language === 'ml' ? 'വിസ്തൃതി: 23.47 ച.കി.മീ • 28 വാർഡുകൾ' : 'Area: 23.47 sq.km • 28 Wards'}
          </div>
        </Tooltip>
      </Polygon>
    </>
  );
}
