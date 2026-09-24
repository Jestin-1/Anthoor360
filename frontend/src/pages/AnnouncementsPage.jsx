import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ANNOUNCEMENTS } from '../data/anthoorData';
import { 
  Bell, 
  Calendar, 
  Download 
} from 'lucide-react';

export default function AnnouncementsPage() {
  const { language, t } = useLanguage();
  const [filterCat, setFilterCat] = useState('all');

  const categories = ['all', 'Council Notice', 'Sanitation', 'Health Alert'];

  const filtered = ANNOUNCEMENTS.filter(a => {
    return filterCat === 'all' || a.category === filterCat;
  });

  return (
    <div style={{ paddingBottom: '80px' }}>
      
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #064E3B, #0D9488)',
        color: '#FFFFFF',
        padding: '56px 0 72px 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', marginBottom: '16px' }}>
            <Bell size={15} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {language === 'ml' ? 'നഗരസഭാ വാർത്തകളും അറിയിപ്പുകളും' : 'Official Municipal Gazette & Notices'}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            {t('announcements')}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#E2E8F0', lineHeight: 1.6 }}>
            {language === 'ml'
              ? 'ആന്തൂർ നഗരസഭയുടെ കൗൺസിൽ തീരുമാനങ്ങൾ, പൊതു അറിയിപ്പുകൾ, ടെൻഡറുകൾ എന്നിവ ഇവിടെ ലഭ്യമാണ്.'
              : 'Official gazette, public sanitation schedules, tender announcements, and health circulars for Anthoor.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '-36px' }}>
        
        {/* Categories Bar */}
        <div className="glass-card" style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setFilterCat(cat)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: filterCat === cat ? '#064E3B' : 'var(--surface-100)',
                  color: filterCat === cat ? '#FFFFFF' : 'var(--text-main)',
                  border: '1px solid var(--border-light)'
                }}
              >
                {cat === 'all' ? t('allCategories') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Announcements List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filtered.map(item => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                padding: '24px 30px',
                backgroundColor: '#FFFFFF',
                borderLeft: item.urgent ? '5px solid #E11D48' : '5px solid #059669'
              }}
            >
              <div className="flex items-center justify-between" style={{ marginBottom: '10px' }}>
                <div className="flex items-center gap-2">
                  <span className={`badge ${item.urgent ? 'badge-urgent' : 'badge-category'}`}>
                    {item.category}
                  </span>
                  {item.urgent && (
                    <span style={{ fontSize: '0.74rem', color: '#E11D48', fontWeight: 700 }}>
                      ⚡ Immediate Action
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <Calendar size={14} />
                  <span>Published: {item.date}</span>
                </div>
              </div>

              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '8px' }}>
                {language === 'ml' && item.title_ml ? item.title_ml : item.title}
              </h2>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '16px' }}>
                {item.content}
              </p>

              <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--surface-200)', paddingTop: '14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Issued by: Secretary, Anthoor Municipal Council</span>
                <div className="flex gap-2">
                  <button className="btn btn-secondary btn-sm" onClick={() => alert('PDF Gazetted Copy Download Initiated.')}>
                    <Download size={13} />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
