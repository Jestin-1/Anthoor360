import L from 'leaflet';

// Available basemap tile styles
export const BASEMAP_STYLES = {
  streets: {
    id: 'streets',
    name: 'Standard Streets',
    name_ml: 'തെരുവ് മാപ്പ്',
    icon: 'Map',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  },
  positron: {
    id: 'positron',
    name: 'Clean Municipal Canvas',
    name_ml: 'ക്ലീൻ നഗരസഭാ മാപ്പ്',
    icon: 'Layers',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
    maxZoom: 20
  },
  satellite: {
    id: 'satellite',
    name: 'Satellite Aerial View',
    name_ml: 'ഉപഗ്രഹ ചിത്രം',
    icon: 'Globe',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri, Maxar, Earthstar Geographics, CNES/Airbus DS',
    maxZoom: 18
  },
  terrain: {
    id: 'terrain',
    name: 'Topographic Terrain',
    name_ml: 'ഭൂപ്രകൃതി മാപ്പ്',
    icon: 'Mountain',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenTopoMap &copy; OpenStreetMap contributors',
    maxZoom: 17
  }
};

// Category color palettes and metadata
export const CATEGORY_CONFIG = {
  hospital: {
    label: 'Hospital',
    label_ml: 'ആശുപത്രി',
    iconName: 'Hospital',
    color: '#DC2626', // Red
    bgLight: '#FEE2E2',
    borderColor: '#B91C1C',
    svgIcon: '<path d="M12 6v12m-6-6h12" stroke="currentColor" stroke-width="2.8" stroke-linecap="round"/><rect width="18" height="18" x="3" y="3" rx="2" stroke="currentColor" stroke-width="2"/>'
  },
  healthcare: {
    label: 'Healthcare & Clinics',
    label_ml: 'ആരോഗ്യ കേന്ദ്രങ്ങൾ',
    iconName: 'HeartPulse',
    color: '#E11D48', // Rose
    bgLight: '#FFE4E6',
    borderColor: '#BE123C',
    svgIcon: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" stroke-width="2"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h4.27" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
  },
  pharmacy: {
    label: 'Pharmacy',
    label_ml: 'ഫാർമസി / മെഡിക്കൽസ്',
    iconName: 'Pill',
    color: '#9333EA', // Purple
    bgLight: '#F3E8FF',
    borderColor: '#7E22CE',
    svgIcon: '<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" stroke="currentColor" stroke-width="2"/><path d="m8.5 8.5 7 7" stroke="currentColor" stroke-width="2"/>'
  },
  education: {
    label: 'Education & Colleges',
    label_ml: 'വിദ്യാഭ്യാസം',
    iconName: 'GraduationCap',
    color: '#2563EB', // Blue
    bgLight: '#DBEAFE',
    borderColor: '#1D4ED8',
    svgIcon: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" stroke="currentColor" stroke-width="2"/><path d="M22 10v6" stroke="currentColor" stroke-width="2"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" stroke="currentColor" stroke-width="2"/>'
  },
  school: {
    label: 'School',
    label_ml: 'സ്കൂൾ',
    iconName: 'School',
    color: '#0284C7', // Sky
    bgLight: '#E0F2FE',
    borderColor: '#0369A1',
    svgIcon: '<path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" stroke="currentColor" stroke-width="2"/><path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" stroke="currentColor" stroke-width="2"/><path d="M18 5v17" stroke="currentColor" stroke-width="2"/><path d="m4 6 8-4 8 4" stroke="currentColor" stroke-width="2"/><path d="M6 5v17" stroke="currentColor" stroke-width="2"/>'
  },
  government: {
    label: 'Government Office',
    label_ml: 'സർക്കാർ കാര്യാലയം',
    iconName: 'Landmark',
    color: '#059669', // Emerald
    bgLight: '#D1FAE5',
    borderColor: '#047857',
    svgIcon: '<line x1="3" x2="21" y1="22" y2="22" stroke="currentColor" stroke-width="2"/><line x1="6" x2="6" y1="18" y2="11" stroke="currentColor" stroke-width="2"/><line x1="10" x2="10" y1="18" y2="11" stroke="currentColor" stroke-width="2"/><line x1="14" x2="14" y1="18" y2="11" stroke="currentColor" stroke-width="2"/><line x1="18" x2="18" y1="18" y2="11" stroke="currentColor" stroke-width="2"/><polygon points="12 2 20 7 4 7" stroke="currentColor" stroke-width="2"/>'
  },
  municipality: {
    label: 'Municipal Office',
    label_ml: 'നഗരസഭാ കാര്യാലയം',
    iconName: 'ShieldCheck',
    color: '#064E3B', // Dark Emerald
    bgLight: '#ECFDF5',
    borderColor: '#022C22',
    svgIcon: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" stroke="currentColor" stroke-width="2"/><path d="m9 12 2 2 4-4" stroke="currentColor" stroke-width="2"/>'
  },
  bank: {
    label: 'Bank & ATM',
    label_ml: 'ബാങ്ക് / എ.ടി.എം',
    iconName: 'CreditCard',
    color: '#0D9488', // Teal
    bgLight: '#CCFBF1',
    borderColor: '#0F766E',
    svgIcon: '<rect width="20" height="14" x="2" y="5" rx="2" stroke="currentColor" stroke-width="2"/><line x1="2" x2="22" y1="10" y2="10" stroke="currentColor" stroke-width="2"/>'
  },
  transport: {
    label: 'Transport & Bus Stand',
    label_ml: 'ഗതാഗതം & ബസ് സ്റ്റാൻഡ്',
    iconName: 'Bus',
    color: '#EA580C', // Orange
    bgLight: '#FFEDD5',
    borderColor: '#C2410C',
    svgIcon: '<path d="M8 6v6" stroke="currentColor" stroke-width="2"/><path d="M16 6v6" stroke="currentColor" stroke-width="2"/><path d="M4 18v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-3" stroke="currentColor" stroke-width="2"/><path d="M17 18v3a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-3" stroke="currentColor" stroke-width="2"/><rect width="16" height="16" x="4" y="2" rx="2" stroke="currentColor" stroke-width="2"/><path d="M4 12h16" stroke="currentColor" stroke-width="2"/>'
  },
  petrol: {
    label: 'Fuel & EV Station',
    label_ml: 'പെട്രോൾ പമ്പ് & ഇ.വി ചാർജിംഗ്',
    iconName: 'Fuel',
    color: '#D97706', // Amber
    bgLight: '#FEF3C7',
    borderColor: '#B45309',
    svgIcon: '<line x1="3" x2="15" y1="22" y2="22" stroke="currentColor" stroke-width="2"/><line x1="4" x2="14" y1="9" y2="9" stroke="currentColor" stroke-width="2"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18" stroke="currentColor" stroke-width="2"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5" stroke="currentColor" stroke-width="2"/>'
  },
  tourism: {
    label: 'Tourism & Heritage',
    label_ml: 'വിനോദസഞ്ചാരം',
    iconName: 'Compass',
    color: '#7C3AED', // Purple Violet
    bgLight: '#EDE9FE',
    borderColor: '#6D28D9',
    svgIcon: '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor"/>'
  },
  commercial: {
    label: 'Commercial & Shops',
    label_ml: 'വ്യാപാരം',
    iconName: 'Store',
    color: '#0891B2', // Cyan
    bgLight: '#CFFAFE',
    borderColor: '#0E7490',
    svgIcon: '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" stroke="currentColor" stroke-width="2"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="currentColor" stroke-width="2"/><path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" stroke="currentColor" stroke-width="2"/><path d="M2 7h20" stroke="currentColor" stroke-width="2"/>'
  },
  public: {
    label: 'Public Amenities',
    label_ml: 'പൊതു സൗകര്യങ്ങൾ',
    iconName: 'Building2',
    color: '#4B5563', // Slate
    bgLight: '#F3F4F6',
    borderColor: '#374151',
    svgIcon: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" stroke="currentColor" stroke-width="2"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" stroke="currentColor" stroke-width="2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" stroke="currentColor" stroke-width="2"/><path d="M10 6h4" stroke="currentColor" stroke-width="2"/><path d="M10 10h4" stroke="currentColor" stroke-width="2"/><path d="M10 14h4" stroke="currentColor" stroke-width="2"/><path d="M10 18h4" stroke="currentColor" stroke-width="2"/>'
  },
  sports: {
    label: 'Sports & Stadiums',
    label_ml: 'കായികം & സ്റ്റേഡിയം',
    iconName: 'Trophy',
    color: '#10B981', // Mint
    bgLight: '#D1FAE5',
    borderColor: '#059669',
    svgIcon: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" stroke="currentColor" stroke-width="2"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" stroke="currentColor" stroke-width="2"/><path d="M4 22h16" stroke="currentColor" stroke-width="2"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" stroke="currentColor" stroke-width="2"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" stroke="currentColor" stroke-width="2"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" stroke="currentColor" stroke-width="2"/>'
  },
  park: {
    label: 'Parks & Nature',
    label_ml: 'പാർക്കുകൾ',
    iconName: 'Trees',
    color: '#16A34A', // Green
    bgLight: '#DCFCE7',
    borderColor: '#15803D',
    svgIcon: '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" stroke="currentColor" stroke-width="2"/><path d="M7 16v6" stroke="currentColor" stroke-width="2"/><path d="M13 19v3" stroke="currentColor" stroke-width="2"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-4 4.3a1 1 0 0 0 .8 1.7H10l-3 3.3a1 1 0 0 0 .7 1.7H8l-3 3.3a1 1 0 0 0 .7 1.7Z" stroke="currentColor" stroke-width="2"/>'
  },
  project: {
    label: 'Municipal Projects',
    label_ml: 'വികസന പദ്ധതികൾ',
    iconName: 'Construction',
    color: '#F97316', // Orange
    bgLight: '#FFEDD5',
    borderColor: '#EA580C',
    svgIcon: '<rect x="2" y="6" width="20" height="8" rx="1" stroke="currentColor" stroke-width="2"/><path d="M17 14v7" stroke="currentColor" stroke-width="2"/><path d="M7 14v7" stroke="currentColor" stroke-width="2"/><path d="M17 3v3" stroke="currentColor" stroke-width="2"/><path d="M7 3v3" stroke="currentColor" stroke-width="2"/><path d="M10 14 2.3 6.3" stroke="currentColor" stroke-width="2"/><path d="m14 6 7.7 7.7" stroke="currentColor" stroke-width="2"/><path d="m8 6 8 8" stroke="currentColor" stroke-width="2"/>'
  },
  emergency: {
    label: 'Emergency & Fire',
    label_ml: 'അടിയന്തര രക്ഷാസേവനം',
    iconName: 'ShieldAlert',
    color: '#BE123C', // Crimson
    bgLight: '#FFE4E6',
    borderColor: '#9F1239',
    svgIcon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" stroke="currentColor" stroke-width="2"/><line x1="12" x2="12" y1="8" y2="12" stroke="currentColor" stroke-width="2"/><line x1="12" x2="12.01" y1="16" y2="16" stroke="currentColor" stroke-width="2"/>'
  }
};

// Fallback category mapping for variants (e.g. 'education' maps to education, 'hospital' to hospital, 'govt' to government)
export function getCategoryMeta(cat) {
  if (!cat) return CATEGORY_CONFIG.public;
  const normalized = String(cat).toLowerCase().trim();
  
  if (normalized.includes('hosp') || normalized.includes('medical college')) return CATEGORY_CONFIG.hospital;
  if (normalized.includes('health') || normalized.includes('clinic') || normalized.includes('phc') || normalized.includes('chc')) return CATEGORY_CONFIG.healthcare;
  if (normalized.includes('pharm')) return CATEGORY_CONFIG.pharmacy;
  if (normalized.includes('school')) return CATEGORY_CONFIG.school;
  if (normalized.includes('college') || normalized.includes('univ') || normalized.includes('nift') || normalized.includes('gcek') || normalized.includes('educat')) return CATEGORY_CONFIG.education;
  if (normalized.includes('muncip') || normalized.includes('municip')) return CATEGORY_CONFIG.municipality;
  if (normalized.includes('gov') || normalized.includes('office') || normalized.includes('akshaya') || normalized.includes('kseb')) return CATEGORY_CONFIG.government;
  if (normalized.includes('bank') || normalized.includes('atm') || normalized.includes('sbi')) return CATEGORY_CONFIG.bank;
  if (normalized.includes('petrol') || normalized.includes('fuel') || normalized.includes('ev ')) return CATEGORY_CONFIG.petrol;
  if (normalized.includes('bus') || normalized.includes('transport') || normalized.includes('stand') || normalized.includes('ksrtc')) return CATEGORY_CONFIG.transport;
  if (normalized.includes('tour') || normalized.includes('temple') || normalized.includes('muthappan') || normalized.includes('snake') || normalized.includes('vismaya') || normalized.includes('park') || normalized.includes('monument')) return CATEGORY_CONFIG.tourism;
  if (normalized.includes('sport') || normalized.includes('stadium') || normalized.includes('turf')) return CATEGORY_CONFIG.sports;
  if (normalized.includes('fire') || normalized.includes('police') || normalized.includes('emerg')) return CATEGORY_CONFIG.emergency;
  if (normalized.includes('proj')) return CATEGORY_CONFIG.project;
  if (normalized.includes('comm') || normalized.includes('shop') || normalized.includes('bak') || normalized.includes('market') || normalized.includes('kinfra')) return CATEGORY_CONFIG.commercial;

  return CATEGORY_CONFIG[normalized] || CATEGORY_CONFIG.public;
}

// Specific facility emoji mapper for accurate, unmistakable map recognition
export function getFacilityEmoji(facilityOrCategory) {
  if (!facilityOrCategory) return '📍';
  
  const name = typeof facilityOrCategory === 'object' ? (facilityOrCategory.name || '').toLowerCase() : '';
  const cat = typeof facilityOrCategory === 'object' ? (facilityOrCategory.category || '') : String(facilityOrCategory);
  const normalizedCat = String(cat).toLowerCase().trim();

  // 1. Precise landmark matches by facility name
  if (name.includes('snake park') || name.includes('zoo')) return '🐍';
  if (name.includes('muthappan') || name.includes('temple') || name.includes('madappura')) return '🛕';
  if (name.includes('vismaya')) return '🎢';
  if (name.includes('vellikkeel') || name.includes('mangrove')) return '🌳';
  if (name.includes('morazha peasant') || name.includes('uprising') || name.includes('monument')) return '🚩';
  if (name.includes('ayurveda')) return '🌿';
  if (name.includes('stadium') || name.includes('sports')) return '⚽';
  if (name.includes('fire')) return '🚒';
  if (name.includes('police')) return '👮';
  if (name.includes('kseb') || name.includes('electrical')) return '⚡';
  if (name.includes('akshaya') || name.includes('janasevana')) return '💻';
  if (name.includes('kinfra') || name.includes('textile')) return '🏭';
  if (name.includes('petrol') || name.includes('fuel')) return '⛽';
  if (name.includes('bus stand') || name.includes('terminal')) return '🚌';
  if (name.includes('bank') || name.includes('sbi') || name.includes('atm')) return '🏦';
  if (name.includes('baker') || name.includes('coffee') || name.includes('restaurant')) return '☕';
  if (name.includes('pharmacy') || name.includes('medicals')) return '💊';
  if (name.includes('auto care') || name.includes('workshop')) return '🔧';
  if (name.includes('print') || name.includes('photostat') || name.includes('cad')) return '🖨️';
  if (name.includes('chc') || name.includes('hospital')) return '🏥';
  if (name.includes('phc') || name.includes('health centre')) return '🩺';
  if (name.includes('college') || name.includes('nift') || name.includes('university') || name.includes('gcek')) return '🎓';
  if (name.includes('municipal office') || name.includes('headquarters')) return '🏛️';

  // 2. Category fallback mapping
  if (normalizedCat.includes('hosp')) return '🏥';
  if (normalizedCat.includes('health') || normalizedCat.includes('clinic')) return '🩺';
  if (normalizedCat.includes('pharm')) return '💊';
  if (normalizedCat.includes('school')) return '🏫';
  if (normalizedCat.includes('educat') || normalizedCat.includes('college')) return '🎓';
  if (normalizedCat.includes('tour') || normalizedCat.includes('temple')) return '🛕';
  if (normalizedCat.includes('muncip') || normalizedCat.includes('gov')) return '🏛️';
  if (normalizedCat.includes('bank')) return '🏦';
  if (normalizedCat.includes('petrol') || normalizedCat.includes('fuel')) return '⛽';
  if (normalizedCat.includes('trans') || normalizedCat.includes('bus')) return '🚌';
  if (normalizedCat.includes('comm') || normalizedCat.includes('shop')) return '🏪';
  if (normalizedCat.includes('sport') || normalizedCat.includes('stadium')) return '⚽';
  if (normalizedCat.includes('park') || normalizedCat.includes('nature')) return '🌳';
  if (normalizedCat.includes('proj')) return '🏗️';
  if (normalizedCat.includes('emerg') || normalizedCat.includes('fire')) return '🚨';

  return '📍';
}

/**
 * Creates high-performance Leaflet DivIcon for individual category markers with emoji styling
 */
export function createCategoryMarkerIcon(facilityOrCategory, { isSelected = false, label = null } = {}) {
  const cat = typeof facilityOrCategory === 'object' ? facilityOrCategory.category : facilityOrCategory;
  const meta = getCategoryMeta(cat);
  const emoji = getFacilityEmoji(facilityOrCategory);
  const size = isSelected ? 44 : 36;
  const pinColor = meta.color;
  
  // Custom glowing Emoji Leaflet Pin
  const html = `
    <div class="custom-category-pin ${isSelected ? 'is-selected' : ''}" style="
      position: relative;
      width: ${size}px;
      height: ${size}px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    ">
      ${isSelected ? `
        <div style="
          position: absolute;
          inset: -7px;
          border-radius: 50%;
          background: ${pinColor};
          opacity: 0.3;
          animation: pulse-ring 2s infinite;
        "></div>
      ` : ''}

      <div style="
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, ${pinColor}, ${meta.borderColor || pinColor});
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: ${isSelected ? '3px' : '2.5px'} solid #FFFFFF;
        box-shadow: 0 4px 14px rgba(0, 0, 0, ${isSelected ? '0.45' : '0.28'});
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <span style="
          transform: rotate(45deg);
          font-size: ${isSelected ? '20px' : '17px'};
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          filter: drop-shadow(0 1px 2px rgba(0,0,0,0.35));
        ">
          ${emoji}
        </span>
      </div>

      ${label ? `
        <div style="
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          white-space: nowrap;
          background: rgba(15, 23, 42, 0.9);
          color: white;
          font-size: 10px;
          font-weight: 700;
          padding: 1px 6px;
          border-radius: 4px;
          pointer-events: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        ">
          ${label}
        </div>
      ` : ''}
    </div>
  `;

  return L.divIcon({
    html,
    className: 'category-div-icon',
    iconSize: [size, size],
    iconAnchor: [size / 2, size]
  });
}

/**
 * Creates high-performance Leaflet DivIcon for clustered markers
 */
export function createClusterMarkerIcon(count) {
  let size = 36;
  let bgGradient = 'linear-gradient(135deg, #059669, #047857)'; // 2 - 9 items
  
  if (count >= 10 && count < 25) {
    size = 42;
    bgGradient = 'linear-gradient(135deg, #0D9488, #0F766E)';
  } else if (count >= 25) {
    size = 48;
    bgGradient = 'linear-gradient(135deg, #2563EB, #1D4ED8)';
  }

  const html = `
    <div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${bgGradient};
      border: 3px solid #FFFFFF;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.28);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFFFFF;
      font-size: ${size > 40 ? '14px' : '12px'};
      font-weight: 800;
      letter-spacing: -0.02em;
      cursor: pointer;
      position: relative;
      transition: transform 0.15s ease;
    ">
      <div style="
        position: absolute;
        inset: -4px;
        border-radius: 50%;
        background: inherit;
        opacity: 0.2;
      "></div>
      <span>${count}</span>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'cluster-div-icon',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2]
  });
}

// User location marker
export const userLocationMarkerIcon = L.divIcon({
  html: `
    <div style="
      position: relative;
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #0284C7;
        opacity: 0.4;
        animation: pulse-ring 2s infinite;
      "></div>
      <div style="
        width: 16px;
        height: 16px;
        background: #0284C7;
        border: 3px solid #FFFFFF;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
      "></div>
    </div>
  `,
  className: 'user-pin-icon',
  iconSize: [22, 22],
  iconAnchor: [11, 11]
});
