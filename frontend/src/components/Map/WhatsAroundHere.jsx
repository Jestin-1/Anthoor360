import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getCategoryMeta } from './mapConfig';
import { Compass, X, ArrowRight, MapPin } from 'lucide-react';

export default function WhatsAroundHere({
  anchorFacility,
  nearbyFacilities = [],
  onSelectFacility,
  onClose
}) {
  const { language } = useLanguage();
  if (!anchorFacility || nearbyFacilities.length === 0) return null;

  const anchorName = language === 'ml' && anchorFacility.name_ml ? anchorFacility.name_ml : anchorFacility.name;

  return (
    <div style={{
      position: 'absolute',
      top: '120px',
      left: '14px',
      zIndex: 860,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      borderRadius: '14px',
      border: '1px solid var(--border-light, #CBD5E1)',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)',
      width: '290px',
      maxWidth: 'calc(100vw - 28px)',
      overflow: 'hidden',
      animation: 'fadeIn 0.2s ease-out'
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 14px',
        backgroundColor: '#F8FAFC',
        borderBottom: '1px solid #E2E8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Compass size={16} color="#7C3AED" />
          <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0F172A' }}>
            {language === 'ml' ? 'ഈ പരിസരത്ത് എന്തൊക്കെയുണ്ട്?' : "What's Around Here?"}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#64748B',
            display: 'flex',
            padding: '2px'
          }}
          aria-label="Close"
        >
          <X size={16} />
        </button>
      </div>

      {/* Anchor Context */}
      <div style={{
        padding: '6px 14px',
        backgroundColor: '#EFF6FF',
        borderBottom: '1px solid #DBEAFE',
        fontSize: '0.74rem',
        color: '#1E40AF',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        <MapPin size={11} color="#2563EB" />
        <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          Near {anchorName}
        </span>
      </div>

      {/* Nearby Facilities List */}
      <div style={{ padding: '6px 8px', maxHeight: '240px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {nearbyFacilities.map((fac) => {
          const meta = getCategoryMeta(fac.category);
          const facName = language === 'ml' && fac.name_ml ? fac.name_ml : fac.name;
          const distStr = fac.distanceKm !== undefined 
            ? (fac.distanceKm < 1 ? `${Math.round(fac.distanceKm * 1000)} m` : `${fac.distanceKm.toFixed(1)} km`)
            : '';

          return (
            <button
              key={`around-${fac.id}`}
              type="button"
              onClick={() => onSelectFacility(fac)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.15s ease',
                width: '100%'
              }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#F1F5F9'}
              onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: meta.color,
                  flexShrink: 0
                }}></span>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {facName}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                    {language === 'ml' ? meta.label_ml : meta.label}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, marginLeft: '6px' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  color: '#059669',
                  backgroundColor: '#D1FAE5',
                  padding: '2px 5px',
                  borderRadius: '4px'
                }}>
                  {distStr}
                </span>
                <ArrowRight size={12} color="#94A3B8" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
