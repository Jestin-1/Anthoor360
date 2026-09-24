import React from 'react';
import { Polygon, Marker, Tooltip, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { WARDS } from '../../data/anthoorData';
import { useLanguage } from '../../context/LanguageContext';
import { Users, Phone, Building2, ExternalLink } from 'lucide-react';

// Generates an approximate polygon ring around a ward's centroid coordinates
function generateWardPolygon(lat, lng, number) {
  const radiusLat = 0.0035;
  const radiusLng = 0.0042;
  const points = 7;
  const angleOffset = (number * 36) * (Math.PI / 180);
  const coords = [];

  for (let i = 0; i < points; i++) {
    const angle = angleOffset + (i * 2 * Math.PI) / points;
    // Slight perturbation to create organic administrative boundaries
    const factor = 0.85 + 0.3 * Math.sin(angle * 3 + number);
    const pLat = lat + radiusLat * factor * Math.sin(angle);
    const pLng = lng + radiusLng * factor * Math.cos(angle);
    coords.push([pLat, pLng]);
  }
  return coords;
}

// Custom tiny ward badge pin for centroid
function createWardLabelIcon(number) {
  const html = `
    <div style="
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(6, 78, 59, 0.9);
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1.5px solid #FFFFFF;
      box-shadow: 0 2px 5px rgba(0,0,0,0.25);
      cursor: pointer;
    ">
      ${number}
    </div>
  `;
  return L.divIcon({
    html,
    className: 'ward-centroid-icon',
    iconSize: [22, 22],
    iconAnchor: [11, 11]
  });
}

export default function WardLayer({ visible = true, selectedWardId = null, onSelectWard }) {
  const { language } = useLanguage();
  if (!visible) return null;

  return (
    <>
      {WARDS.map((ward) => {
        const isSelected = selectedWardId && (Number(selectedWardId) === ward.id || Number(selectedWardId) === ward.number);
        const polygonCoords = generateWardPolygon(ward.coordinates[0], ward.coordinates[1], ward.number);
        const displayName = language === 'ml' && ward.name_ml ? ward.name_ml : ward.name;

        return (
          <React.Fragment key={`ward-layer-${ward.id}`}>
            {/* Ward Area Polygon */}
            <Polygon
              positions={polygonCoords}
              pathOptions={{
                color: isSelected ? '#0D9488' : '#059669',
                weight: isSelected ? 3 : 1.5,
                opacity: isSelected ? 0.95 : 0.65,
                fillColor: isSelected ? '#0D9488' : '#10B981',
                fillOpacity: isSelected ? 0.22 : 0.08,
                dashArray: isSelected ? null : '4, 4'
              }}
              eventHandlers={{
                click: () => onSelectWard && onSelectWard(ward)
              }}
            >
              <Tooltip sticky direction="top">
                <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#064E3B' }}>
                  {language === 'ml' ? `വാർഡ് ${ward.number}: ${displayName}` : `Ward ${ward.number}: ${displayName}`}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                  {language === 'ml' ? `കൗൺസിലർ: ${ward.councillor}` : `Councillor: ${ward.councillor}`}
                </div>
              </Tooltip>

              <Popup>
                <div style={{ minWidth: '200px', padding: '4px' }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#0D9488', fontWeight: 800 }}>
                    {language === 'ml' ? 'നഗരസഭാ വാർഡ്' : 'Municipal Ward'}
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: '2px 0 6px 0', color: '#064E3B' }}>
                    Ward {ward.number} — {displayName}
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.78rem', color: '#475569', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Users size={12} color="#059669" />
                      <span>{ward.councillor}</span>
                    </div>
                    {ward.phone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Phone size={12} color="#0284C7" />
                        <span>{ward.phone}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Building2 size={12} color="#D97706" />
                      <span>{ward.facilitiesCount} {language === 'ml' ? 'സ്ഥാപനങ്ങൾ' : 'Verified Facilities'}</span>
                    </div>
                  </div>

                  <Link
                    to={`/wards?ward=${ward.number}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      padding: '6px 10px',
                      borderRadius: '6px',
                      backgroundColor: '#064E3B',
                      color: '#FFFFFF',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      textDecoration: 'none'
                    }}
                  >
                    <span>{language === 'ml' ? 'വാർഡ് വിവരങ്ങൾ കാണുക' : 'Explore Ward'}</span>
                    <ExternalLink size={12} />
                  </Link>
                </div>
              </Popup>
            </Polygon>

            {/* Ward Centroid Badge */}
            <Marker
              position={ward.coordinates}
              icon={createWardLabelIcon(ward.number)}
              eventHandlers={{
                click: () => onSelectWard && onSelectWard(ward)
              }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}
