import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { MUNICIPAL_PROJECTS } from '../../data/anthoorData';
import { createCategoryMarkerIcon } from './mapConfig';
import { useLanguage } from '../../context/LanguageContext';
import { Hammer, Calendar, IndianRupee, ExternalLink } from 'lucide-react';

export default function ProjectsLayer({ visible = true, onSelectProject }) {
  const { language } = useLanguage();
  if (!visible) return null;

  const projectIcon = createCategoryMarkerIcon('project');

  return (
    <>
      {MUNICIPAL_PROJECTS.map((proj) => {
        if (!proj.coordinates || proj.coordinates.length < 2) return null;

        const displayName = language === 'ml' && proj.name_ml ? proj.name_ml : proj.name;
        const statusColor = proj.status === 'Completed' ? '#16A34A' : proj.status === 'Ongoing' ? '#F59E0B' : '#3B82F6';

        return (
          <Marker
            key={`proj-${proj.id}`}
            position={proj.coordinates}
            icon={projectIcon}
            eventHandlers={{
              click: () => onSelectProject && onSelectProject(proj)
            }}
          >
            <Popup
              autoPan={true}
              autoPanPaddingTopLeft={[50, 260]}
              autoPanPaddingBottomRight={[50, 60]}
            >
              <div style={{ minWidth: '220px', padding: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    backgroundColor: '#FFEDD5',
                    color: '#C2410C',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Hammer size={11} />
                    <span>{language === 'ml' ? 'വികസന പദ്ധതി' : 'Municipal Project'}</span>
                  </span>

                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: statusColor,
                    backgroundColor: `${statusColor}18`,
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    {language === 'ml' && proj.status_ml ? proj.status_ml : proj.status}
                  </span>
                </div>

                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '2px 0 6px 0', color: '#0F172A' }}>
                  {displayName}
                </h4>

                {/* Progress bar */}
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B', marginBottom: '2px' }}>
                    <span>{language === 'ml' ? 'പുരോഗതി' : 'Progress'}</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{proj.progress}%</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${proj.progress}%`, height: '100%', backgroundColor: statusColor, borderRadius: '4px' }}></div>
                  </div>
                </div>

                {/* Budget & Target */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.76rem', color: '#475569', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IndianRupee size={12} color="#059669" />
                    <span>{proj.budget}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} color="#D97706" />
                    <span>{language === 'ml' ? 'തീരുന്ന തീയതി' : 'Target'}: {proj.expectedCompletion}</span>
                  </div>
                </div>

                <Link
                  to="/projects"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#F97316',
                    color: '#FFFFFF',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <span>{language === 'ml' ? 'പദ്ധതി വിവരങ്ങൾ' : 'View Project Details'}</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
