import React from 'react';
import { Polygon, Tooltip, Popup } from 'react-leaflet';
import { ANTHOOR_NATURAL_FEATURES } from '../../data/naturalFeaturesData';
import { useLanguage } from '../../context/LanguageContext';
import { Waves, Trees } from 'lucide-react';

export default function WaterwaysLayer({ visible = true, onSelectFeature }) {
  const { language } = useLanguage();

  if (!visible) return null;

  return (
    <>
      {ANTHOOR_NATURAL_FEATURES.map((feature) => (
        <Polygon
          key={feature.id}
          positions={feature.polygon}
          pathOptions={{
            color: feature.color,
            fillColor: feature.fillColor,
            fillOpacity: feature.fillOpacity,
            weight: feature.weight
          }}
          eventHandlers={{
            click: () => {
              if (onSelectFeature) onSelectFeature(feature);
            }
          }}
        >
          <Tooltip sticky direction="center">
            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: feature.color }}>
              {language === 'ml' ? feature.name_ml : feature.name}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
              {language === 'ml' ? feature.type_ml : feature.type}
            </div>
          </Tooltip>
          <Popup>
            <div style={{ minWidth: '220px', padding: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  backgroundColor: `${feature.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: feature.color
                }}>
                  {feature.id.includes('wetland') ? <Trees size={16} /> : <Waves size={16} />}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>
                    {language === 'ml' ? feature.name_ml : feature.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: feature.color, fontWeight: 600 }}>
                    {language === 'ml' ? feature.type_ml : feature.type}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.78rem', color: '#475569', margin: '4px 0 0 0', lineHeight: '1.4' }}>
                {language === 'ml' ? feature.description_ml : feature.description}
              </p>
            </div>
          </Popup>
        </Polygon>
      ))}
    </>
  );
}
