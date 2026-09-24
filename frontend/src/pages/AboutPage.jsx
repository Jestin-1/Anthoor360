import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  MapPin, 
  Landmark, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export default function AboutPage() {
  const { language, t } = useLanguage();

  const milestones = [
    { year: "1940", title: "Historic Morazha Peasant Incident", title_ml: "മൊറാഴ കർഷക സമരം", desc: "Heroic peasant uprising against feudal exploitation and British police repression, marking a pivotal milestone in Kerala's national freedom struggle." },
    { year: "1986", title: "Establishment of Govt. Engineering College (GCEK)", title_ml: "ഗവ. എൻജിനീയറിങ് കോളേജ് കണ്ണൂർ സ്ഥാപിച്ചു", desc: "Founded at Mangattuparamba, establishing Anthoor as a leading technical education hub in North Malabar." },
    { year: "2008", title: "National Institute of Fashion Technology (NIFT)", title_ml: "നിഫ്റ്റ് കാമ്പസ് പ്രവർത്തനം ആരംഭിച്ചു", desc: "Premier national design school commissioned at Dharmasala, attracting students and designers from across India." },
    { year: "2015", title: "Formation of Anthoor Municipality", title_ml: "ആന്തൂർ നഗരസഭയുടെ രൂപീകരണം", desc: "Anthoor was officially upgraded from grama panchayat to an independent municipality, encompassing 28 wards across 23.47 sq km." },
    { year: "2024+", title: "Anthoor 360 Digital Civic GIS Era", title_ml: "ആന്തൂർ 360 ഡിജിറ്റൽ നവയുഗം", desc: "Implementation of comprehensive GIS mapping, citizen service automation, green eco-tourism, and sustainable urban infrastructure." }
  ];

  return (
    <div style={{ paddingBottom: '80px' }}>
      
      {/* Hero Header */}
      <section style={{
        background: `linear-gradient(rgba(6, 52, 38, 0.85), rgba(6, 78, 59, 0.92)), url('/assets/anthoor_hero.jpg') center/cover no-repeat`,
        color: '#FFFFFF',
        padding: '64px 0 80px 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(10px)', marginBottom: '16px' }}>
            <Landmark size={15} />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
              {language === 'ml' ? 'നഗരസഭാ പ്രൊഫൈൽ' : 'Municipal Heritage & Profile'}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '16px' }}>
            {t('aboutAnthoorTitle')}
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#E2E8F0', lineHeight: 1.6 }}>
            {t('aboutAnthoorSummary')}
          </p>
        </div>
      </section>

      {/* Overview Statistics */}
      <section style={{ marginTop: '-36px', marginBottom: '56px' }}>
        <div className="container">
          <div className="glass-card" style={{ padding: '24px 32px', backgroundColor: '#FFFFFF' }}>
            <div className="grid grid-cols-4 gap-4" style={{ textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>ESTABLISHED</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-800)' }}>2015</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL AREA</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-800)' }}>23.47 sq.km</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>ELECTORAL WARDS</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-800)' }}>28 Wards</div>
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>HEADQUARTERS</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-800)' }}>Dharmasala</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative Content */}
      <div className="container">
        <div className="grid grid-cols-3 gap-8" style={{ marginBottom: '64px' }}>
          
          {/* Main Story (2 cols) */}
          <div style={{ gridColumn: 'span 2' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', color: 'var(--primary-900)' }}>
              {language === 'ml' ? 'ചരിത്രവും സംസ്കാരവും' : 'History, Culture & Identity'}
            </h2>
            
            <p style={{ fontSize: '0.98rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '16px' }}>
              Anthoor is a culturally vibrant municipality nestled in Taliparamba Taluk of Kannur district, Kerala. Flanked by the serene waters of the Valapattanam River to the south and east, Anthoor has evolved from an agrarian landscape into North Malabar's premier educational and knowledge capital.
            </p>

            <p style={{ fontSize: '0.98rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '24px' }}>
              The region is globally known for the sacred <strong>Parassinikkadavu Sree Muthappan Madappura</strong>, where traditional Theyyam rituals are performed every day of the year, embodying communal harmony, equality, and compassion. The historical 1940 <strong>Morazha peasant uprising</strong> against colonial oppression remains an enduring symbol of political courage and social reform in Kerala history.
            </p>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '12px', color: 'var(--primary-900)' }}>
              {language === 'ml' ? 'വിദ്യാഭ്യാസ-സാങ്കേതിക ഹബ്ബ്' : 'Knowledge & Technological Hub'}
            </h3>

            <p style={{ fontSize: '0.98rem', lineHeight: '1.7', color: 'var(--text-main)', marginBottom: '24px' }}>
              Anthoor houses some of the most prestigious academic institutions in the state, including the <strong>Government College of Engineering Kannur (GCEK)</strong>, the <strong>National Institute of Fashion Technology (NIFT Kannur)</strong>, and the <strong>Kannur University Mangattuparamba Campus</strong>. Thousands of aspiring engineers, designers, researchers, and athletes call Anthoor their academic home.
            </p>

            {/* Landmarks Image Grid */}
            <div className="grid grid-cols-2 gap-4" style={{ marginBottom: '32px' }}>
              <div style={{ borderRadius: '16px', overflow: 'hidden', height: '220px' }}>
                <img
                  src="/assets/muthappan_temple.jpg"
                  alt="Parassinikkadavu Muthappan Temple"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ borderRadius: '16px', overflow: 'hidden', height: '220px' }}>
                <img
                  src="/assets/vellikkeel_park.jpg"
                  alt="Vellikkeel Eco Park"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Timeline */}
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '20px', color: 'var(--primary-900)' }}>
              {language === 'ml' ? 'പ്രധാന നാഴികക്കല്ലുകൾ' : 'Historical Milestones'}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {milestones.map((m, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  gap: '16px',
                  backgroundColor: '#FFFFFF',
                  padding: '16px 20px',
                  borderRadius: '14px',
                  border: '1px solid var(--border-light)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
                }}>
                  <div style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#059669',
                    backgroundColor: 'var(--primary-50)',
                    padding: '8px 12px',
                    borderRadius: '10px',
                    height: 'fit-content'
                  }}>
                    {m.year}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>
                      {language === 'ml' && m.title_ml ? m.title_ml : m.title}
                    </h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                      {m.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Sidebar: Administration & Contacts (1 col) */}
          <div>
            <div className="glass-card" style={{ padding: '24px', backgroundColor: '#FFFFFF', marginBottom: '24px' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '16px' }}>
                <ShieldCheck size={20} color="#059669" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-900)' }}>
                  {language === 'ml' ? 'നഗരസഭാ ഭരണസമിതി' : 'Municipal Leadership'}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.88rem' }}>
                <div style={{ borderBottom: '1px solid var(--surface-200)', paddingBottom: '10px' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>CHAIRPERSON</div>
                  <div style={{ fontWeight: 700, color: 'var(--primary-900)' }}>P. Mukundan</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Anthoor Municipal Council</div>
                </div>

                <div style={{ borderBottom: '1px solid var(--surface-200)', paddingBottom: '10px' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>VICE CHAIRPERSON</div>
                  <div style={{ fontWeight: 700, color: 'var(--primary-900)' }}>V. Geetha</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Mangattuparamba</div>
                </div>

                <div style={{ borderBottom: '1px solid var(--surface-200)', paddingBottom: '10px' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>MUNICIPAL SECRETARY</div>
                  <div style={{ fontWeight: 700, color: 'var(--primary-900)' }}>Administrative Head</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Ph: 0497 2780005</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>CIVIC HEADQUARTERS</div>
                  <div style={{ fontWeight: 600 }}>Dharmasala, Kannur - 670567</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Email: anthoormunicipality@gmail.com</div>
                </div>
              </div>

              <Link to="/map" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}>
                <MapPin size={15} />
                <span>Locate Municipal Office on Map</span>
              </Link>
            </div>

            {/* Quick Actions Card */}
            <div className="glass-card" style={{ padding: '24px', backgroundColor: 'var(--primary-50)', border: '1px solid var(--primary-200)' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '8px' }}>
                Explore Wards & Map
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                Dive into ward boundaries, councillors, facility densities, and active developmental work.
              </p>
              <Link to="/wards" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                <span>Explore All 28 Wards</span>
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
