import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MUNICIPAL_PROJECTS } from '../data/anthoorData';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle 
} from 'lucide-react';

export default function ProjectsPage() {
  const { language } = useLanguage();
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredProjects = MUNICIPAL_PROJECTS.filter(p => {
    if (filterStatus === 'all') return true;
    return p.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <span className="badge badge-verified"><CheckCircle2 size={12} /> Completed</span>;
      case 'ongoing':
        return <span className="badge badge-pending"><Clock size={12} /> Ongoing</span>;
      case 'approved':
        return <span className="badge badge-category"><AlertCircle size={12} /> Approved</span>;
      default:
        return <span className="badge badge-category">{status}</span>;
    }
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
            <Briefcase size={15} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {language === 'ml' ? 'നഗരസഭാ വികസന പദ്ധതികൾ' : 'Municipal Development Projects Tracker'}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, marginBottom: '14px' }}>
            {language === 'ml' ? 'വികസന കാര്യക്ഷമത & സുതാര്യത' : 'Public Works & Transparency Portal'}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#E2E8F0', lineHeight: 1.6 }}>
            {language === 'ml'
              ? 'ആന്തൂർ നഗരസഭയിലെ അടിസ്ഥാന സൗകര്യ വികസനങ്ങൾ, ബജറ്റ് വിഹിതം, നിർമ്മാണ പുരോഗതി എന്നിവ പരിശോധിക്കാം.'
              : 'Track ongoing and completed civil infrastructure works, budgets, contractors, and progress across Anthoor Municipality.'}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ marginTop: '-36px' }}>
        
        {/* Status Filters */}
        <div className="glass-card" style={{ padding: '16px 20px', backgroundColor: '#FFFFFF', marginBottom: '32px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {['all', 'ongoing', 'completed', 'approved'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                style={{
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'capitalize',
                  cursor: 'pointer',
                  backgroundColor: filterStatus === status ? '#064E3B' : 'var(--surface-100)',
                  color: filterStatus === status ? '#FFFFFF' : 'var(--text-main)',
                  border: '1px solid var(--border-light)'
                }}
              >
                {status === 'all' ? (language === 'ml' ? 'എല്ലാ പദ്ധതികളും' : 'All Projects') : status}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {filteredProjects.map(proj => (
            <div key={proj.id} className="glass-card" style={{ padding: '28px 32px', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <div className="flex items-center gap-2" style={{ marginBottom: '8px' }}>
                    {getStatusBadge(proj.status)}
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {proj.wardName}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-900)', margin: '4px 0' }}>
                    {language === 'ml' && proj.name_ml ? proj.name_ml : proj.name}
                  </h2>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    Contractor / Agency: <strong>{proj.contractor}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>SANCTIONED BUDGET</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#059669' }}>
                    {proj.budget}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-main)', lineHeight: 1.6, marginBottom: '20px' }}>
                {proj.description}
              </p>

              {/* Progress Bar */}
              <div style={{ marginBottom: '20px' }}>
                <div className="flex items-center justify-between" style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Completion Progress:</span>
                  <span style={{ color: '#059669', fontWeight: 800 }}>{proj.progress}%</span>
                </div>
                <div style={{ width: '100%', height: '10px', backgroundColor: 'var(--surface-200)', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${proj.progress}%`,
                    height: '100%',
                    backgroundColor: proj.progress === 100 ? '#059669' : '#D97706',
                    borderRadius: '9999px',
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
              </div>

              {/* Footer Meta */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--surface-200)', paddingTop: '16px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Commenced: {proj.startDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 size={14} />
                    <span>Target: {proj.expectedCompletion}</span>
                  </div>
                </div>

                {proj.coordinates && (
                  <Link to={`/map?lat=${proj.coordinates[0]}&lng=${proj.coordinates[1]}`} className="btn btn-secondary btn-sm">
                    <MapPin size={14} />
                    <span>View Location on Map</span>
                  </Link>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
