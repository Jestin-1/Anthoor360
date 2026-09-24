import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Search, 
  Menu, 
  X, 
  Globe, 
  AlertCircle, 
  ShieldCheck,
  Phone,
  Check
} from 'lucide-react';

export default function Navbar({ onOpenSearch }) {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: language === 'ml' ? 'ഡിജിറ്റൽ മാപ്പ്' : 'Interactive Map', badge: 'GIS' },
    { to: '/portal', label: language === 'ml' ? 'നഗരസഭ പോർട്ടൽ' : 'Civic Portal' },
    { to: '/wards', label: t('wards') },
    { to: '/tourism', label: t('tourism') },
    { to: '/services', label: t('services') },
    { to: '/projects', label: t('projects') },
    { to: '/directory', label: t('directory') },
    { to: '/emergency', label: t('emergency'), isEmergency: true },
    { to: '/about', label: t('about') }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/map';
    return location.pathname === path;
  };

  return (
    <header className="navbar">
      {/* Top Municipal Utility Bar */}
      <div className="top-gov-bar" style={{
        backgroundColor: '#F8FAFC',
        borderBottom: '1px solid var(--border-light)',
        fontSize: '0.78rem',
        padding: '5px 0'
      }}>
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
            <span style={{ fontWeight: 600, color: 'var(--primary-800)' }}>
              {language === 'ml' ? 'കേരള സർക്കാർ' : 'Govt. of Kerala'}
            </span>
            <span style={{ opacity: 0.4 }}>•</span>
            <span>
              {language === 'ml' ? 'ആന്തൂർ നഗരസഭ (കണ്ണൂർ)' : 'Anthoor Municipality (Kannur)'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)', display: 'none' }} id="top-helpline">
              <style>{`@media (min-width: 768px) { #top-helpline { display: flex !important; } }`}</style>
              <Phone size={12} color="var(--primary-700)" />
              <span>{language === 'ml' ? 'ഹെൽപ്പ്‌ലൈൻ: 0497-2780005' : 'Helpline: 0497-2780005'}</span>
            </div>

            {/* Top Bar Language Selector */}
            <div className="flex items-center gap-1" style={{
              backgroundColor: '#FFFFFF',
              padding: '2px 6px',
              borderRadius: '20px',
              border: '1px solid #CBD5E1',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
            }}>
              <Globe size={13} color="var(--primary-700)" />
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '2px' }}>
                {language === 'ml' ? 'ഭാഷ:' : 'Language:'}
              </span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                style={{
                  padding: '2px 8px',
                  fontSize: '0.74rem',
                  fontWeight: language === 'en' ? 700 : 500,
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: language === 'en' ? 'var(--primary-700)' : 'transparent',
                  color: language === 'en' ? '#FFFFFF' : 'var(--text-main)',
                  transition: 'all 0.15s ease'
                }}
                title="Switch platform language to English"
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ml')}
                style={{
                  padding: '2px 8px',
                  fontSize: '0.74rem',
                  fontWeight: language === 'ml' ? 700 : 500,
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: language === 'ml' ? 'var(--primary-700)' : 'transparent',
                  color: language === 'ml' ? '#FFFFFF' : 'var(--text-main)',
                  transition: 'all 0.15s ease'
                }}
                title="ഭാഷ മലയാളത്തിലേക്ക് മാറ്റുക"
              >
                മലയാളം
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container flex items-center justify-between" style={{ height: '72px' }}>
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #064E3B, #0D9488)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 4px 12px rgba(6, 78, 59, 0.25)'
          }}>
            <MapPin size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.28rem', fontWeight: 800, color: 'var(--primary-900)', letterSpacing: '-0.02em' }}>
                {language === 'ml' ? 'ആന്തൂർ 360' : 'ANTHOOR 360'}
              </span>
              <span className="badge badge-verified" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                <ShieldCheck size={11} /> {language === 'ml' ? 'നഗരസഭ' : 'MUNICIPALITY'}
              </span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, fontWeight: 500 }}>
              {language === 'ml' ? 'ഡിജിറ്റൽ സിവിക് & ജി.ഐ.എസ് പ്ലാറ്റ്‌ഫോം' : 'Digital Civic & GIS Information Platform'}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="flex items-center gap-1" style={{ display: 'none' }} id="desktop-nav">
          <style>{`
            @media (min-width: 1120px) {
              #desktop-nav { display: flex !important; }
            }
          `}</style>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
              style={{
                color: link.isEmergency ? '#E11D48' : undefined,
                fontWeight: link.isEmergency ? 700 : undefined
              }}
            >
              {link.label}
              {link.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  backgroundColor: '#0D9488',
                  color: 'white',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  marginLeft: '2px'
                }}>
                  {link.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="btn btn-secondary btn-sm flex items-center gap-2"
            title="Search (Ctrl + K)"
            style={{ borderRadius: '10px', padding: '8px 12px' }}
          >
            <Search size={16} color="var(--primary-700)" />
            <span style={{ display: 'none' }} id="search-text-nav">
              <style>{`@media (min-width: 768px) { #search-text-nav { display: inline !important; font-size: 0.84rem; color: var(--text-muted); } }`}</style>
              {language === 'ml' ? 'തിരയുക...' : 'Search...'}
            </span>
            <kbd style={{
              fontSize: '0.68rem',
              background: 'var(--surface-200)',
              padding: '2px 5px',
              borderRadius: '4px',
              color: 'var(--text-muted)',
              display: 'none'
            }} id="search-kbd">
              <style>{`@media (min-width: 900px) { #search-kbd { display: inline !important; } }`}</style>
              ⌘K
            </kbd>
          </button>

          {/* Prominent Bilingual Segmented Switcher in Navbar */}
          <div
            className="lang-segmented-control flex items-center"
            style={{
              backgroundColor: 'var(--surface-100)',
              padding: '3px',
              borderRadius: '10px',
              border: '1px solid var(--border-light)',
              display: 'flex',
              gap: '2px'
            }}
            title={language === 'en' ? 'Language: English (Click മലയാളം to switch)' : 'ഭാഷ: മലയാളം (English മാറ്റാൻ ക്ലിക്ക് ചെയ്യുക)'}
          >
            <button
              type="button"
              onClick={() => setLanguage('en')}
              style={{
                padding: '5px 10px',
                fontSize: '0.8rem',
                fontWeight: language === 'en' ? 700 : 500,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: language === 'en' ? 'var(--primary-700)' : 'transparent',
                color: language === 'en' ? '#FFFFFF' : 'var(--text-muted)',
                boxShadow: language === 'en' ? '0 2px 4px rgba(6, 78, 59, 0.25)' : 'none',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>English</span>
              {language === 'en' && <Check size={12} />}
            </button>
            <button
              type="button"
              onClick={() => setLanguage('ml')}
              style={{
                padding: '5px 10px',
                fontSize: '0.8rem',
                fontWeight: language === 'ml' ? 700 : 500,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: language === 'ml' ? 'var(--primary-700)' : 'transparent',
                color: language === 'ml' ? '#FFFFFF' : 'var(--text-muted)',
                boxShadow: language === 'ml' ? '0 2px 4px rgba(6, 78, 59, 0.25)' : 'none',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>മലയാളം</span>
              {language === 'ml' && <Check size={12} />}
            </button>
          </div>

          {/* Report Issue Button */}
          <Link
            to="/report-issue"
            className="btn btn-primary btn-sm flex items-center gap-1"
            style={{ display: 'none' }}
            id="report-btn-desktop"
          >
            <style>{`@media (min-width: 860px) { #report-btn-desktop { display: inline-flex !important; } }`}</style>
            <AlertCircle size={15} />
            <span>{t('reportIssue')}</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex' }}
            id="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            <style>{`@media (min-width: 1120px) { #mobile-menu-btn { display: none !important; } }`}</style>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--border-light)',
          padding: '16px 20px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
        }}>
          {/* Mobile Language Switcher Section */}
          <div style={{
            padding: '12px 14px',
            backgroundColor: 'var(--primary-50)',
            borderRadius: '12px',
            border: '1px solid var(--primary-100)',
            marginBottom: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={16} color="var(--primary-700)" />
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-900)' }}>
                  {language === 'ml' ? 'ഭാഷ തിരഞ്ഞെടുക്കുക' : 'Select Language'}
                </span>
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                {language === 'ml' ? 'മലയാളം' : 'English'}
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: language === 'en' ? '2px solid var(--primary-700)' : '1px solid #CBD5E1',
                  backgroundColor: language === 'en' ? 'var(--primary-700)' : '#FFFFFF',
                  color: language === 'en' ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: language === 'en' ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>English</span>
                {language === 'en' && <Check size={14} />}
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ml')}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: language === 'ml' ? '2px solid var(--primary-700)' : '1px solid #CBD5E1',
                  backgroundColor: language === 'ml' ? 'var(--primary-700)' : '#FFFFFF',
                  color: language === 'ml' ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: language === 'ml' ? 700 : 500,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>മലയാളം</span>
                {language === 'ml' && <Check size={14} />}
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`nav-link ${isActive(link.to) ? 'active' : ''}`}
                style={{
                  fontSize: '1rem',
                  padding: '10px 14px',
                  color: link.isEmergency ? '#E11D48' : undefined,
                  fontWeight: link.isEmergency ? 700 : undefined
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ borderTop: '1px solid var(--surface-200)', paddingTop: '12px', marginTop: '4px' }}>
              <Link
                to="/report-issue"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <AlertCircle size={16} />
                <span>{t('reportIssue')}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
