import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  WARDS, 
  CATEGORIES, 
  CITIZEN_SERVICES, 
  MUNICIPAL_PROJECTS, 
  DIRECTORY_ENTRIES, 
  EMERGENCY_CONTACTS, 
  ANNOUNCEMENTS 
} from '../data/anthoorData';
import { getFacilityEmoji, getCategoryMeta } from './Map/mapConfig';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  Compass, 
  FileText, 
  Hammer, 
  Store, 
  PhoneCall, 
  ExternalLink,
  AlertTriangle,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function MapSidebar({
  isOpen = true,
  onToggleOpen,
  activeTab = 'overview',
  onSelectTab,
  onSelectFacility,
  onSelectWard,
  onSelectProject,
  onSelectCategory,
  facilities = []
}) {
  const { language } = useLanguage();
  const [sidebarSearch, setSidebarSearch] = useState('');

  const tabs = [
    { id: 'overview', label: 'Explore', label_ml: 'കണ്ടെത്തുക', icon: Compass },
    { id: 'wards', label: '28 Wards', label_ml: '28 വാർഡുകൾ', icon: Building2 },
    { id: 'tourism', label: 'Tourism', label_ml: 'ടൂറിസം', icon: Sparkles },
    { id: 'services', label: 'Services', label_ml: 'സേവനങ്ങൾ', icon: FileText },
    { id: 'projects', label: 'Projects', label_ml: 'പദ്ധതികൾ', icon: Hammer },
    { id: 'directory', label: 'Directory', label_ml: 'വ്യാപാരം', icon: Store },
    { id: 'emergency', label: 'Emergency', label_ml: 'അടിയന്തരം', icon: PhoneCall, isEmergency: true }
  ];

  const q = sidebarSearch.trim().toLowerCase();

  // Filtered wards
  const filteredWards = WARDS.filter(w => 
    !q || 
    w.name.toLowerCase().includes(q) || 
    (w.name_ml && w.name_ml.toLowerCase().includes(q)) || 
    `ward ${w.number}`.includes(q) ||
    w.councillor.toLowerCase().includes(q)
  );

  // Filtered tourism spots
  const tourismSpots = facilities.filter(f => f.category === 'tourism');
  const filteredTourism = tourismSpots.filter(t => 
    !q || 
    t.name.toLowerCase().includes(q) || 
    (t.name_ml && t.name_ml.toLowerCase().includes(q))
  );

  // Filtered services
  const filteredServices = CITIZEN_SERVICES.filter(s => 
    !q || 
    s.title.toLowerCase().includes(q) || 
    (s.title_ml && s.title_ml.toLowerCase().includes(q)) ||
    s.category.toLowerCase().includes(q)
  );

  // Filtered projects
  const filteredProjects = MUNICIPAL_PROJECTS.filter(p => 
    !q || 
    p.name.toLowerCase().includes(q) || 
    (p.name_ml && p.name_ml.toLowerCase().includes(q))
  );

  // Filtered businesses
  const filteredBusinesses = DIRECTORY_ENTRIES.filter(b => 
    !q || 
    b.name.toLowerCase().includes(q) || 
    b.category.toLowerCase().includes(q)
  );

  return (
    <>
      {/* Floating Toggle Button when Sidebar is Collapsed */}
      {!isOpen && (
        <button
          type="button"
          onClick={onToggleOpen}
          style={{
            position: 'absolute',
            left: '12px',
            top: '80px',
            zIndex: 950,
            backgroundColor: '#064E3B',
            color: '#FFFFFF',
            border: '2px solid #10B981',
            borderRadius: '12px',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
            cursor: 'pointer',
            fontSize: '0.82rem',
            fontWeight: 700,
            transition: 'all 0.2s ease'
          }}
          title={language === 'ml' ? 'സൈഡ്‌ബാർ തുറക്കുക' : 'Open Sidebar'}
        >
          <Layers size={16} />
          <span>{language === 'ml' ? 'നഗരസഭ മെനു' : 'Municipal Menu'}</span>
          <ChevronRight size={16} />
        </button>
      )}

      {/* Main Collapsible Municipal Sidebar Panel */}
      <aside
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '390px',
          maxWidth: '92vw',
          backgroundColor: '#FFFFFF',
          zIndex: 950,
          boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          borderRight: '1px solid #E2E8F0'
        }}
      >
        {/* Sidebar Header */}
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#064E3B',
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              backgroundColor: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.9rem'
            }}>
              ആ
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '0.96rem', letterSpacing: '-0.01em' }}>
                {language === 'ml' ? 'ആന്തൂർ 360' : 'ANTHOOR 360'}
              </div>
              <div style={{ fontSize: '0.68rem', color: '#A7F3D0' }}>
                {language === 'ml' ? 'ഡിജിറ്റൽ ഭൂപടം & സേവനങ്ങൾ' : 'Digital GIS & Citizen Command'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleOpen}
            style={{
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            title={language === 'ml' ? 'സൈഡ്‌ബാർ ചുരുക്കുക' : 'Collapse Sidebar'}
          >
            <ChevronLeft size={18} />
          </button>
        </div>

        {/* Tab Selector Strip */}
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          scrollbarWidth: 'none',
          padding: '4px 6px',
          gap: '4px'
        }}>
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab && onSelectTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: active ? '#064E3B' : 'transparent',
                  color: active ? '#FFFFFF' : tab.isEmergency ? '#BE123C' : '#475569',
                  fontSize: '0.74rem',
                  fontWeight: active ? 700 : 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <IconComponent size={13} color={active ? '#FFFFFF' : tab.isEmergency ? '#BE123C' : '#64748B'} />
                <span>{language === 'ml' ? tab.label_ml : tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* In-Sidebar Live Search */}
        <div style={{ padding: '8px 14px', borderBottom: '1px solid #F1F5F9', backgroundColor: '#FFFFFF' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={14} color="#64748B" style={{ position: 'absolute', left: '10px' }} />
            <input
              type="text"
              placeholder={language === 'ml' ? 'ഈ ലിസ്റ്റിൽ തിരയുക...' : 'Search this section...'}
              value={sidebarSearch}
              onChange={e => setSidebarSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '6px 10px 6px 30px',
                fontSize: '0.8rem',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#F8FAFC'
              }}
            />
          </div>
        </div>

        {/* Tab Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px' }}>
          
          {/* TAB 1: OVERVIEW & KEY PLACES */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Municipality Quick Card */}
              <div style={{
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0'
              }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#064E3B', marginBottom: '4px' }}>
                  {language === 'ml' ? 'ആന്തൂർ നഗരസഭ' : 'Anthoor Municipality Overview'}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#047857', lineHeight: 1.5 }}>
                  {language === 'ml'
                    ? 'കണ്ണൂർ ജില്ലയിലെ പ്രധാന നഗരസഭ. 28 വാർഡുകൾ, ധർമ്മശാല ആസ്ഥാനം, പ്രശസ്തമായ പറശ്ശിനിക്കടവ് ക്ഷേത്രം, എൻജിനീയറിങ് കോളേജ്, നിഫ്റ്റ് എന്നിവ ഇവിടെ സ്ഥിതി ചെയ്യുന്നു.'
                    : 'Premier municipality in Kannur, Kerala. Comprising 28 wards with headquarters at Dharmasala, home to Muthappan Temple, GCEK, NIFT, and Vellikkeel Eco Park.'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '8px' }}>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', fontSize: '0.72rem', color: '#334155' }}>
                    <strong>{language === 'ml' ? 'വാർഡുകൾ:' : 'Wards:'}</strong> 28
                  </div>
                  <div style={{ backgroundColor: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', fontSize: '0.72rem', color: '#334155' }}>
                    <strong>{language === 'ml' ? 'വിസ്തീർണ്ണം:' : 'Area:'}</strong> 23.47 km²
                  </div>
                </div>
              </div>

              {/* All Category Filters */}
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  {language === 'ml' ? 'വിഭാഗങ്ങൾ' : 'Explore by Category'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  {CATEGORIES.map(cat => {
                    const emoji = getFacilityEmoji(cat.slug);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => onSelectCategory && onSelectCategory(cat.slug)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 9px',
                          borderRadius: '8px',
                          border: '1px solid #E2E8F0',
                          backgroundColor: '#FFFFFF',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#F0FDF4'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                      >
                        <span style={{ fontSize: '15px' }}>{emoji}</span>
                        <span style={{ fontSize: '0.76rem', fontWeight: 600, color: '#1E293B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {language === 'ml' ? cat.name_ml : cat.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Key Landmark Facilities List */}
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  {language === 'ml' ? 'പ്രധാന കേന്ദ്രങ്ങൾ (20)' : 'Key Municipal Places (20)'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {facilities.map(fac => {
                    const emoji = getFacilityEmoji(fac);
                    const meta = getCategoryMeta(fac.category);
                    return (
                      <div
                        key={fac.id}
                        onClick={() => onSelectFacility && onSelectFacility(fac)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '8px 10px',
                          borderRadius: '8px',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#F0FDF4'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                          <span style={{ fontSize: '18px', flexShrink: 0 }}>{emoji}</span>
                          <div style={{ overflow: 'hidden' }}>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {language === 'ml' && fac.name_ml ? fac.name_ml : fac.name}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
                              {fac.wardName || `Ward ${fac.wardId}`} • {language === 'ml' ? meta.label_ml : meta.label}
                            </div>
                          </div>
                        </div>
                        <ArrowRight size={14} color="#059669" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Announcements Notice */}
              {ANNOUNCEMENTS.length > 0 && (
                <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#B45309', fontWeight: 700, fontSize: '0.78rem', marginBottom: '4px' }}>
                    <AlertTriangle size={14} />
                    <span>{language === 'ml' ? 'നഗരസഭാ അറിയിപ്പ്' : 'Municipal Announcement'}</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#78350F' }}>
                    {language === 'ml' && ANNOUNCEMENTS[0].title_ml ? ANNOUNCEMENTS[0].title_ml : ANNOUNCEMENTS[0].title}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WARDS (ALL 28 WARDS) */}
          {activeTab === 'wards' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '0.74rem', color: '#64748B', marginBottom: '4px' }}>
                {language === 'ml' ? 'ഏതെങ്കിലും വാർഡിൽ ക്ലിക്ക് ചെയ്താൽ ഭൂപടത്തിൽ കാണാം:' : 'Click any ward to zoom and highlight on map:'}
              </div>

              {filteredWards.map(w => (
                <div
                  key={`ward-sidebar-${w.id}`}
                  onClick={() => onSelectWard && onSelectWard(w.number)}
                  style={{
                    padding: '9px 12px',
                    borderRadius: '10px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = '#ECFDF5';
                    e.currentTarget.style.borderColor = '#10B981';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = '#F8FAFC';
                    e.currentTarget.style.borderColor = '#E2E8F0';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        backgroundColor: '#064E3B',
                        color: '#FFFFFF',
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '4px'
                      }}>
                        W {w.number}
                      </span>
                      <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0F172A' }}>
                        {language === 'ml' && w.name_ml ? w.name_ml : w.name}
                      </span>
                    </div>
                    <ArrowRight size={13} color="#059669" />
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{language === 'ml' ? 'കൗൺസിലർ:' : 'Councillor:'} {w.councillor}</span>
                    <span>{w.population} pop</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: TOURISM & HERITAGE */}
          {activeTab === 'tourism' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredTourism.map(tSpot => {
                const emoji = getFacilityEmoji(tSpot);
                return (
                  <div
                    key={`tour-${tSpot.id}`}
                    onClick={() => onSelectFacility && onSelectFacility(tSpot)}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseOver={e => e.currentTarget.style.borderColor = '#7C3AED'}
                    onMouseOut={e => e.currentTarget.style.borderColor = '#E2E8F0'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '20px' }}>{emoji}</span>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0F172A' }}>
                          {language === 'ml' && tSpot.name_ml ? tSpot.name_ml : tSpot.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#7C3AED', fontWeight: 600 }}>
                          {tSpot.wardName}
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: '0.74rem', color: '#475569', margin: '4px 0 6px 0', lineHeight: 1.4 }}>
                      {language === 'ml' && tSpot.description_ml ? tSpot.description_ml : tSpot.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#059669', fontWeight: 600 }}>
                      <span>{tSpot.opening_hours || 'Open Daily'}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        {language === 'ml' ? 'മാപ്പിൽ കാണുക' : 'View on Map'} <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 4: CITIZEN SERVICES */}
          {activeTab === 'services' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredServices.map(serv => (
                <div
                  key={`serv-${serv.id}`}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0F172A' }}>
                      {language === 'ml' && serv.title_ml ? serv.title_ml : serv.title}
                    </div>
                    <span style={{ fontSize: '0.66rem', backgroundColor: '#ECFDF5', color: '#047857', padding: '2px 5px', borderRadius: '4px', fontWeight: 700 }}>
                      {serv.processing_time}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.73rem', color: '#64748B', margin: '2px 0 6px 0' }}>
                    {language === 'ml' && serv.description_ml ? serv.description_ml : serv.description}
                  </p>
                  {serv.official_portal_url && (
                    <a
                      href={serv.official_portal_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#059669',
                        textDecoration: 'none'
                      }}
                    >
                      <span>{language === 'ml' ? 'ഓൺലൈൻ അപേക്ഷ' : 'Official Portal'}</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 5: MUNICIPAL PROJECTS */}
          {activeTab === 'projects' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredProjects.map(proj => (
                <div
                  key={`proj-${proj.id}`}
                  onClick={() => onSelectProject && onSelectProject(proj)}
                  style={{
                    padding: '10px',
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer'
                  }}
                  onMouseOver={e => e.currentTarget.style.borderColor = '#F97316'}
                  onMouseOut={e => e.currentTarget.style.borderColor = '#E2E8F0'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#C2410C', backgroundColor: '#FFEDD5', padding: '2px 6px', borderRadius: '4px' }}>
                      🏗️ {proj.status}
                    </span>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#059669' }}>
                      {proj.budget}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0F172A', margin: '4px 0' }}>
                    {language === 'ml' && proj.name_ml ? proj.name_ml : proj.name}
                  </div>
                  {/* Progress bar */}
                  <div style={{ width: '100%', height: '5px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden', margin: '6px 0' }}>
                    <div style={{ width: `${proj.progress}%`, height: '100%', backgroundColor: '#F97316' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748B' }}>
                    <span>{proj.wardName}</span>
                    <span style={{ color: '#059669', fontWeight: 600 }}>{language === 'ml' ? 'മാപ്പിൽ കാണുക' : 'Locate on Map'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: DIRECTORY & BUSINESSES */}
          {activeTab === 'directory' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {filteredBusinesses.map(biz => {
                const emoji = getFacilityEmoji(biz);
                return (
                  <div
                    key={`biz-${biz.id}`}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '10px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '16px' }}>{emoji}</span>
                        <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#0F172A' }}>{biz.name}</span>
                      </div>
                      <span style={{ fontSize: '0.66rem', color: '#059669', fontWeight: 700 }}>
                        ★ {biz.rating}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '6px' }}>
                      {biz.ward} • {biz.category}
                    </div>
                    <a
                      href={`tel:${biz.phone}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        backgroundColor: '#0891B2',
                        color: '#FFFFFF',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      <PhoneCall size={11} />
                      <span>{biz.phone}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 7: EMERGENCY CONTACTS */}
          {activeTab === 'emergency' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ padding: '8px 10px', borderRadius: '8px', backgroundColor: '#FFE4E6', color: '#9F1239', fontSize: '0.76rem', fontWeight: 700 }}>
                {language === 'ml' ? '24x7 അടിയന്തര നമ്പറുകൾ (ആന്തൂർ)' : '24x7 Emergency Helplines for Anthoor'}
              </div>
              {EMERGENCY_CONTACTS.map(em => (
                <div
                  key={`em-${em.id}`}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #FECDD3',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0F172A' }}>
                      {language === 'ml' && em.title_ml ? em.title_ml : em.title}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: '#E11D48', fontWeight: 600 }}>
                      {em.available}
                    </div>
                  </div>
                  <a
                    href={`tel:${em.phone}`}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '6px',
                      backgroundColor: '#E11D48',
                      color: '#FFFFFF',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <PhoneCall size={12} />
                    <span>{em.phone}</span>
                  </a>
                </div>
              ))}
            </div>
          )}

        </div>
      </aside>
    </>
  );
}
