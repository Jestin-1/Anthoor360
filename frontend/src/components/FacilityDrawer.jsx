import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Accessibility, 
  Navigation, 
  ExternalLink, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function FacilityDrawer({ facility, onClose, onSelectFacility }) {
  const { language, t } = useLanguage();
  const [nearby, setNearby] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(false);

  useEffect(() => {
    if (!facility) return;
    let isCancelled = false;
    api.getNearbyFacilities(facility.coordinates[0], facility.coordinates[1], 4, facility.id)
      .then(res => {
        if (!isCancelled) {
          setNearby(res);
          setLoadingNearby(false);
        }
      })
      .catch(() => {
        if (!isCancelled) setLoadingNearby(false);
      });
    return () => { isCancelled = true; };
  }, [facility]);

  if (!facility) return null;

  const categoryColor = {
    education: '#2563EB',
    healthcare: '#DC2626',
    government: '#059669',
    transport: '#D97706',
    tourism: '#7C3AED',
    commercial: '#0891B2',
    public: '#4B5563'
  }[facility.category] || '#059669';

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${facility.coordinates[0]},${facility.coordinates[1]}`;

  return (
    <div className="side-drawer">
      {/* Drawer Header Image / Banner */}
      <div style={{ position: 'relative', height: '180px', width: '100%', backgroundColor: categoryColor, overflow: 'hidden' }}>
        {facility.image ? (
          <img
            src={facility.image}
            alt={facility.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            background: `linear-gradient(135deg, ${categoryColor}, #0F172A)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <MapPin size={48} opacity={0.6} />
          </div>
        )}
        
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.9)'}
          onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(15, 23, 42, 0.7)'}
        >
          <X size={18} />
        </button>

        {/* Category & Status Badges floating */}
        <div style={{ position: 'absolute', bottom: '12px', left: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            backgroundColor: categoryColor,
            color: '#FFFFFF',
            fontSize: '0.74rem',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            {facility.category}
          </span>
          {facility.verified && (
            <span className="badge badge-verified" style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(209, 250, 229, 0.95)' }}>
              <ShieldCheck size={12} /> {t('verifiedOfficial')}
            </span>
          )}
        </div>
      </div>

      {/* Drawer Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {/* Title */}
        <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '4px', lineHeight: '1.25' }}>
          {language === 'ml' && facility.name_ml ? facility.name_ml : facility.name}
        </h2>
        {facility.name_ml && language !== 'ml' && (
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '14px', fontFamily: 'var(--font-malayalam)' }}>
            {facility.name_ml}
          </p>
        )}

        {/* Ward Tag */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--primary-800)', backgroundColor: 'var(--primary-50)', padding: '3px 10px', borderRadius: '6px', marginBottom: '16px' }}>
          <MapPin size={13} />
          <span>{facility.wardName || `Ward ${facility.wardId}`}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2" style={{ marginBottom: '20px' }}>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm flex-1"
            style={{ borderRadius: '10px', padding: '10px' }}
          >
            <Navigation size={15} />
            <span>{t('getDirections')}</span>
          </a>
          {facility.phone && (
            <a
              href={`tel:${facility.phone.replace(/\s+/g, '')}`}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '10px', padding: '10px' }}
              title="Call phone"
            >
              <Phone size={16} color="var(--primary-700)" />
            </a>
          )}
          {facility.website && (
            <a
              href={facility.website}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '10px', padding: '10px' }}
              title="Open Official Website"
            >
              <ExternalLink size={16} color="var(--primary-700)" />
            </a>
          )}
        </div>

        {/* Description */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
            {language === 'ml' && facility.description_ml ? facility.description_ml : facility.description}
          </p>
        </div>

        {/* Key Information List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--surface-200)', paddingTop: '16px', marginBottom: '24px' }}>
          
          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin size={16} color="var(--primary-700)" style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>ADDRESS</div>
              <div style={{ fontSize: '0.86rem' }}>{facility.address}</div>
            </div>
          </div>

          {/* Opening Hours */}
          {facility.openingHours && (
            <div className="flex items-start gap-3">
              <Clock size={16} color="var(--accent-amber)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>HOURS</div>
                <div style={{ fontSize: '0.86rem' }}>{facility.openingHours}</div>
              </div>
            </div>
          )}

          {/* Contact Details */}
          {facility.phone && (
            <div className="flex items-start gap-3">
              <Phone size={16} color="var(--primary-600)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>PHONE</div>
                <div style={{ fontSize: '0.86rem' }}>{facility.phone}</div>
              </div>
            </div>
          )}

          {facility.email && (
            <div className="flex items-start gap-3">
              <Mail size={16} color="var(--primary-600)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>EMAIL</div>
                <div style={{ fontSize: '0.86rem' }}>{facility.email}</div>
              </div>
            </div>
          )}

          {/* Accessibility */}
          <div className="flex items-start gap-3">
            <Accessibility size={16} color={facility.isAccessible ? 'var(--primary-600)' : 'var(--text-muted)'} style={{ marginTop: '2px', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>ACCESSIBILITY</div>
              <div style={{ fontSize: '0.86rem', color: facility.isAccessible ? 'var(--primary-800)' : 'var(--text-muted)' }}>
                {facility.isAccessible ? 'Wheelchair Accessible Campus & Entrance' : 'Standard Accessibility'}
              </div>
            </div>
          </div>

          {/* Data Source */}
          {facility.source && (
            <div style={{ fontSize: '0.72rem', color: 'var(--text-light)', marginTop: '4px' }}>
              Source: {facility.source}
            </div>
          )}
        </div>

        {/* Section 10: "What's Around Here?" (Nearby Places) */}
        <div style={{ borderTop: '1px solid var(--surface-200)', paddingTop: '18px' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '12px' }}>
            <Sparkles size={16} color="var(--accent-amber)" />
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{t('whatsAroundHere')}</h3>
          </div>

          {loadingNearby ? (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', padding: '12px' }}>
              Calculating nearby facilities...
            </div>
          ) : nearby.length === 0 ? (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              No other mapped facilities in immediate vicinity.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {nearby.map(place => (
                <div
                  key={place.id}
                  onClick={() => onSelectFacility && onSelectFacility(place)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    backgroundColor: 'var(--surface-50)',
                    border: '1px solid var(--border-light)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = 'var(--primary-50)';
                    e.currentTarget.style.borderColor = 'var(--primary-200)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = 'var(--surface-50)';
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                  }}
                >
                  <div style={{ overflow: 'hidden', paddingRight: '8px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {language === 'ml' && place.name_ml ? place.name_ml : place.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                      {place.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-1" style={{ flexShrink: 0 }}>
                    <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--primary-700)', backgroundColor: 'var(--primary-100)', padding: '2px 6px', borderRadius: '6px' }}>
                      {place.distanceKm < 1 ? `${Math.round(place.distanceKm * 1000)} m` : `${place.distanceKm.toFixed(1)} km`}
                    </span>
                    <ChevronRight size={14} color="var(--text-light)" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
