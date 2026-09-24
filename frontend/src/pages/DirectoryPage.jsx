import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { DIRECTORY_ENTRIES, WARDS } from '../data/anthoorData';
import { api } from '../services/api';
import { 
  Store, 
  Search, 
  MapPin, 
  Phone, 
  Clock, 
  ShieldCheck, 
  Plus, 
  X, 
  CheckCircle,
  Star 
} from 'lucide-react';

export default function DirectoryPage() {
  const { language, t } = useLanguage();
  const [entries, setEntries] = useState(DIRECTORY_ENTRIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'Food & Dining',
    ward: 'Ward 7 - Dharmasala',
    owner: '',
    phone: '',
    address: '',
    hours: '8:00 AM - 8:00 PM'
  });

  const categories = ['all', 'Food & Dining', 'Pharmacies & Healthcare', 'Handicrafts & Gifts', 'Automotive Services', 'Office & Printing'];

  const filteredEntries = entries.filter(item => {
    const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchTerm.toLowerCase();
    const matchQ = !q || item.name.toLowerCase().includes(q) || item.address.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const handleSubmitBusiness = (e) => {
    e.preventDefault();
    api.submitBusiness(formData).then(() => {
      setSubmittedSuccess(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmittedSuccess(false);
        // Add optimistic local entry
        setEntries(prev => [
          ...prev,
          {
            id: `dir-${Date.now()}`,
            name: formData.name,
            category: formData.category,
            ward: formData.ward,
            address: formData.address,
            phone: formData.phone,
            verified: false,
            rating: 5.0,
            hours: formData.hours
          }
        ]);
      }, 1800);
    });
  };

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
            <Store size={15} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {language === 'ml' ? 'പ്രാദേശിക വ്യാപാര ഡയറക്ടറി' : 'Verified Local Commercial Directory'}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            {t('directoryTitle')}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#E2E8F0', lineHeight: 1.6, marginBottom: '24px' }}>
            {t('directorySubtitle')}
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-accent btn-lg"
            style={{ borderRadius: '12px' }}
          >
            <Plus size={18} />
            <span>{t('registerBusinessBtn')}</span>
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '-36px' }}>
        
        {/* Search & Filter Bar */}
        <div className="glass-card" style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between' }}>
            
            <div style={{ position: 'relative', flex: '1 1 240px' }}>
              <Search size={16} color="var(--primary-700)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                placeholder={language === 'ml' ? 'സ്ഥാപനം അല്ലെങ്കിൽ സ്ഥലം തിരയുക...' : 'Search enterprise name, service, or locality...'}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
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

        {/* Directory Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filteredEntries.map(item => (
            <div
              key={item.id}
              className="glass-card"
              style={{
                padding: '24px',
                backgroundColor: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div className="flex items-center justify-between" style={{ marginBottom: '10px' }}>
                  <span className="badge badge-category" style={{ fontSize: '0.74rem' }}>
                    {item.category}
                  </span>
                  {item.verified ? (
                    <span className="badge badge-verified" style={{ fontSize: '0.72rem' }}>
                      <ShieldCheck size={12} /> Verified
                    </span>
                  ) : (
                    <span className="badge badge-pending" style={{ fontSize: '0.72rem' }}>
                      Pending Review
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '6px', color: 'var(--primary-900)' }}>
                  {item.name}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  <div className="flex items-start gap-2">
                    <MapPin size={14} color="var(--primary-700)" style={{ marginTop: '3px', flexShrink: 0 }} />
                    <span>{item.address} ({item.ward})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} color="var(--accent-amber)" />
                    <span>{item.hours}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--surface-200)', paddingTop: '14px' }}>
                <div className="flex items-center gap-1" style={{ color: '#D97706', fontSize: '0.84rem', fontWeight: 700 }}>
                  <Star size={14} fill="#D97706" />
                  <span>{item.rating}</span>
                </div>
                <a
                  href={`tel:${item.phone.replace(/\s+/g, '')}`}
                  className="btn btn-secondary btn-sm"
                  style={{ borderRadius: '8px' }}
                >
                  <Phone size={14} color="#059669" />
                  <span>Call {item.phone}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Registration Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '32px' }}>
            <div className="flex items-center justify-between" style={{ marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-900)' }}>
                  Register Your Local Business
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                  Subject to municipal staff verification before public directory listing.
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} style={{ cursor: 'pointer', background: 'none', border: 'none' }}>
                <X size={20} />
              </button>
            </div>

            {submittedSuccess ? (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <CheckCircle size={48} color="#059669" style={{ margin: '0 auto 16px auto' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#059669', marginBottom: '8px' }}>
                  Submission Received!
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Your business has been forwarded to Anthoor Municipality Revenue & Trade section for verification.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitBusiness} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    Business / Enterprise Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Bakery, Malabar Textiles"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--surface-300)' }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--surface-300)' }}
                    >
                      {categories.filter(c => c !== 'all').map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      Ward *
                    </label>
                    <select
                      value={formData.ward}
                      onChange={e => setFormData({ ...formData, ward: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--surface-300)' }}
                    >
                      {WARDS.slice(0, 15).map(w => (
                        <option key={w.id} value={`Ward ${w.number} - ${w.name}`}>
                          Ward {w.number} - {w.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98470 XXXXX"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--surface-300)' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      Business Hours
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 9 AM - 9 PM"
                      value={formData.hours}
                      onChange={e => setFormData({ ...formData, hours: e.target.value })}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--surface-300)' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    Address / Landmark *
                  </label>
                  <textarea
                    required
                    rows="2"
                    placeholder="Exact location or door number in Anthoor Municipality"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--surface-300)' }}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: '10px' }}>
                  Submit for Municipal Verification
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
