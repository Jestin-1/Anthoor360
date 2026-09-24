import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, ScaleControl, useMap } from 'react-leaflet';
import { useLanguage } from '../context/LanguageContext';
import { MUNICIPALITY_INFO, CATEGORIES, WARDS, MUNICIPAL_PROJECTS } from '../data/anthoorData';
import { ANTHOOR_ROADS } from '../data/roadsData';
import { api } from '../services/api';
import FacilityDrawer from './FacilityDrawer';
import MapSidebar from './MapSidebar';

// Modular Map Sub-components
import MarkerClusterGroup from './Map/MarkerClusterGroup';
import MunicipalityBoundary from './Map/MunicipalityBoundary';
import WardLayer from './Map/WardLayer';
import RoadLayer from './Map/RoadLayer';
import ProjectsLayer from './Map/ProjectsLayer';
import BusinessLayer from './Map/BusinessLayer';
import WaterwaysLayer from './Map/WaterwaysLayer';
import MapLegend from './Map/MapLegend';
import MapControls from './Map/MapControls';
import WhatsAroundHere from './Map/WhatsAroundHere';
import { userLocationMarkerIcon, getCategoryMeta, BASEMAP_STYLES } from './Map/mapConfig';

import { 
  Search, 
  Navigation2, 
  RotateCcw, 
  ChevronDown,
  X,
  MapPin,
  Route,
  Layers
} from 'lucide-react';

// Controller to smoothly pan & zoom map programmatically
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
      map.flyTo(center, zoom || 14, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
}

export default function MapView({ 
  initialSelectedId = null, 
  initialCategory = null,
  initialWard = null,
  initialProject = null,
  initialRoad = null,
  initialSearch = '',
  initialTab = 'overview',
  isEmbedded = false 
}) {
  const { language, t } = useLanguage();

  // Calculate initial viewport from props
  const initialViewport = useMemo(() => {
    if (initialWard) {
      const w = WARDS.find(item => item.number === Number(initialWard) || item.id === Number(initialWard));
      if (w) return { center: w.coordinates, zoom: 15, ward: String(w.number) };
    }
    if (initialProject) {
      const p = MUNICIPAL_PROJECTS.find(item => item.id === initialProject);
      if (p && p.coordinates) return { center: p.coordinates, zoom: 16, ward: '' };
    }
    if (initialRoad) {
      const r = ANTHOOR_ROADS.find(item => item.id === initialRoad);
      if (r && r.coordinates.length > 0) {
        return { center: r.coordinates[Math.floor(r.coordinates.length / 2)], zoom: 15, ward: '' };
      }
    }
    return { center: MUNICIPALITY_INFO.centerCoordinates, zoom: 13, ward: initialWard || '' };
  }, [initialWard, initialProject, initialRoad]);

  // Primary data states
  const [facilities, setFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'all');
  const [selectedWard, setSelectedWard] = useState(() => initialViewport.ward);
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  // Active GIS Layers
  const [activeLayers, setActiveLayers] = useState({
    boundary: true,
    maskOutside: true,
    wards: true,
    roads: true,
    waterways: true,
    facilities: true,
    projects: true,
    businesses: true
  });

  // Current Basemap Style
  const [currentBasemap, setCurrentBasemap] = useState('streets');

  // Collapsible Municipal Smart Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(!isEmbedded && typeof window !== 'undefined' && window.innerWidth >= 1024);
  const [sidebarTab, setSidebarTab] = useState(initialTab || 'overview');

  // What's Around Here feature
  const [aroundFacility, setAroundFacility] = useState(null);
  const [aroundList, setAroundList] = useState([]);

  // Geolocation & Near Me
  const [userLocation, setUserLocation] = useState(null);
  const [nearMeActive, setNearMeActive] = useState(false);
  const [radiusKm, setRadiusKm] = useState(2); // 1, 2, or 5 km

  // Map viewport state
  const [mapCenter, setMapCenter] = useState(() => initialViewport.center);
  const [mapZoom, setMapZoom] = useState(() => initialViewport.zoom);

  // Toggle Layer visibility
  const handleToggleLayer = (layerKey) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  // Facility selection (offsets map center north so the marker & popup appear downwards below the top controls panel)
  const handleSelectFacility = useCallback((fac) => {
    if (!fac || !fac.coordinates) return;
    setSelectedFacility(fac);
    const downwardOffset = 0.0042;
    setMapCenter([fac.coordinates[0] + downwardOffset, fac.coordinates[1]]);
    setMapZoom(16);
  }, []);

  // "What's Around Here" trigger
  const handleFindAround = useCallback(async (fac) => {
    setAroundFacility(fac);
    try {
      const nearby = await api.getNearbyFacilities(fac.coordinates[0], fac.coordinates[1], 6, fac.id);
      setAroundList(nearby);
    } catch {
      setAroundList([]);
    }
  }, []);

  // Load facilities from lightweight map API or fallback
  useEffect(() => {
    const filters = {
      category: selectedCategory,
      ward: selectedWard,
      search: searchTerm,
      verifiedOnly
    };

    if (nearMeActive && userLocation) {
      filters.userLat = userLocation[0];
      filters.userLng = userLocation[1];
      filters.radiusKm = radiusKm;
    }

    api.getMapData(filters).then(res => {
      setFacilities(res);
      // Auto select initial facility if specified
      if (initialSelectedId) {
        const found = res.find(f => f.id === initialSelectedId);
        if (found) {
          handleSelectFacility(found);
        }
      }
    });
  }, [selectedCategory, selectedWard, searchTerm, verifiedOnly, nearMeActive, userLocation, radiusKm, initialSelectedId, handleSelectFacility]);

  // Synchronous client-side filter to guarantee map icons immediately reflect selected category, ward, & verification
  const displayedFacilities = useMemo(() => {
    let list = facilities;
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter(f => f.category === selectedCategory);
    }
    if (selectedWard) {
      list = list.filter(f => String(f.wardId) === String(selectedWard) || String(f.ward_number) === String(selectedWard));
    }
    if (verifiedOnly) {
      list = list.filter(f => f.verified);
    }
    return list;
  }, [facilities, selectedCategory, selectedWard, verifiedOnly]);

  // Geolocation Handler
  const handleNearMe = () => {
    if (nearMeActive) {
      setNearMeActive(false);
      setUserLocation(null);
      setMapCenter(MUNICIPALITY_INFO.centerCoordinates);
      setMapZoom(13);
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          setUserLocation([lat, lng]);
          setNearMeActive(true);
          setMapCenter([lat, lng]);
          setMapZoom(15);
        },
        () => {
          // If browser denies permission or in local testing, center around Dharmasala
          const fallbackLoc = [11.9734, 75.3852];
          setUserLocation(fallbackLoc);
          setNearMeActive(true);
          setMapCenter(fallbackLoc);
          setMapZoom(15);
        }
      );
    }
  };

  // Reset all active filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedWard('');
    setSearchTerm('');
    setVerifiedOnly(false);
    setNearMeActive(false);
    setUserLocation(null);
    setSelectedFacility(null);
    setAroundFacility(null);
    setMapCenter(MUNICIPALITY_INFO.centerCoordinates);
    setMapZoom(13);
  };

  // Live Auto-complete suggestions for map search
  const searchSuggestions = useMemo(() => {
    if (!searchTerm || searchTerm.trim().length < 2) return [];
    const q = searchTerm.toLowerCase().trim();

    const matchedFacs = facilities
      .filter(f => f.name.toLowerCase().includes(q) || (f.name_ml && f.name_ml.toLowerCase().includes(q)))
      .slice(0, 4)
      .map(f => ({ type: 'facility', data: f }));

    const matchedWards = WARDS
      .filter(w => w.name.toLowerCase().includes(q) || (w.name_ml && w.name_ml.toLowerCase().includes(q)) || `ward ${w.number}`.includes(q))
      .slice(0, 2)
      .map(w => ({ type: 'ward', data: w }));

    const matchedRoads = ANTHOOR_ROADS
      .filter(r => r.name.toLowerCase().includes(q) || (r.name_ml && r.name_ml.toLowerCase().includes(q)))
      .slice(0, 2)
      .map(r => ({ type: 'road', data: r }));

    return [...matchedFacs, ...matchedWards, ...matchedRoads];
  }, [searchTerm, facilities]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: isEmbedded ? '480px' : 'calc(100vh - 72px)',
      overflow: 'hidden',
      backgroundColor: '#E2E8F0'
    }}>
      
      {/* Collapsible Smart Municipal Sidebar (for Map-First experience) */}
      {!isEmbedded && (
        <MapSidebar
          isOpen={sidebarOpen}
          onToggleOpen={() => setSidebarOpen(prev => !prev)}
          activeTab={sidebarTab}
          onSelectTab={setSidebarTab}
          onSelectFacility={handleSelectFacility}
          onSelectWard={(ward) => {
            setSelectedWard(String(ward.number));
            setMapCenter(ward.coordinates);
            setMapZoom(15);
          }}
          onSelectProject={(proj) => {
            if (proj.coordinates) {
              setMapCenter([proj.coordinates[0] + 0.0042, proj.coordinates[1]]);
              setMapZoom(16);
            }
          }}
          onSelectCategory={(catSlug) => {
            setSelectedCategory(catSlug);
          }}
          facilities={facilities}
        />
      )}

      {/* Top Floating Controls Bar */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: (!isEmbedded && sidebarOpen) ? '402px' : '12px',
        right: selectedFacility ? '440px' : '12px',
        zIndex: 900,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none',
        transition: 'left 0.3s cubic-bezier(0.16, 1, 0.3, 1), right 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Official Municipal Identity & Quick Hub Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          backgroundColor: 'rgba(6, 78, 59, 0.94)',
          backdropFilter: 'blur(16px)',
          padding: '8px 14px',
          borderRadius: '14px',
          boxShadow: '0 4px 16px rgba(6, 78, 59, 0.25)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          pointerEvents: 'auto',
          color: '#FFFFFF'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {!isEmbedded && (
              <button
                type="button"
                onClick={() => setSidebarOpen(prev => !prev)}
                style={{
                  background: sidebarOpen ? '#10B981' : 'rgba(255, 255, 255, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '8px',
                  color: '#FFFFFF',
                  padding: '5px 9px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontSize: '0.78rem',
                  fontWeight: 700
                }}
                title={sidebarOpen ? 'Collapse Municipal Panel' : 'Open Municipal Panel'}
              >
                <Layers size={14} />
                <span>{sidebarOpen ? (language === 'ml' ? 'മാറ്റുക' : 'Hide') : (language === 'ml' ? 'മെനു' : 'Menu')}</span>
              </button>
            )}
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.82rem',
              color: '#FFFFFF'
            }}>
              ആ
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.02em', lineHeight: 1.2 }}>
                {language === 'ml' ? 'ആന്തൂർ നഗരസഭ — സമഗ്ര ഡിജിറ്റൽ ഭൂപടം' : 'Anthoor Municipality — Interactive Digital Map'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#A7F3D0', fontWeight: 500 }}>
                {language === 'ml' ? '28 വാർഡുകൾ • വിസ്തീർണ്ണം 23.47 ച.കി.മീ • കണ്ണൂർ ജില്ല' : '28 Wards • 23.47 sq km • Kannur District, Kerala'}
              </div>
            </div>
          </div>

          {/* Quick Hub Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto' }}>
            {[
              { name: 'Dharmasala', name_ml: 'ധർമ്മശാല', coords: [11.9734, 75.3852], zoom: 15 },
              { name: 'Parassinikkadavu', name_ml: 'പറശ്ശിനിക്കടവ്', coords: [11.9592, 75.4072], zoom: 16 },
              { name: 'Mangattuparamba', name_ml: 'മാങ്ങാട്ടുപറമ്പ്', coords: [11.9680, 75.3895], zoom: 15 },
              { name: 'Vellikkeel', name_ml: 'വെള്ളിക്കീൽ', coords: [12.0010, 75.3520], zoom: 15 },
              { name: 'Morazha', name_ml: 'മൊറാഴ', coords: [11.9860, 75.3620], zoom: 15 }
            ].map(hub => (
              <button
                key={hub.name}
                type="button"
                onClick={() => {
                  setMapCenter(hub.coords);
                  setMapZoom(hub.zoom);
                }}
                style={{
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  backgroundColor: 'rgba(255, 255, 255, 0.12)',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s'
                }}
                onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)'}
                onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)'}
              >
                {language === 'ml' ? hub.name_ml : hub.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Actions Strip */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(16px)',
          padding: '8px 12px',
          borderRadius: '16px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          border: '1px solid var(--border-light, #CBD5E1)',
          pointerEvents: 'auto',
          alignItems: 'center',
          position: 'relative'
        }}>
          
          {/* Live Search Input with Dropdown */}
          <div style={{ position: 'relative', flex: '1 1 200px', minWidth: '180px' }}>
            <Search size={16} color="var(--primary-700, #064E3B)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder={language === 'ml' ? 'മാപ്പിൽ തിരയുക (സ്ഥലങ്ങൾ, വാർഡുകൾ, റോഡുകൾ)...' : 'Search map (places, wards, roads)...'}
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              style={{
                width: '100%',
                padding: '8px 30px 8px 34px',
                fontSize: '0.86rem',
                border: '1px solid var(--surface-200, #CBD5E1)',
                borderRadius: '10px',
                backgroundColor: 'var(--surface-50, #F8FAFC)'
              }}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94A3B8',
                  padding: '2px'
                }}
              >
                <X size={14} />
              </button>
            )}

            {/* Live Search Auto-complete Popover */}
            {searchFocused && searchSuggestions.length > 0 && (
              <div 
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 6px)',
                  left: 0,
                  right: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                  border: '1px solid #CBD5E1',
                  overflow: 'hidden',
                  zIndex: 9999,
                  maxHeight: '260px',
                  overflowY: 'auto'
                }}
                onMouseDown={e => e.preventDefault()} // Prevents blur before click
              >
                {searchSuggestions.map((item, idx) => {
                  if (item.type === 'facility') {
                    const f = item.data;
                    const meta = getCategoryMeta(f.category);
                    return (
                      <div
                        key={`sugg-fac-${f.id}-${idx}`}
                        onClick={() => {
                          handleSelectFacility(f);
                          setSearchFocused(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #F1F5F9',
                          transition: 'background 0.15s ease'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#F0FDF4'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                      >
                        <MapPin size={14} color={meta.color} />
                        <div style={{ overflow: 'hidden' }}>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {language === 'ml' && f.name_ml ? f.name_ml : f.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                            {f.wardName || `Ward ${f.wardId}`} • {language === 'ml' ? meta.label_ml : meta.label}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (item.type === 'ward') {
                    const w = item.data;
                    return (
                      <div
                        key={`sugg-ward-${w.id}-${idx}`}
                        onClick={() => {
                          setSelectedWard(String(w.number));
                          setMapCenter(w.coordinates);
                          setMapZoom(15);
                          setSearchFocused(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #F1F5F9',
                          backgroundColor: '#F8FAFC'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#ECFDF5'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                      >
                        <MapPin size={14} color="#059669" />
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#064E3B' }}>
                            Ward {w.number}: {language === 'ml' && w.name_ml ? w.name_ml : w.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                            {w.facilitiesCount} Facilities • Councillor: {w.councillor}
                          </div>
                        </div>
                      </div>
                    );
                  }

                  if (item.type === 'road') {
                    const r = item.data;
                    return (
                      <div
                        key={`sugg-road-${r.id}-${idx}`}
                        onClick={() => {
                          const mid = r.coordinates[Math.floor(r.coordinates.length / 2)];
                          setMapCenter(mid);
                          setMapZoom(15);
                          setSearchFocused(false);
                        }}
                        style={{
                          padding: '8px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          borderBottom: '1px solid #F1F5F9'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = '#FFFBEB'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                      >
                        <Route size={14} color="#F59E0B" />
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0F172A' }}>
                            {language === 'ml' && r.name_ml ? r.name_ml : r.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#64748B' }}>
                            {r.type} • {r.lengthKm} km
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>

          {/* Ward Dropdown */}
          <div style={{ position: 'relative' }}>
            <select
              value={selectedWard}
              onChange={e => {
                const val = e.target.value;
                setSelectedWard(val);
                if (val) {
                  const w = WARDS.find(item => item.id === Number(val) || item.number === Number(val));
                  if (w) {
                    setMapCenter(w.coordinates);
                    setMapZoom(15);
                  }
                }
              }}
              style={{
                padding: '8px 28px 8px 12px',
                fontSize: '0.84rem',
                borderRadius: '10px',
                border: '1px solid var(--surface-200, #CBD5E1)',
                backgroundColor: 'var(--surface-50, #F8FAFC)',
                cursor: 'pointer',
                appearance: 'none',
                fontWeight: 500
              }}
            >
              <option value="">{language === 'ml' ? 'എല്ലാ വാർഡുകളും (28)' : 'All 28 Wards'}</option>
              {WARDS.map(w => (
                <option key={w.id} value={w.number}>
                  {w.number}. {language === 'ml' && w.name_ml ? w.name_ml : w.name}
                </option>
              ))}
            </select>
            <ChevronDown size={14} color="var(--text-muted, #64748B)" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          </div>

          {/* Near Me GPS Button & Radius Pills */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              onClick={handleNearMe}
              className={`btn btn-sm ${nearMeActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{ borderRadius: '10px', fontSize: '0.82rem', padding: '6px 12px' }}
            >
              <Navigation2 size={14} />
              <span>{nearMeActive ? (language === 'ml' ? 'അടുത്ത്' : 'Near Me') : t('nearMeBtn')}</span>
            </button>

            {nearMeActive && (
              <div style={{ display: 'inline-flex', backgroundColor: '#E0F2FE', padding: '2px', borderRadius: '8px' }}>
                {[1, 2, 5].map(r => (
                  <button
                    key={`radius-${r}`}
                    type="button"
                    onClick={() => setRadiusKm(r)}
                    style={{
                      padding: '2px 6px',
                      fontSize: '0.72rem',
                      fontWeight: radiusKm === r ? 800 : 500,
                      borderRadius: '6px',
                      border: 'none',
                      backgroundColor: radiusKm === r ? '#0284C7' : 'transparent',
                      color: radiusKm === r ? '#FFFFFF' : '#0369A1',
                      cursor: 'pointer'
                    }}
                  >
                    {r}km
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Verified Toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', cursor: 'pointer', userSelect: 'none', padding: '0 4px' }}>
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={e => setVerifiedOnly(e.target.checked)}
              style={{ accentColor: '#059669', width: '15px', height: '15px' }}
            />
            <span style={{ color: 'var(--text-muted, #64748B)' }}>{t('onlyVerified')}</span>
          </label>

          {/* Reset Filters */}
          {(selectedCategory !== 'all' || selectedWard || searchTerm || verifiedOnly || nearMeActive) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="btn btn-secondary btn-sm"
              style={{ borderRadius: '10px', padding: '6px 10px', fontSize: '0.78rem' }}
              title="Reset all filters"
            >
              <RotateCcw size={13} />
            </button>
          )}

          {/* Results Count Badge */}
          <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--primary-800, #064E3B)', backgroundColor: 'var(--primary-100, #D1FAE5)', padding: '4px 8px', borderRadius: '6px', marginLeft: 'auto' }}>
            {displayedFacilities.length} {language === 'ml' ? 'സ്ഥാപനങ്ങൾ' : 'Places'}
          </div>

        </div>

        {/* Floating Category Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '4px',
          pointerEvents: 'auto',
          scrollbarWidth: 'none'
        }}>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            style={{
              padding: '6px 12px',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              backgroundColor: selectedCategory === 'all' ? '#064E3B' : 'rgba(255, 255, 255, 0.92)',
              color: selectedCategory === 'all' ? '#FFFFFF' : 'var(--text-main, #0F172A)',
              border: '1px solid var(--border-light, #CBD5E1)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {t('allCategories')}
          </button>

          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  backgroundColor: isSelected ? cat.color : 'rgba(255, 255, 255, 0.92)',
                  color: isSelected ? '#FFFFFF' : 'var(--text-main, #0F172A)',
                  border: isSelected ? `1px solid ${cat.color}` : '1px solid var(--border-light, #CBD5E1)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: isSelected ? '#FFFFFF' : cat.color
                }}></span>
                <span>{language === 'ml' ? cat.name_ml : cat.name}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Main Interactive Leaflet Map */}
      <MapContainer
        center={MUNICIPALITY_INFO.centerCoordinates}
        zoom={13}
        minZoom={12}
        maxZoom={18}
        maxBounds={[
          [11.9200, 75.3100],
          [12.0450, 75.4500]
        ]}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false} // Custom controls used
      >
        <MapController center={mapCenter} zoom={mapZoom} />

        {/* Dynamic Basemap Tiles */}
        <TileLayer
          key={currentBasemap}
          attribution={BASEMAP_STYLES[currentBasemap]?.attribution || BASEMAP_STYLES.streets.attribution}
          url={BASEMAP_STYLES[currentBasemap]?.url || BASEMAP_STYLES.streets.url}
          maxZoom={BASEMAP_STYLES[currentBasemap]?.maxZoom || 19}
        />

        {/* 1. Official Municipality Boundary & External Mask */}
        <MunicipalityBoundary visible={activeLayers.boundary} maskOutside={activeLayers.maskOutside} />

        {/* 2. Natural Waterways & Mangroves (Valapattanam River & Vellikkeel Wetlands) */}
        <WaterwaysLayer
          visible={activeLayers.waterways}
          onSelectFeature={(feat) => {
            if (feat.polygon && feat.polygon.length > 0) {
              setMapCenter(feat.polygon[0]);
              setMapZoom(15);
            }
          }}
        />

        {/* 3. Ward Boundaries Layer (28 Wards) */}
        <WardLayer
          visible={activeLayers.wards}
          selectedWardId={selectedWard}
          onSelectWard={(ward) => {
            setSelectedWard(String(ward.number));
            setMapCenter(ward.coordinates);
            setMapZoom(15);
          }}
        />

        {/* 4. Major Arterial & Collector Roads GIS Layer */}
        <RoadLayer
          visible={activeLayers.roads}
          onSelectRoad={(road) => {
            if (road.coordinates && road.coordinates.length > 0) {
              setMapCenter(road.coordinates[Math.floor(road.coordinates.length / 2)]);
              setMapZoom(15);
            }
          }}
        />

        {/* 5. Municipal Projects Layer */}
        <ProjectsLayer
          visible={activeLayers.projects && (selectedCategory === 'all' || selectedCategory === 'government')}
          onSelectProject={(proj) => {
            if (proj.coordinates) {
              setMapCenter([proj.coordinates[0] + 0.0042, proj.coordinates[1]]);
              setMapZoom(16);
            }
          }}
        />

        {/* 6. Approved Business Directory Layer */}
        <BusinessLayer
          visible={activeLayers.businesses && (selectedCategory === 'all' || selectedCategory === 'commercial')}
        />

        {/* 7. Facility Markers with Clustering */}
        {activeLayers.facilities && (
          <MarkerClusterGroup
            key={`cluster-${selectedCategory}-${selectedWard}-${displayedFacilities.length}`}
            facilities={displayedFacilities}
            selectedFacility={selectedFacility}
            onSelectFacility={handleSelectFacility}
            onFindAround={handleFindAround}
          />
        )}

        {/* 8. User Geolocation Marker & Radius Circle */}
        {userLocation && (
          <>
            <Marker position={userLocation} icon={userLocationMarkerIcon}>
              <Popup>
                <div style={{ textAlign: 'center', padding: '4px' }}>
                  <strong>{language === 'ml' ? 'നിങ്ങളുടെ സ്ഥാനം' : 'Your Location'}</strong>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    Radius: {radiusKm} km
                  </div>
                </div>
              </Popup>
            </Marker>
            <Circle
              center={userLocation}
              radius={radiusKm * 1000}
              pathOptions={{
                color: '#0284C7',
                fillColor: '#38BDF8',
                fillOpacity: 0.12,
                weight: 1.5,
                dashArray: '4, 4'
              }}
            />
          </>
        )}

        {/* Map Interactive Controls */}
        <MapControls
          currentBasemap={currentBasemap}
          onChangeBasemap={setCurrentBasemap}
          activeLayers={activeLayers}
          onToggleLayer={handleToggleLayer}
          onLocateUser={handleNearMe}
          isLocating={nearMeActive}
        />

        {/* Metric Scale Bar */}
        <ScaleControl position="bottomleft" metric={true} imperial={false} />

        {/* Collapsible Map Legend */}
        <MapLegend />

        {/* Real-time Map HUD Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          right: '12px',
          zIndex: 800,
          backgroundColor: 'rgba(15, 23, 42, 0.88)',
          backdropFilter: 'blur(8px)',
          color: '#F8FAFC',
          padding: '4px 10px',
          borderRadius: '8px',
          fontSize: '0.72rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.1)',
          pointerEvents: 'none'
        }}>
          <span style={{ color: '#10B981' }}>● Anthoor GIS</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>11.986° N, 75.367° E</span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span>28 Wards • {facilities.length} Places</span>
        </div>

      </MapContainer>

      {/* "What's Around Here" Nearby List Card */}
      <WhatsAroundHere
        anchorFacility={aroundFacility}
        nearbyFacilities={aroundList}
        onSelectFacility={handleSelectFacility}
        onClose={() => setAroundFacility(null)}
      />

      {/* Slide-over Facility Details Drawer */}
      <FacilityDrawer
        facility={selectedFacility}
        onClose={() => setSelectedFacility(null)}
        onSelectFacility={handleSelectFacility}
      />

    </div>
  );
}
