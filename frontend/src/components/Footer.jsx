import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  ExternalLink, 
  Building 
} from 'lucide-react';

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer style={{
      backgroundColor: '#052e23',
      color: '#E2E8F0',
      paddingTop: '64px',
      paddingBottom: '32px',
      borderTop: '4px solid #0D9488',
      fontSize: '0.9rem'
    }}>
      <div className="container">
        <div className="grid grid-cols-4 gap-8" style={{ marginBottom: '48px' }}>
          
          {/* Column 1: Municipal Info */}
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '16px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#0D9488',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <MapPin size={20} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF' }}>
                {language === 'ml' ? 'ആന്തൂർ 360' : 'ANTHOOR 360'}
              </span>
            </div>
            <p style={{ color: '#94A3B8', fontSize: '0.86rem', lineHeight: '1.6', marginBottom: '16px' }}>
              {language === 'ml'
                ? 'ആന്തൂർ നഗരസഭയുടെ സമഗ്ര ഡിജിറ്റൽ മാപ്പ്, പൗരസേവനങ്ങൾ, വിനോദസഞ്ചാരം, വികസന വിവരങ്ങൾ എന്നിവ ബന്ധിപ്പിക്കുന്ന ഔദ്യോഗിക പ്ലാറ്റ്‌ഫോം.'
                : 'Comprehensive digital GIS map, civic directory, municipal development tracker, and citizen services portal for Anthoor Municipality, Kannur, Kerala.'}
            </p>
            <div style={{ fontSize: '0.84rem', color: '#CBD5E1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="flex items-center gap-2">
                <Building size={16} color="#0D9488" />
                <span>Anthoor Municipal Office, Dharmasala, Kannur - 670567</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} color="#0D9488" />
                <span>0497 2780005 | 2780006</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} color="#0D9488" />
                <span>anthoormunicipality@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '18px', borderBottom: '2px solid #0D9488', paddingBottom: '6px', display: 'inline-block' }}>
              {language === 'ml' ? 'പ്രധാന വഴികൾ' : 'Explore Platform'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/map" style={{ color: '#94A3B8', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#FFFFFF'} onMouseOut={e => e.target.style.color='#94A3B8'}>{t('map')}</Link></li>
              <li><Link to="/tourism" style={{ color: '#94A3B8', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#FFFFFF'} onMouseOut={e => e.target.style.color='#94A3B8'}>{t('tourism')}</Link></li>
              <li><Link to="/services" style={{ color: '#94A3B8', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#FFFFFF'} onMouseOut={e => e.target.style.color='#94A3B8'}>{t('services')}</Link></li>
              <li><Link to="/wards" style={{ color: '#94A3B8', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#FFFFFF'} onMouseOut={e => e.target.style.color='#94A3B8'}>{t('wards')}</Link></li>
              <li><Link to="/projects" style={{ color: '#94A3B8', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#FFFFFF'} onMouseOut={e => e.target.style.color='#94A3B8'}>{t('projects')}</Link></li>
              <li><Link to="/about" style={{ color: '#94A3B8', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='#FFFFFF'} onMouseOut={e => e.target.style.color='#94A3B8'}>{t('about')}</Link></li>
            </ul>
          </div>

          {/* Column 3: Government Portals */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '18px', borderBottom: '2px solid #0D9488', paddingBottom: '6px', display: 'inline-block' }}>
              {language === 'ml' ? 'സർക്കാർ പോർട്ടലുകൾ' : 'Official LSGD Portals'}
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="https://cr.lsgkerala.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ color: '#94A3B8' }}>
                  <span>Sevana (Civil Registration)</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://tax.lsgkerala.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ color: '#94A3B8' }}>
                  <span>Sanchaya (Property Tax)</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://sanketham.lsgkerala.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ color: '#94A3B8' }}>
                  <span>Sanketham (Building Permits)</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://kswift.kerala.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ color: '#94A3B8' }}>
                  <span>K-SWIFT (Trade Licenses)</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://ilgms.kerala.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ color: '#94A3B8' }}>
                  <span>ILGMS (File Tracking & Complaints)</span>
                  <ExternalLink size={12} />
                </a>
              </li>
              <li>
                <a href="https://welfarepension.lsgkerala.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" style={{ color: '#94A3B8' }}>
                  <span>Sevana Pension Portal</span>
                  <ExternalLink size={12} />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Emergency Contacts & Admin */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, marginBottom: '18px', borderBottom: '2px solid #E11D48', paddingBottom: '6px', display: 'inline-block' }}>
              {language === 'ml' ? 'അടിയന്തര ഹെൽപ്പ്‌ലൈൻ' : '24x7 Emergency'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#133E32', padding: '10px 14px', borderRadius: '10px', borderLeft: '4px solid #E11D48' }}>
                <div style={{ fontSize: '0.78rem', color: '#FDA4AF' }}>Fire & Rescue:</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>101 / 0497 2780101</div>
              </div>
              <div style={{ backgroundColor: '#133E32', padding: '10px 14px', borderRadius: '10px', borderLeft: '4px solid #38BDF8' }}>
                <div style={{ fontSize: '0.78rem', color: '#BAE6FD' }}>Police Control:</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>112 / 0497 2780222</div>
              </div>
            </div>

            <Link to="/admin-portal" className="btn btn-secondary btn-sm" style={{
              width: '100%',
              justifyContent: 'center',
              backgroundColor: '#0a3f31',
              color: '#94A3B8',
              borderColor: '#134e3f'
            }}>
              <Globe size={14} />
              <span>{t('adminPortal')}</span>
            </Link>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #134e3f',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.8rem',
          color: '#64748B'
        }}>
          <div>
            © {new Date().getFullYear()} Anthoor Municipality, Kannur, Kerala. All rights reserved.
          </div>

          {/* Footer Language Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={14} color="#0D9488" />
            <span style={{ color: '#94A3B8', fontSize: '0.8rem' }}>
              {language === 'ml' ? 'ഭാഷ:' : 'Language:'}
            </span>
            <div style={{ display: 'inline-flex', gap: '4px', backgroundColor: '#0a3f31', padding: '2px', borderRadius: '6px' }}>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                style={{
                  padding: '3px 9px',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  fontWeight: language === 'en' ? 700 : 500,
                  backgroundColor: language === 'en' ? '#0D9488' : 'transparent',
                  color: language === 'en' ? '#FFFFFF' : '#94A3B8',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('ml')}
                style={{
                  padding: '3px 9px',
                  borderRadius: '4px',
                  fontSize: '0.78rem',
                  fontWeight: language === 'ml' ? 700 : 500,
                  backgroundColor: language === 'ml' ? '#0D9488' : 'transparent',
                  color: language === 'ml' ? '#FFFFFF' : '#94A3B8',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                മലയാളം
              </button>
            </div>
          </div>

          <div style={{ maxWidth: '400px', textAlign: 'right' }}>
            {t('footerGovtNotice')}
          </div>
        </div>
      </div>
    </footer>
  );
}
