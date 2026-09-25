import React, { useState } from 'react';
import { useMap } from 'react-leaflet';
import { useLanguage } from '../../context/LanguageContext';
import { MUNICIPALITY_INFO } from '../../data/anthoorData';
import { 
  Plus, 
  Minus, 
  Navigation, 
  RotateCcw, 
  Maximize, 
  Minimize, 
  Layers, 
  Check,
  Compass,
  Map as MapIcon,
  Globe,
  Mountain
} from 'lucide-react';

export default function MapControls({
  currentBasemap = 'streets',
  onChangeBasemap,
  activeLayers = {
    boundary: true,
    wards: true,
    roads: true,
    facilities: true,
    waterways: true,
    projects: true,
    businesses: true
  },
  onToggleLayer,
  onLocateUser,
  isLocating = false
}) {
  const map = useMap();
  const { language } = useLanguage();
  const [layersMenuOpen, setLayersMenuOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();
  
  const handleResetView = () => {
    map.flyTo(MUNICIPALITY_INFO.centerCoordinates, 13, { duration: 1.0 });
  };

  const handleFlyToHub = (coords, zoom = 15) => {
    map.flyTo(coords, zoom, { duration: 1.2 });
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const layerOptions = [
    { key: 'maskOutside', label: 'Isolate Anthoor / നഗരസഭ മാത്രം', color: '#10B981' },
    { key: 'facilities', label: 'Facilities / സ്ഥാപനങ്ങൾ', color: '#059669' },
    { key: 'roads', label: 'Roads / റോഡുകൾ (Corridors)', color: '#F59E0B' },
    { key: 'waterways', label: 'River & Mangroves / പുഴ & കണ്ടൽ', color: '#0284C7' },
    { key: 'projects', label: 'Projects / വികസന പദ്ധതികൾ', color: '#F97316' },
    { key: 'businesses', label: 'Businesses / വ്യാപാരങ്ങൾ', color: '#0891B2' },
    { key: 'boundary', label: 'Boundary / നഗരസഭാ അതിർത്തി', color: '#047857' }
  ];

  const anthoorHubs = [
    { name: 'Dharmasala (HQ)', name_ml: 'ധർമ്മശാല', coords: [11.9865, 75.3765], zoom: 15 },
    { name: 'Parassinikkadavu', name_ml: 'പറശ്ശിനിക്കടവ്', coords: [11.9828, 75.4013], zoom: 16 },
    { name: 'Mangattuparamba', name_ml: 'മാങ്ങാട്ടുപറമ്പ്', coords: [11.9858, 75.3819], zoom: 15 },
    { name: 'Vellikkeel Eco Park', name_ml: 'വെള്ളിക്കീൽ', coords: [12.0005, 75.3412], zoom: 15 },
    { name: 'Morazha Heritage', name_ml: 'മൊറാഴ', coords: [11.9872, 75.3522], zoom: 15 }
  ];

  const basemapList = [
    { key: 'streets', label: 'Streets', label_ml: 'തെരുവ്', icon: MapIcon },
    { key: 'positron', label: 'Clean Canvas', label_ml: 'ക്ലീൻ', icon: Layers },
    { key: 'satellite', label: 'Satellite', label_ml: 'ഉപഗ്രഹം', icon: Globe },
    { key: 'terrain', label: 'Terrain', label_ml: 'ഭൂപ്രകൃതി', icon: Mountain }
  ];

  return (
    <div style={{
      position: 'absolute',
      right: '14px',
      bottom: '24px',
      zIndex: 850,
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      alignItems: 'flex-end'
    }}>
      {/* Layers & Basemap Customization Popover Menu */}
      {layersMenuOpen && (
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(16px)',
          borderRadius: '14px',
          border: '1px solid #CBD5E1',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)',
          padding: '12px 14px',
          minWidth: '250px',
          maxWidth: '280px',
          marginBottom: '4px',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          {/* Basemap Switcher Header */}
          <div style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            color: '#064E3B',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {language === 'ml' ? 'മാപ്പ് ശൈലി (Basemap)' : 'Map Style (Basemap)'}
          </div>

          {/* Basemap Selection Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6px',
            marginBottom: '14px'
          }}>
            {basemapList.map((bm) => {
              const active = currentBasemap === bm.key;
              const IconComponent = bm.icon;
              return (
                <button
                  key={bm.key}
                  type="button"
                  onClick={() => onChangeBasemap && onChangeBasemap(bm.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    border: active ? '2px solid #059669' : '1px solid #E2E8F0',
                    backgroundColor: active ? '#ECFDF5' : '#FFFFFF',
                    color: active ? '#064E3B' : '#475569',
                    fontSize: '0.75rem',
                    fontWeight: active ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <IconComponent size={14} color={active ? '#059669' : '#64748B'} />
                  <span>{language === 'ml' ? bm.label_ml : bm.label}</span>
                </button>
              );
            })}
          </div>

          <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '8px 0' }}></div>

          {/* Layers Toggle Header */}
          <div style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            color: '#064E3B',
            marginBottom: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            {language === 'ml' ? 'മാപ്പ് ലെയറുകൾ' : 'Municipal GIS Layers'}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '12px' }}>
            {layerOptions.map((layer) => {
              const active = activeLayers[layer.key];
              return (
                <button
                  key={layer.key}
                  type="button"
                  onClick={() => onToggleLayer(layer.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: active ? '#F0FDF4' : 'transparent',
                    cursor: 'pointer',
                    fontSize: '0.76rem',
                    fontWeight: active ? 700 : 500,
                    color: active ? '#064E3B' : '#475569',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: layer.color
                    }}></span>
                    <span>{layer.label}</span>
                  </div>
                  {active && <Check size={14} color="#059669" />}
                </button>
              );
            })}
          </div>

          <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '8px 0' }}></div>

          {/* Quick Hub Navigation */}
          <div style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            color: '#064E3B',
            marginBottom: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Compass size={13} color="#059669" />
            <span>{language === 'ml' ? 'പ്രധാന കേന്ദ്രങ്ങളിലേക്ക്' : 'Quick Hub Jump'}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {anthoorHubs.map((hub) => (
              <button
                key={hub.name}
                type="button"
                onClick={() => handleFlyToHub(hub.coords, hub.zoom)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: '#334155',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#ECFDF5';
                  e.currentTarget.style.borderColor = '#10B981';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#F8FAFC';
                  e.currentTarget.style.borderColor = '#CBD5E1';
                }}
              >
                {language === 'ml' ? hub.name_ml : hub.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Buttons Column */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(16px)',
        padding: '5px',
        borderRadius: '12px',
        border: '1px solid #CBD5E1',
        boxShadow: '0 4px 14px rgba(0,0,0,0.12)'
      }}>
        {/* Layer Selector Button */}
        <button
          type="button"
          onClick={() => setLayersMenuOpen(!layersMenuOpen)}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: layersMenuOpen ? '#064E3B' : 'transparent',
            color: layersMenuOpen ? '#FFFFFF' : '#334155',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease'
          }}
          title={language === 'ml' ? 'മാപ്പ് ലെയറുകൾ മാറ്റുക' : 'Toggle Map Layers & Style'}
          aria-label="Map Layers"
        >
          <Layers size={17} />
        </button>

        <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '2px 0' }}></div>

        {/* Locate Me (GPS) */}
        <button
          type="button"
          onClick={onLocateUser}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: isLocating ? '#0284C7' : 'transparent',
            color: isLocating ? '#FFFFFF' : '#334155',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease'
          }}
          title={language === 'ml' ? 'എന്റെ സ്ഥാനം കണ്ടെത്തുക (GPS)' : 'Locate Me (GPS)'}
          aria-label="Locate User"
        >
          <Navigation size={16} />
        </button>

        {/* Reset View */}
        <button
          type="button"
          onClick={handleResetView}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: '#334155',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease'
          }}
          title={language === 'ml' ? 'കാഴ്ച ക്രമീകരിക്കുക' : 'Reset View to Anthoor'}
          aria-label="Reset View"
        >
          <RotateCcw size={15} />
        </button>

        <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '2px 0' }}></div>

        {/* Zoom In */}
        <button
          type="button"
          onClick={handleZoomIn}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: '#334155',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease'
          }}
          title="Zoom In"
          aria-label="Zoom In"
        >
          <Plus size={18} />
        </button>

        {/* Zoom Out */}
        <button
          type="button"
          onClick={handleZoomOut}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: '#334155',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease'
          }}
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <Minus size={18} />
        </button>

        <div style={{ height: '1px', backgroundColor: '#E2E8F0', margin: '2px 0' }}></div>

        {/* Fullscreen */}
        <button
          type="button"
          onClick={handleToggleFullscreen}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            color: '#334155',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s ease'
          }}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Map'}
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
        </button>
      </div>
    </div>
  );
}
