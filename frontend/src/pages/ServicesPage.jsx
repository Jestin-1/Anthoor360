import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CITIZEN_SERVICES } from '../data/anthoorData';
import { 
  FileText, 
  ExternalLink, 
  Clock, 
  Search, 
  Landmark 
} from 'lucide-react';

export default function ServicesPage() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...new Set(CITIZEN_SERVICES.map(s => s.category))];

  const filteredServices = CITIZEN_SERVICES.filter(s => {
    const matchCat = selectedCategory === 'all' || s.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchQuery = !q || 
      s.title.toLowerCase().includes(q) ||
      (s.title_ml && s.title_ml.toLowerCase().includes(q)) ||
      s.description.toLowerCase().includes(q);
    return matchCat && matchQuery;
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
            <Landmark size={15} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {language === 'ml' ? 'നഗരസഭാ പൗരസേവനങ്ങൾ' : 'Citizen Service Navigator'}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            {t('servicesTitle')}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#E2E8F0', lineHeight: 1.6 }}>
            {t('servicesSubtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '-36px' }}>
        
        {/* Search & Filter Bar */}
        <div className="glass-card" style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1 1 260px' }}>
              <Search size={16} color="var(--primary-700)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder={language === 'ml' ? 'സേവനങ്ങൾ തിരയുക...' : 'Search services (e.g. birth, tax, permit)...'}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 38px',
                  borderRadius: '10px',
                  border: '1px solid var(--surface-200)',
                  backgroundColor: 'var(--surface-50)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            {/* Category Pills */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    backgroundColor: selectedCategory === cat ? '#064E3B' : 'var(--surface-100)',
                    color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-main)',
                    border: '1px solid var(--border-light)'
                  }}
                >
                  {cat === 'all' ? t('allCategories') : cat}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Services List Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {filteredServices.map(serv => (
            <div key={serv.id} className="glass-card" style={{ padding: '28px 32px', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <span className="badge badge-category" style={{ marginBottom: '8px' }}>
                    {language === 'ml' && serv.category_ml ? serv.category_ml : serv.category}
                  </span>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-900)', margin: '4px 0' }}>
                    {language === 'ml' && serv.title_ml ? serv.title_ml : serv.title}
                  </h2>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Department: {serv.department}
                  </div>
                </div>

                <a
                  href={serv.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ borderRadius: '10px' }}
                >
                  <span>{t('applyOnline')}</span>
                  <ExternalLink size={15} />
                </a>
              </div>

              <p style={{ fontSize: '0.94rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '20px' }}>
                {language === 'ml' && serv.description_ml ? serv.description_ml : serv.description}
              </p>

              {/* Details Columns */}
              <div className="grid grid-cols-2 gap-6" style={{ backgroundColor: 'var(--surface-50)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
                {/* Required Documents */}
                <div>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FileText size={15} color="#059669" />
                    <span>{t('requiredDocuments')}</span>
                  </h4>
                  <ul style={{ paddingLeft: '18px', fontSize: '0.84rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {serv.requiredDocuments.map((doc, dIdx) => (
                      <li key={dIdx}>{doc}</li>
                    ))}
                  </ul>
                </div>

                {/* Procedure & Fees */}
                <div>
                  <div style={{ marginBottom: '14px' }}>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={15} color="#D97706" />
                      <span>{t('timeline')} & {t('feeStructure')}</span>
                    </h4>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>
                      <strong>Time:</strong> {serv.processingTime}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>
                      <strong>Fee:</strong> {serv.fee}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>PROCEDURE SUMMARY</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', whiteSpace: 'pre-line', marginTop: '4px', lineHeight: 1.45 }}>
                      {serv.procedure}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
