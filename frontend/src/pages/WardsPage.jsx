import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { WARDS } from '../data/anthoorData';
import { 
  Building2, 
  MapPin, 
  Users, 
  Phone, 
  Search 
} from 'lucide-react';

export default function WardsPage() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredWards = WARDS.filter(w => {
    const q = searchTerm.toLowerCase();
    return !q ||
      w.name.toLowerCase().includes(q) ||
      (w.name_ml && w.name_ml.toLowerCase().includes(q)) ||
      w.councillor.toLowerCase().includes(q) ||
      `ward ${w.number}`.includes(q);
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
            <Building2 size={15} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {language === 'ml' ? 'ആന്തൂർ നഗരസഭാ വാർഡുകൾ' : 'Anthoor Municipal Electoral Wards'}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            {language === 'ml' ? 'വാർഡ് ഡയറക്ടറി (28 വാർഡുകൾ)' : 'Ward Explorer & Directory (28 Wards)'}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#E2E8F0', lineHeight: 1.6 }}>
            {language === 'ml'
              ? 'ആന്തൂർ നഗരസഭയിലെ 28 വാർഡുകളിലെ കൗൺസിലർമാർ, ജനസംഖ്യ, സ്ഥാപനങ്ങൾ എന്നിവ അറിയാം.'
              : 'Discover ward boundaries, elected councillors, population statistics, and facility densities across all 28 municipal wards.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '-36px' }}>
        
        {/* Search Bar */}
        <div className="glass-card" style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', marginBottom: '32px' }}>
          <div style={{ position: 'relative', maxWidth: '480px' }}>
            <Search size={18} color="var(--primary-700)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder={language === 'ml' ? 'വാർഡുകൾ അല്ലെങ്കിൽ കൗൺസിലറെ തിരയുക...' : 'Search ward name, number, or councillor...'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 38px',
                borderRadius: '10px',
                border: '1px solid var(--surface-200)',
                backgroundColor: 'var(--surface-50)',
                fontSize: '0.92rem'
              }}
            />
          </div>
        </div>

        {/* Wards Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filteredWards.map(ward => (
            <div
              key={ward.id}
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
                {/* Ward Number Badge */}
                <div className="flex items-center justify-between" style={{ marginBottom: '14px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    backgroundColor: '#059669',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '1.05rem'
                  }}>
                    {ward.number}
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-700)', backgroundColor: 'var(--primary-50)', padding: '3px 8px', borderRadius: '6px' }}>
                    {ward.facilitiesCount} {language === 'ml' ? 'സ്ഥാപനങ്ങൾ' : 'facilities'}
                  </span>
                </div>

                {/* Ward Name */}
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '4px', color: 'var(--primary-900)' }}>
                  {language === 'ml' && ward.name_ml ? ward.name_ml : ward.name}
                </h3>
                {ward.name_ml && language !== 'ml' && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', fontFamily: 'var(--font-malayalam)' }}>
                    {ward.name_ml}
                  </div>
                )}

                {/* Councillor & Population */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--surface-200)', paddingTop: '14px', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.84rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Councillor: </span>
                    <strong>{ward.councillor}</strong>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <Users size={14} />
                    <span>Population: <strong>{ward.population.toLocaleString()}</strong> residents</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    <Phone size={14} color="#059669" />
                    <span>Contact: <strong>{ward.phone}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <Link
                to={`/map?ward=${ward.id}`}
                className="btn btn-secondary btn-sm"
                style={{ width: '100%', justifyContent: 'center', marginTop: '8px' }}
              >
                <MapPin size={14} />
                <span>{language === 'ml' ? 'മാപ്പിൽ ഈ വാർഡ് കാണുക' : 'Explore Ward on Map'}</span>
              </Link>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
