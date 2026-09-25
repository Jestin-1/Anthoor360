import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { DIRECTORY_ENTRIES } from '../../data/anthoorData';
import { createCategoryMarkerIcon } from './mapConfig';
import { useLanguage } from '../../context/LanguageContext';
import { Store, Star, Phone, ShieldCheck, MapPin } from 'lucide-react';

// Coordinates mapping for local business directory
const BUSINESS_COORDINATES = {
  'dir-1': [11.9860, 75.3815], // Malabar Bakers near GCEK gate
  'dir-2': [11.9868, 75.3785], // Dharmasala Medicals near CHC
  'dir-3': [11.9829, 75.4010], // Parassinikkadavu Traditional Brass
  'dir-4': [11.9855, 75.3760], // Apex Auto Care NH 66
  'dir-5': [11.9855, 75.3825]  // Silicon CAD Photostat College Rd
};

export default function BusinessLayer({ visible = true, onSelectBusiness }) {
  const { language } = useLanguage();
  if (!visible) return null;

  return (
    <>
      {DIRECTORY_ENTRIES.filter(b => b.verified).map((biz) => {
        const coords = BUSINESS_COORDINATES[biz.id] || [11.9865, 75.3780];
        const businessIcon = createCategoryMarkerIcon(biz);

        return (
          <Marker
            key={`biz-${biz.id}`}
            position={coords}
            icon={businessIcon}
            eventHandlers={{
              click: () => onSelectBusiness && onSelectBusiness(biz)
            }}
          >
            <Popup
              autoPan={true}
              autoPanPaddingTopLeft={[50, 260]}
              autoPanPaddingBottomRight={[50, 60]}
            >
              <div style={{ minWidth: '200px', padding: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    backgroundColor: '#CFFAFE',
                    color: '#0E7490',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Store size={11} />
                    <span>{biz.category}</span>
                  </span>

                  {biz.verified && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.68rem', color: '#059669', fontWeight: 700 }}>
                      <ShieldCheck size={11} />
                      <span>{language === 'ml' ? 'സ്ഥിരീകരിച്ചത്' : 'Approved'}</span>
                    </span>
                  )}
                </div>

                <h4 style={{ fontSize: '0.94rem', fontWeight: 800, margin: '2px 0 6px 0', color: '#0F172A' }}>
                  {biz.name}
                </h4>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.76rem', color: '#475569', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} color="#059669" />
                    <span>{biz.address}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Phone size={12} color="#0284C7" />
                    <span>{biz.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{biz.rating} / 5.0</span>
                    <span style={{ color: '#94A3B8', fontSize: '0.7rem' }}>({biz.hours})</span>
                  </div>
                </div>

                <a
                  href={`tel:${biz.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    backgroundColor: '#0891B2',
                    color: '#FFFFFF',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    textDecoration: 'none'
                  }}
                >
                  <Phone size={12} />
                  <span>{language === 'ml' ? 'വിളിക്കുക' : 'Call Business'}</span>
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
