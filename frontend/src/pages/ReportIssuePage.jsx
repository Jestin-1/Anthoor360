import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { WARDS } from '../data/anthoorData';
import { api } from '../services/api';
import { 
  AlertCircle, 
  Camera, 
  CheckCircle2, 
  Send 
} from 'lucide-react';

export default function ReportIssuePage() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    issueType: 'Road Damage / Potholes',
    wardId: 7,
    title: '',
    description: '',
    address: '',
    phone: '',
    name: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState(null);

  const issueTypes = [
    'Road Damage / Potholes',
    'Streetlight Outage / Dark Corridor',
    'Solid Waste / Illegal Garbage Dumping',
    'Drainage Blockage / Waterlogging',
    'Drinking Water Leakage / Pipeline Fault',
    'Stray Animal Hazard',
    'Other Public Infrastructure'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    api.submitIssue(formData).then(res => {
      setSubmitting(false);
      setTicketResult(res);
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
            <AlertCircle size={15} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {language === 'ml' ? 'പൗരപരാതി പരിഹാര സെൽ' : 'Civic Grievance Redressal'}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            {t('reportIssueTitle')}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#E2E8F0', lineHeight: 1.6 }}>
            {t('reportIssueSubtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ maxWidth: '780px', marginTop: '-36px' }}>
        
        {ticketResult ? (
          /* Success Screen */
          <div className="glass-card" style={{ padding: '40px', backgroundColor: '#FFFFFF', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#D1FAE5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              color: '#059669'
            }}>
              <CheckCircle2 size={36} />
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '8px' }}>
              Report Registered Successfully!
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              Your issue has been routed to the Municipal Public Works & Health section for inspection.
            </p>

            {/* Token Badge */}
            <div style={{
              backgroundColor: 'var(--primary-50)',
              border: '2px dashed var(--primary-600)',
              padding: '16px 24px',
              borderRadius: '16px',
              maxWidth: '360px',
              margin: '0 auto 32px auto'
            }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>OFFICIAL TRACKING TOKEN</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-800)', letterSpacing: '0.05em' }}>
                {ticketResult.trackingCode}
              </div>
            </div>

            {/* Lifecycle Tracker */}
            <div style={{ marginBottom: '32px', textAlign: 'left', backgroundColor: 'var(--surface-50)', padding: '20px', borderRadius: '14px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '12px' }}>
                RESOLUTION LIFECYCLE
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
                {['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved'].map((step, idx) => (
                  <div key={step} style={{ textAlign: 'center', flex: 1 }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: idx === 0 ? '#059669' : 'var(--surface-300)',
                      color: '#FFFFFF',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 6px auto'
                    }}>
                      {idx + 1}
                    </div>
                    <div style={{ fontSize: '0.74rem', fontWeight: idx === 0 ? 700 : 500, color: idx === 0 ? '#059669' : 'var(--text-muted)' }}>
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setTicketResult(null)}
              className="btn btn-secondary"
            >
              Report Another Issue
            </button>
          </div>
        ) : (
          /* Report Form */
          <div className="glass-card" style={{ padding: '36px 40px', backgroundColor: '#FFFFFF' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('issueType')} *
                </label>
                <select
                  value={formData.issueType}
                  onChange={e => setFormData({ ...formData, issueType: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--surface-300)', fontSize: '0.92rem' }}
                >
                  {issueTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    Municipal Ward *
                  </label>
                  <select
                    value={formData.wardId}
                    onChange={e => setFormData({ ...formData, wardId: Number(e.target.value) })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--surface-300)', fontSize: '0.92rem' }}
                  >
                    {WARDS.map(w => (
                      <option key={w.id} value={w.id}>Ward {w.number}: {w.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    Specific Landmark / Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Near Bus Stand, Road junction"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--surface-300)', fontSize: '0.92rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('issueTitle')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Large pothole opposite GCEK gate causing water stagnation"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--surface-300)', fontSize: '0.92rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  {t('issueDesc')} *
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="Provide precise details such as exact location, severity, duration of issue..."
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--surface-300)', fontSize: '0.92rem' }}
                ></textarea>
              </div>

              {/* Photo Upload Simulator */}
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  Attach Photo (Optional)
                </label>
                <div style={{
                  border: '2px dashed var(--surface-300)',
                  borderRadius: '12px',
                  padding: '20px',
                  textAlign: 'center',
                  backgroundColor: 'var(--surface-50)',
                  cursor: 'pointer'
                }}>
                  <Camera size={28} color="var(--primary-700)" style={{ margin: '0 auto 8px auto' }} />
                  <div style={{ fontSize: '0.86rem', fontWeight: 600 }}>Click to browse or take photo</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JPEG, PNG up to 5MB</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    Reporter Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--surface-300)', fontSize: '0.92rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    Contact Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94470 XXXXX"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--surface-300)', fontSize: '0.92rem' }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg"
                style={{ marginTop: '12px', justifyContent: 'center' }}
              >
                <Send size={18} />
                <span>{submitting ? 'Submitting to Municipal Desk...' : t('submitIssueBtn')}</span>
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
