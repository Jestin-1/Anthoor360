import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  CATEGORIES, 
  FACILITIES, 
  CITIZEN_SERVICES, 
  MUNICIPAL_PROJECTS, 
  EMERGENCY_CONTACTS, 
  ANNOUNCEMENTS 
} from '../data/anthoorData';
import { 
  Search, 
  MapPin, 
  ArrowRight, 
  PhoneCall, 
  Compass, 
  Sparkles, 
  GraduationCap, 
  HeartPulse, 
  Landmark, 
  Bus, 
  Store, 
  Building2, 
  ExternalLink, 
  Calendar, 
  CheckCircle 
} from 'lucide-react';

export default function HomePage({ onOpenSearch: _onOpenSearch }) {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/map?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/map');
    }
  };

  const getCategoryIcon = (slug) => {
    switch (slug) {
      case 'education': return <GraduationCap size={22} color="#2563EB" />;
      case 'healthcare': return <HeartPulse size={22} color="#DC2626" />;
      case 'government': return <Landmark size={22} color="#059669" />;
      case 'transport': return <Bus size={22} color="#D97706" />;
      case 'tourism': return <Compass size={22} color="#7C3AED" />;
      case 'commercial': return <Store size={22} color="#0891B2" />;
      default: return <Building2 size={22} color="#4B5563" />;
    }
  };

  const touristSpots = FACILITIES.filter(f => f.category === 'tourism').slice(0, 3);
  const featuredServices = CITIZEN_SERVICES.slice(0, 4);

  return (
    <div>
      {/* 1. Hero Section with Real Generated Aerial Photorealistic Banner */}
      <section style={{
        position: 'relative',
        minHeight: '580px',
        display: 'flex',
        alignItems: 'center',
        background: `linear-gradient(rgba(6, 52, 38, 0.82), rgba(6, 78, 59, 0.88)), url('/assets/anthoor_hero.jpg') center/cover no-repeat`,
        color: '#FFFFFF',
        padding: '72px 0 96px 0',
        overflow: 'hidden'
      }}>
        {/* Subtle decorative bottom wave */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40px',
          background: 'var(--surface-50)',
          clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Top Pill */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', marginBottom: '20px', border: '1px solid rgba(255, 255, 255, 0.25)' }}>
              <span className="pulse-indicator"></span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.04em' }}>
                {language === 'ml' ? 'ആന്തൂർ നഗരസഭ — കണ്ണൂർ, കേരളം' : 'Anthoor Municipality — Kannur, Kerala'}
              </span>
            </div>

            {/* Title */}
            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#FFFFFF',
              marginBottom: '20px',
              textShadow: '0 4px 16px rgba(0,0,0,0.3)'
            }}>
              {t('heroTitle')}
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              color: '#E2E8F0',
              lineHeight: 1.6,
              marginBottom: '36px',
              maxWidth: '720px',
              margin: '0 auto 36px auto'
            }}>
              {t('heroSubtitle')}
            </p>

            {/* Smart Search Bar */}
            <form onSubmit={handleHeroSearchSubmit} style={{
              maxWidth: '680px',
              margin: '0 auto 28px auto',
              position: 'relative',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.25)',
              borderRadius: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '6px 8px 6px 18px',
                border: '2px solid rgba(255, 255, 255, 0.4)'
              }}>
                <Search size={22} color="#059669" style={{ flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
                  value={heroSearch}
                  onChange={e => setHeroSearch(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    padding: '12px 14px',
                    fontSize: '1rem',
                    color: 'var(--text-main)',
                    backgroundColor: 'transparent'
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    fontWeight: 700,
                    flexShrink: 0
                  }}
                >
                  <span>{language === 'ml' ? 'തിരയുക' : 'Search'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>

            {/* Primary Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
              <Link to="/map" className="btn btn-primary btn-lg" style={{ backgroundColor: '#0D9488', borderColor: '#0D9488' }}>
                <MapPin size={18} />
                <span>{t('exploreMapBtn')}</span>
              </Link>
              <Link to="/services" className="btn btn-secondary btn-lg" style={{ backgroundColor: 'rgba(255,255,255,0.92)', color: '#064E3B' }}>
                <Landmark size={18} />
                <span>{t('browseServicesBtn')}</span>
              </Link>
              <Link to="/emergency" className="btn btn-emergency btn-lg">
                <PhoneCall size={18} />
                <span>{language === 'ml' ? 'അടിയന്തര നമ്പരുകൾ' : 'Emergency Contacts'}</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Municipal Key Statistics Bar */}
      <section style={{ marginTop: '-40px', position: 'relative', zIndex: 10, marginBottom: '48px' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '24px 32px', backgroundColor: '#FFFFFF' }}>
            <div className="grid grid-cols-4 gap-6" style={{ textAlign: 'center' }}>
              
              <div style={{ borderRight: '1px solid var(--surface-200)', padding: '8px' }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary-800)', lineHeight: 1 }}>
                  28
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '6px' }}>
                  {t('statWards')}
                </div>
              </div>

              <div style={{ borderRight: '1px solid var(--surface-200)', padding: '8px' }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0D9488', lineHeight: 1 }}>
                  {FACILITIES.length}+
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '6px' }}>
                  {t('statFacilities')}
                </div>
              </div>

              <div style={{ borderRight: '1px solid var(--surface-200)', padding: '8px' }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#D97706', lineHeight: 1 }}>
                  {MUNICIPAL_PROJECTS.length}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '6px' }}>
                  {t('statProjects')}
                </div>
              </div>

              <div style={{ padding: '8px' }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#2563EB', lineHeight: 1 }}>
                  30,000+
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginTop: '6px' }}>
                  {t('statPopulation')}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 3. Quick Facility Categories Section */}
      <section style={{ marginBottom: '64px' }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-900)' }}>
                {t('categoriesTitle')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                {language === 'ml' ? 'ആന്തൂർ നഗരസഭയിലെ സേവനങ്ങളും സ്ഥാപനങ്ങളും' : 'Browse public institutions and verified landmarks'}
              </p>
            </div>
            <Link to="/map" className="btn btn-secondary btn-sm flex items-center gap-1">
              <span>{language === 'ml' ? 'എല്ലാം കാണുക' : 'View on Map'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {CATEGORIES.map(cat => {
              const count = FACILITIES.filter(f => f.category === cat.slug).length;
              return (
                <Link
                  key={cat.id}
                  to={`/map?category=${cat.slug}`}
                  className="glass-card"
                  style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textDecoration: 'none',
                    minHeight: '140px'
                  }}
                >
                  <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '12px',
                      backgroundColor: cat.bgLight,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {getCategoryIcon(cat.slug)}
                    </div>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: cat.color,
                      backgroundColor: cat.bgLight,
                      padding: '2px 8px',
                      borderRadius: '9999px'
                    }}>
                      {count} {language === 'ml' ? 'സ്ഥലങ്ങൾ' : 'places'}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '2px' }}>
                      {language === 'ml' ? cat.name_ml : cat.name}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0 }}>
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Interactive GIS Map Spotlight Preview */}
      <section style={{ marginBottom: '72px' }}>
        <div className="container">
          <div className="glass-card" style={{ overflow: 'hidden', padding: '0', border: '1px solid var(--primary-200)' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              backgroundColor: 'var(--surface-0)'
            }}>
              
              {/* Left Info Panel */}
              <div style={{ flex: '1 1 360px', padding: '40px 36px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-700)', backgroundColor: 'var(--primary-100)', padding: '3px 10px', borderRadius: '9999px', marginBottom: '16px' }}>
                  <Sparkles size={13} />
                  <span>CORE GIS ENGINE</span>
                </div>
                
                <h2 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '14px', color: 'var(--primary-900)' }}>
                  {language === 'ml' ? 'ഇന്ററാക്ടീവ് മാപ്പ് വഴി ആന്തൂരിനെ അറിയൂ' : 'Explore Anthoor on the Interactive GIS Map'}
                </h2>
                
                <p style={{ fontSize: '0.94rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '24px' }}>
                  {language === 'ml'
                    ? '28 നഗരസഭാ വാർഡുകളുടെ കൃത്യമായ അതിർത്തികൾ, റോഡുകൾ, ഗവൺമെന്റ് എൻജിനീയറിങ് കോളേജ്, നിഫ്റ്റ്, പറശ്ശിനിക്കടവ് മുത്തപ്പൻ ക്ഷേത്രം, ആശുപത്രികൾ എന്നിവ മാപ്പിൽ തത്സമയം കണ്ടെത്തൂ.'
                    : 'Search across 28 municipal wards, pinpoint schools, engineering colleges, hospitals, petrol stations, and tourist destinations with real-time distance calculations and ward boundaries.'}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    <CheckCircle size={16} color="#059669" />
                    <span>Real-time "Near Me" GPS distance discovery</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    <CheckCircle size={16} color="#059669" />
                    <span>"What's Around Here" facility proximity analyzer</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                    <CheckCircle size={16} color="#059669" />
                    <span>Ward-level containment and councillor directory</span>
                  </div>
                </div>

                <Link to="/map" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                  <Compass size={18} />
                  <span>{t('exploreMapBtn')}</span>
                </Link>
              </div>

              {/* Right Image / Map Preview Visual */}
              <div style={{ flex: '1 1 420px', minHeight: '380px', position: 'relative' }}>
                <img
                  src="/assets/anthoor_hero.jpg"
                  alt="Anthoor GIS Map Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', minHeight: '380px' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '24px'
                }}>
                  <div style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(12px)',
                    padding: '14px 18px',
                    borderRadius: '14px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#059669', animation: 'pulse-ring 2s infinite' }}></div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-900)' }}>
                        {language === 'ml' ? 'ധർമ്മശാല, ആന്തൂർ നഗരസഭ' : 'Dharmasala, Anthoor Municipality'}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        11.9734° N, 75.3852° E • 28 Active Wards Mapped
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Tourism Destinations */}
      <section style={{ marginBottom: '72px', backgroundColor: 'var(--surface-100)', padding: '56px 0' }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ marginBottom: '28px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: '#7C3AED', backgroundColor: '#EDE9FE', padding: '3px 10px', borderRadius: '9999px', marginBottom: '8px' }}>
                <Compass size={13} />
                <span>TOURISM & HERITAGE</span>
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)' }}>
                {t('tourismTitle')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                {t('tourismSubtitle')}
              </p>
            </div>
            <Link to="/tourism" className="btn btn-secondary btn-sm flex items-center gap-1">
              <span>{language === 'ml' ? 'എല്ലാ സ്ഥലങ്ങളും' : 'All Destinations'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {touristSpots.map(spot => (
              <div key={spot.id} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '200px', position: 'relative' }}>
                  <img
                    src={spot.image || '/assets/anthoor_hero.jpg'}
                    alt={spot.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: '9999px'
                  }}>
                    {spot.wardName}
                  </div>
                </div>
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '6px' }}>
                      {language === 'ml' && spot.name_ml ? spot.name_ml : spot.name}
                    </h3>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {language === 'ml' && spot.description_ml ? spot.description_ml : spot.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--surface-200)', paddingTop: '12px' }}>
                    <span style={{ fontSize: '0.76rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                      {spot.openingHours ? spot.openingHours.split(';')[0] : 'Open Daily'}
                    </span>
                    <Link to={`/map?facility=${spot.id}`} className="btn btn-primary btn-sm">
                      <MapPin size={13} />
                      <span>{t('viewOnMap')}</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Popular Citizen Services */}
      <section style={{ marginBottom: '72px' }}>
        <div className="container">
          <div className="flex items-center justify-between" style={{ marginBottom: '28px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-800)', backgroundColor: 'var(--primary-100)', padding: '3px 10px', borderRadius: '9999px', marginBottom: '8px' }}>
                <Landmark size={13} />
                <span>CITIZEN SERVICES</span>
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary-900)' }}>
                {t('servicesTitle')}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                {t('servicesSubtitle')}
              </p>
            </div>
            <Link to="/services" className="btn btn-secondary btn-sm flex items-center gap-1">
              <span>{language === 'ml' ? 'എല്ലാ സേവനങ്ങളും' : 'All Services'}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {featuredServices.map(serv => (
              <div key={serv.id} className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="flex items-center justify-between" style={{ marginBottom: '10px' }}>
                    <span className="badge badge-category" style={{ fontSize: '0.76rem' }}>
                      {language === 'ml' && serv.category_ml ? serv.category_ml : serv.category}
                    </span>
                    <span style={{ fontSize: '0.76rem', color: '#059669', fontWeight: 600 }}>
                      ⚡ {serv.processingTime}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px', color: 'var(--primary-900)' }}>
                    {language === 'ml' && serv.title_ml ? serv.title_ml : serv.title}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                    {language === 'ml' && serv.description_ml ? serv.description_ml : serv.description}
                  </p>
                </div>

                <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--surface-200)', paddingTop: '14px' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Fee: <strong style={{ color: 'var(--text-main)' }}>{serv.fee.split(';')[0]}</strong>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/services" className="btn btn-secondary btn-sm">
                      Details
                    </Link>
                    <a
                      href={serv.officialPortalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm flex items-center gap-1"
                    >
                      <span>{t('applyOnline')}</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Municipal Announcements & Emergency Bar */}
      <section style={{ marginBottom: '80px' }}>
        <div className="container">
          <div className="grid grid-cols-3 gap-6">
            
            {/* Announcements Panel (2 cols) */}
            <div style={{ gridColumn: 'span 2' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-900)' }}>
                  {t('announcements')}
                </h3>
                <Link to="/announcements" style={{ fontSize: '0.84rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                  View All &rarr;
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {ANNOUNCEMENTS.map(ann => (
                  <div key={ann.id} className="glass-card" style={{ padding: '16px 20px', borderLeft: ann.urgent ? '4px solid #E11D48' : '4px solid #059669' }}>
                    <div className="flex items-center justify-between" style={{ marginBottom: '6px' }}>
                      <span className={`badge ${ann.urgent ? 'badge-urgent' : 'badge-category'}`}>
                        {ann.category}
                      </span>
                      <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} />
                        {ann.date}
                      </span>
                    </div>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '4px' }}>
                      {language === 'ml' && ann.title_ml ? ann.title_ml : ann.title}
                    </h4>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      {ann.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Emergency Call Hub (1 col) */}
            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#E11D48' }}>
                  {t('emergencyTitle')}
                </h3>
                <Link to="/emergency" style={{ fontSize: '0.84rem', color: '#E11D48', fontWeight: 600 }}>
                  All &rarr;
                </Link>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {EMERGENCY_CONTACTS.slice(0, 4).map((em, idx) => (
                  <div key={idx} style={{
                    backgroundColor: '#FFFFFF',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700 }}>
                        {language === 'ml' && em.title_ml ? em.title_ml : em.title}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        {em.desc}
                      </div>
                    </div>
                    <a
                      href={`tel:${em.phone.replace(/\s+/g, '')}`}
                      className="btn btn-emergency btn-sm"
                      style={{ padding: '6px 12px', borderRadius: '8px' }}
                    >
                      <PhoneCall size={13} />
                      <span>{em.phone}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
