import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { FACILITIES, WARDS, CITIZEN_SERVICES } from '../data/anthoorData';
import { 
  Search, 
  X, 
  MapPin, 
  FileText, 
  ArrowRight, 
  Building2 
} from 'lucide-react';

export default function QuickSearch({ isOpen, onClose }) {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false); // Toggle trigger
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Filter facilities
  const facilityResults = q ? FACILITIES.filter(f => 
    f.name.toLowerCase().includes(q) ||
    (f.name_ml && f.name_ml.toLowerCase().includes(q)) ||
    f.category.toLowerCase().includes(q) ||
    f.address.toLowerCase().includes(q)
  ).slice(0, 5) : [];

  // Filter wards
  const wardResults = q ? WARDS.filter(w => 
    w.name.toLowerCase().includes(q) ||
    (w.name_ml && w.name_ml.toLowerCase().includes(q)) ||
    `ward ${w.number}`.includes(q)
  ).slice(0, 3) : [];

  // Filter services
  const serviceResults = q ? CITIZEN_SERVICES.filter(s => 
    s.title.toLowerCase().includes(q) ||
    (s.title_ml && s.title_ml.toLowerCase().includes(q)) ||
    s.category.toLowerCase().includes(q)
  ).slice(0, 3) : [];

  const handleSelectFacility = (fac) => {
    onClose();
    navigate(`/map?facility=${fac.id}`);
  };

  const handleSelectWard = (ward) => {
    onClose();
    navigate(`/map?ward=${ward.number}`);
  };

  const handleSelectService = (_serv) => {
    onClose();
    navigate(`/services`);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '24px' }}>
        
        {/* Search Input Bar */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Search size={20} color="var(--primary-700)" style={{ position: 'absolute', left: '14px' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder={t('searchPlaceholder')}
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 44px 14px 44px',
              fontSize: '1.05rem',
              borderRadius: '14px',
              border: '2px solid var(--primary-600)',
              backgroundColor: 'var(--surface-50)',
              boxShadow: '0 4px 16px rgba(5, 150, 105, 0.1)'
            }}
          />
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              right: '12px',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: 'var(--surface-200)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results Body */}
        {q ? (
          <div style={{ maxHeight: '420px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Facilities Group */}
            {facilityResults.length > 0 && (
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  {language === 'ml' ? 'സ്ഥാപനങ്ങൾ & സ്ഥലങ്ങൾ' : 'Facilities & Places'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {facilityResults.map(fac => (
                    <div
                      key={fac.id}
                      onClick={() => handleSelectFacility(fac)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--surface-50)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary-50)'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--surface-50)'}
                    >
                      <div className="flex items-center gap-3">
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: 'var(--primary-100)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--primary-800)'
                        }}>
                          <MapPin size={16} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>
                            {language === 'ml' && fac.name_ml ? fac.name_ml : fac.name}
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            {fac.wardName} • <span style={{ textTransform: 'capitalize' }}>{fac.category}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={16} color="var(--primary-600)" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Group */}
            {serviceResults.length > 0 && (
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  {language === 'ml' ? 'പൗരസേവനങ്ങൾ' : 'Citizen Services'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {serviceResults.map(serv => (
                    <div
                      key={serv.id}
                      onClick={() => handleSelectService(serv)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--surface-50)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary-50)'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--surface-50)'}
                    >
                      <div className="flex items-center gap-3">
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: '#FEF3C7',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#B45309'
                        }}>
                          <FileText size={16} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>
                            {language === 'ml' && serv.title_ml ? serv.title_ml : serv.title}
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            {serv.category}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={16} color="var(--primary-600)" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wards Group */}
            {wardResults.length > 0 && (
              <div>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  {language === 'ml' ? 'വാർഡുകൾ' : 'Wards'}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {wardResults.map(w => (
                    <div
                      key={w.id}
                      onClick={() => handleSelectWard(w)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '10px',
                        backgroundColor: 'var(--surface-50)',
                        border: '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                      onMouseOver={e => e.currentTarget.style.backgroundColor = 'var(--primary-50)'}
                      onMouseOut={e => e.currentTarget.style.backgroundColor = 'var(--surface-50)'}
                    >
                      <div className="flex items-center gap-3">
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          backgroundColor: '#EDE9FE',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#7C3AED'
                        }}>
                          <Building2 size={16} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.92rem', fontWeight: 600 }}>
                            Ward {w.number}: {language === 'ml' && w.name_ml ? w.name_ml : w.name}
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                            Councillor: {w.councillor} • Pop: {w.population}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={16} color="var(--primary-600)" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {facilityResults.length === 0 && serviceResults.length === 0 && wardResults.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--text-muted)' }}>
                {t('noFacilitiesFound')}
              </div>
            )}

          </div>
        ) : (
          /* Initial Quick Suggestions */
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '10px', fontWeight: 600 }}>
              {language === 'ml' ? 'ജനപ്രിയ തിരയലുകൾ' : 'POPULAR SEARCHES IN ANTHOOR'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Government Engineering College', 'Muthappan Temple', 'Snake Park', 'Property Tax', 'Birth Certificate', 'Dharmasala', 'Vellikkeel Eco Park'].map(term => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="btn btn-secondary btn-sm"
                  style={{ borderRadius: '9999px', fontSize: '0.8rem' }}
                >
                  <Search size={12} />
                  <span>{term}</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
