import React, { useState } from 'react';
import { CATEGORY_CONFIG } from './mapConfig';
import { useLanguage } from '../../context/LanguageContext';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';

export default function MapLegend() {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  // Key municipal feature categories
  const legendItems = [
    { key: 'education', cfg: CATEGORY_CONFIG.education },
    { key: 'healthcare', cfg: CATEGORY_CONFIG.healthcare },
    { key: 'government', cfg: CATEGORY_CONFIG.government },
    { key: 'transport', cfg: CATEGORY_CONFIG.transport },
    { key: 'tourism', cfg: CATEGORY_CONFIG.tourism },
    { key: 'commercial', cfg: CATEGORY_CONFIG.commercial },
    { key: 'bank', cfg: CATEGORY_CONFIG.bank },
    { key: 'project', cfg: CATEGORY_CONFIG.project },
    { key: 'sports', cfg: CATEGORY_CONFIG.sports }
  ];

  return (
    <div style={{
      position: 'absolute',
      bottom: '24px',
      left: '14px',
      zIndex: 850,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(16px)',
      borderRadius: '12px',
      border: '1px solid var(--border-light, #CBD5E1)',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
      overflow: 'hidden',
      maxWidth: '280px',
      transition: 'all 0.25s ease'
    }}>
      {/* Legend Toggle Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          padding: '8px 12px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--text-main, #0F172A)',
          fontSize: '0.78rem',
          fontWeight: 700
        }}
        aria-label="Toggle Map Legend"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Layers size={14} color="#064E3B" />
          <span>{language === 'ml' ? 'മാപ്പ് സൂചിക (Legend)' : 'Municipal Map Legend'}</span>
        </div>
        {isExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

      {/* Expanded Legend Content */}
      {isExpanded && (
        <div style={{
          padding: '6px 12px 12px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          maxHeight: '260px',
          overflowY: 'auto'
        }}>
          {/* GIS Vectors */}
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            {language === 'ml' ? 'പ്രകൃതി & അതിർത്തി' : 'Boundaries & Geography'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '14px', height: '3px', backgroundColor: '#059669', borderRadius: '2px' }}></span>
              <span style={{ fontSize: '0.72rem', color: '#334155', fontWeight: 600 }}>
                {language === 'ml' ? 'നഗരസഭാ അതിർത്തി' : 'Municipality Border'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '14px', height: '3px', backgroundColor: '#0D9488', borderRadius: '2px' }}></span>
              <span style={{ fontSize: '0.72rem', color: '#334155', fontWeight: 600 }}>
                {language === 'ml' ? '28 വാർഡുകൾ' : '28 Wards'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '14px', height: '3px', backgroundColor: '#F59E0B', borderRadius: '2px' }}></span>
              <span style={{ fontSize: '0.72rem', color: '#334155', fontWeight: 600 }}>
                {language === 'ml' ? 'പ്രധാന റോഡുകൾ' : 'NH 66 / Roads'}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '14px', height: '4px', backgroundColor: '#0284C7', borderRadius: '2px' }}></span>
              <span style={{ fontSize: '0.72rem', color: '#334155', fontWeight: 600 }}>
                {language === 'ml' ? 'വളപട്ടണം പുഴ' : 'River & Wetlands'}
              </span>
            </div>
          </div>

          <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '2px 0' }}></div>

          {/* Point Categories */}
          <div style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#64748B',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            {language === 'ml' ? 'സ്ഥാപനങ്ങൾ' : 'Places & Facilities'}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6px 12px'
          }}>
            {legendItems.map(({ key, cfg }) => (
              <div key={`legend-${key}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: cfg.color,
                  flexShrink: 0,
                  border: '1.5px solid #FFFFFF',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                }}></span>
                <span style={{
                  fontSize: '0.72rem',
                  color: '#334155',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {language === 'ml' ? cfg.label_ml : cfg.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
