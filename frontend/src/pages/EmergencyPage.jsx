import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { EMERGENCY_CONTACTS } from '../data/anthoorData';
import { 
  PhoneCall, 
  ShieldAlert, 
  AlertTriangle 
} from 'lucide-react';

export default function EmergencyPage() {
  const { language, t } = useLanguage();

  return (
    <div style={{ paddingBottom: '80px' }}>
      
      {/* Header */}
      <section style={{
        background: 'linear-gradient(135deg, #991B1B, #E11D48)',
        color: '#FFFFFF',
        padding: '56px 0 72px 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)', marginBottom: '16px' }}>
            <ShieldAlert size={15} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em' }}>
              24x7 VERIFIED HOTLINE
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '14px' }}>
            {t('emergencyTitle')}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#FEE2E2', lineHeight: 1.6 }}>
            {t('emergencySubtitle')}
          </p>
        </div>
      </section>

      {/* Emergency Grid */}
      <div className="container" style={{ marginTop: '-36px' }}>
        <div className="grid grid-cols-2 gap-6" style={{ marginBottom: '48px' }}>
          {EMERGENCY_CONTACTS.map((em, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '24px 28px',
                backgroundColor: '#FFFFFF',
                borderLeft: '5px solid #E11D48',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div className="flex items-center justify-between" style={{ marginBottom: '10px' }}>
                  <span className="badge badge-urgent">
                    {em.badge}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Kannur District
                  </span>
                </div>

                <h3 style={{ fontSize: '1.28rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '4px' }}>
                  {language === 'ml' && em.title_ml ? em.title_ml : em.title}
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
                  {em.desc}
                </p>
              </div>

              <div className="flex items-center justify-between" style={{ borderTop: '1px solid var(--surface-200)', paddingTop: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>PRIMARY NUMBER</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#E11D48' }}>
                    {em.phone}
                  </div>
                  {em.alternate && (
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                      Alt: {em.alternate}
                    </div>
                  )}
                </div>

                <a
                  href={`tel:${em.phone.replace(/\s+/g, '')}`}
                  className="btn btn-emergency"
                  style={{ borderRadius: '12px', padding: '10px 20px', fontWeight: 700 }}
                >
                  <PhoneCall size={16} />
                  <span>{t('callNow')}</span>
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Emergency First Aid & Action Guides */}
        <div className="glass-card" style={{ padding: '32px', backgroundColor: 'var(--surface-0)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={20} color="#D97706" />
            <span>Emergency Guidelines for Citizens</span>
          </h3>

          <div className="grid grid-cols-3 gap-6" style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
            <div style={{ backgroundColor: 'var(--surface-50)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              <strong style={{ color: '#E11D48', display: 'block', marginBottom: '6px' }}>Snake Bite Response</strong>
              Keep the patient calm, immobilize the affected limb without tight tourniquets, do not attempt cuts or suction, and immediately transfer to Parassinikkadavu Snake Venom Center or Kannur Govt Medical College.
            </div>

            <div style={{ backgroundColor: 'var(--surface-50)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              <strong style={{ color: '#D97706', display: 'block', marginBottom: '6px' }}>Electrical Sparks / Line Faults</strong>
              Never approach fallen live wires during monsoon winds. Alert KSEB Dharmasala (94960 10101) or 1912 immediately and cordon off the area from pedestrian traffic.
            </div>

            <div style={{ backgroundColor: 'var(--surface-50)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              <strong style={{ color: '#059669', display: 'block', marginBottom: '6px' }}>Monsoon Flood & Drainage Alert</strong>
              If river water levels rise rapidly along Valapattanam riverbank wards (Wards 10, 24, 25), notify Anthoor Disaster Cell (0497 2780005) for rapid rescue boat deployment.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
