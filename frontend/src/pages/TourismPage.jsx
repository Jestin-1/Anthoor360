import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FACILITIES } from '../data/anthoorData';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Phone, 
  ExternalLink, 
  Navigation 
} from 'lucide-react';

export default function TourismPage() {
  const { language, t } = useLanguage();
  const tourismSpots = FACILITIES.filter(f => f.category === 'tourism');

  return (
    <div style={{ paddingBottom: '80px' }}>
      
      {/* Banner */}
      <section style={{
        background: `linear-gradient(rgba(6, 52, 38, 0.85), rgba(6, 78, 59, 0.9)), url('/assets/muthappan_temple.jpg') center/cover no-repeat`,
        color: '#FFFFFF',
        padding: '64px 0 80px 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', marginBottom: '16px' }}>
            <Compass size={15} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {language === 'ml' ? 'വിനോദസഞ്ചാര സഹായി' : 'Anthoor Tourism & Heritage Guide'}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '16px' }}>
            {t('tourismTitle')}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#E2E8F0', lineHeight: 1.6 }}>
            {t('tourismSubtitle')}
          </p>
        </div>
      </section>

      {/* Grid of Tourist Destinations */}
      <div className="container" style={{ marginTop: '-36px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {tourismSpots.map((spot, index) => (
            <div
              key={spot.id}
              className="glass-card"
              style={{
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: index % 2 === 1 ? 'row-reverse' : 'row'
              }}
            >
              {/* Image Column */}
              <div style={{ flex: '1 1 380px', minHeight: '300px', position: 'relative' }}>
                <img
                  src={spot.image || '/assets/anthoor_hero.jpg'}
                  alt={spot.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '300px' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  backgroundColor: 'rgba(6, 78, 59, 0.9)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  padding: '4px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.78rem',
                  fontWeight: 700
                }}>
                  {spot.wardName}
                </div>
              </div>

              {/* Information Column */}
              <div style={{ flex: '1 1 420px', padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px', color: 'var(--primary-900)' }}>
                    {language === 'ml' && spot.name_ml ? spot.name_ml : spot.name}
                  </h2>
                  {spot.name_ml && language !== 'ml' && (
                    <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)', marginBottom: '14px', fontFamily: 'var(--font-malayalam)' }}>
                      {spot.name_ml}
                    </div>
                  )}

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.65, marginBottom: '20px' }}>
                    {language === 'ml' && spot.description_ml ? spot.description_ml : spot.description}
                  </p>

                  {/* Highlights Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                    {spot.openingHours && (
                      <div className="flex items-start gap-2" style={{ fontSize: '0.84rem' }}>
                        <Clock size={16} color="var(--accent-amber)" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>TIMINGS</div>
                          <div>{spot.openingHours}</div>
                        </div>
                      </div>
                    )}
                    {spot.phone && (
                      <div className="flex items-start gap-2" style={{ fontSize: '0.84rem' }}>
                        <Phone size={16} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>CONTACT</div>
                          <div>{spot.phone}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Bar */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', borderTop: '1px solid var(--surface-200)', paddingTop: '18px' }}>
                  <Link to={`/map?facility=${spot.id}`} className="btn btn-primary btn-sm flex items-center gap-1">
                    <MapPin size={15} />
                    <span>{t('viewOnMap')}</span>
                  </Link>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${spot.coordinates[0]},${spot.coordinates[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm flex items-center gap-1"
                  >
                    <Navigation size={15} />
                    <span>{t('getDirections')}</span>
                  </a>
                  {spot.website && (
                    <a
                      href={spot.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm flex items-center gap-1"
                    >
                      <ExternalLink size={15} />
                      <span>{t('officialWebsite')}</span>
                    </a>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
