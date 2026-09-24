import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getCategoryMeta } from './mapConfig';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  Compass, 
  ArrowRight 
} from 'lucide-react';

export default function MapPopup({ facility, onSelect, onFindAround }) {
  const { language } = useLanguage();
  if (!facility) return null;

  const meta = getCategoryMeta(facility.category);
  const displayName = language === 'ml' && facility.name_ml ? facility.name_ml : facility.name;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates[0]},${facility.coordinates[1]}`;

  return (
    <div style={{
      minWidth: '220px',
      maxWidth: '280px',
      fontFamily: 'var(--font-body, system-ui, sans-serif)',
      padding: '4px 2px'
    }}>
      {/* Category & Verified Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '6px',
        gap: '6px'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '2px 8px',
          borderRadius: '9999px',
          backgroundColor: meta.bgLight,
          color: meta.color,
          fontSize: '0.72rem',
          fontWeight: 700,
          textTransform: 'uppercase'
        }}>
          <span>{language === 'ml' ? meta.label_ml : meta.label}</span>
        </div>

        {facility.verified && (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '0.7rem',
            color: '#059669',
            fontWeight: 700,
            backgroundColor: '#D1FAE5',
            padding: '2px 6px',
            borderRadius: '6px'
          }}>
            <ShieldCheck size={11} /> {language === 'ml' ? 'സ്ഥിരീകരിച്ചത്' : 'Verified'}
          </span>
        )}
      </div>

      {/* Facility Name */}
      <h3 style={{
        fontSize: '0.96rem',
        fontWeight: 700,
        color: '#0F172A',
        lineHeight: 1.3,
        margin: '0 0 6px 0'
      }}>
        {displayName}
      </h3>

      {/* Ward & Address */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '5px',
        color: '#64748B',
        fontSize: '0.78rem',
        marginBottom: '4px'
      }}>
        <MapPin size={13} style={{ flexShrink: 0, marginTop: '2px', color: '#059669' }} />
        <span>{facility.wardName || (facility.wardId ? `Ward ${facility.wardId}` : facility.address)}</span>
      </div>

      {/* Phone if available */}
      {facility.phone && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: '#64748B',
          fontSize: '0.76rem',
          marginBottom: '4px'
        }}>
          <Phone size={12} style={{ flexShrink: 0, color: '#0284C7' }} />
          <span>{facility.phone}</span>
        </div>
      )}

      {/* Opening hours if available */}
      {facility.openingHours && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          color: '#64748B',
          fontSize: '0.74rem',
          marginBottom: '8px'
        }}>
          <Clock size={12} style={{ flexShrink: 0, color: '#D97706' }} />
          <span>{facility.openingHours}</span>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6px',
        marginTop: '8px',
        paddingTop: '8px',
        borderTop: '1px solid #E2E8F0'
      }}>
        <button
          type="button"
          onClick={() => onSelect(facility)}
          style={{
            padding: '6px 8px',
            borderRadius: '7px',
            backgroundColor: 'var(--primary-700, #064E3B)',
            color: '#FFFFFF',
            border: 'none',
            fontSize: '0.76rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            boxShadow: '0 2px 6px rgba(6, 78, 59, 0.25)'
          }}
        >
          <span>{language === 'ml' ? 'വിശദാംശങ്ങൾ' : 'View Details'}</span>
          <ArrowRight size={12} />
        </button>

        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: '6px 8px',
            borderRadius: '7px',
            backgroundColor: '#F1F5F9',
            color: '#334155',
            border: '1px solid #CBD5E1',
            fontSize: '0.76rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            textDecoration: 'none'
          }}
        >
          <Navigation size={12} color="#0284C7" />
          <span>{language === 'ml' ? 'ദിശകൾ' : 'Directions'}</span>
        </a>
      </div>

      {/* What's Around Here Trigger */}
      {onFindAround && (
        <button
          type="button"
          onClick={() => onFindAround(facility)}
          style={{
            width: '100%',
            marginTop: '6px',
            padding: '5px 8px',
            borderRadius: '6px',
            backgroundColor: '#F8FAFC',
            color: '#475569',
            border: '1px dashed #CBD5E1',
            fontSize: '0.73rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            transition: 'background 0.15s ease'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = '#EFF6FF'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
        >
          <Compass size={12} color="#7C3AED" />
          <span>{language === 'ml' ? 'ഈ പരിസരത്ത് എന്തൊക്കെയുണ്ട്?' : "What's Around Here?"}</span>
        </button>
      )}
    </div>
  );
}
