// API client service with dual-mode (Django REST Backend + Local Mock Fallback)
import { FACILITIES, WARDS, CITIZEN_SERVICES, MUNICIPAL_PROJECTS, DIRECTORY_ENTRIES } from '../data/anthoorData';

const BASE_URL = 'http://127.0.0.1:8000/api/v1';

// Calculate distance using Haversine formula in kilometers
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

export const api = {
  // Facilities (Full Details)
  async getFacilities(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
        params.append('categories', filters.categories.join(','));
      } else if (filters.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters.ward) params.append('ward', filters.ward);
      if (filters.search) params.append('search', filters.search);
      if (filters.verifiedOnly) params.append('verified', 'true');
      if (filters.bbox) params.append('bbox', filters.bbox);
      
      const res = await fetch(`${BASE_URL}/facilities/?${params.toString()}`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        const list = data.results || data;
        return list.map(item => {
          const localMatch = FACILITIES.find(f => f.id === item.id || f.name === item.name);
          return {
            ...item,
            image: item.image || (localMatch ? localMatch.image : null),
            coordinates: item.coordinates || [item.latitude, item.longitude],
            wardId: item.ward ? (item.ward.id || item.ward.number) : item.wardId,
            wardName: item.ward ? item.ward.name : item.wardName,
            category: typeof item.category === 'object' ? item.category.slug : item.category
          };
        });
      }
    } catch {
      // Backend not running, use local data
    }

    // Fallback: local filtering
    let results = [...FACILITIES];
    if (filters.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
      results = results.filter(f => filters.categories.includes(f.category));
    } else if (filters.category && filters.category !== 'all') {
      results = results.filter(f => f.category === filters.category);
    }
    if (filters.ward) {
      results = results.filter(f => f.wardId === Number(filters.ward));
    }
    if (filters.verifiedOnly) {
      results = results.filter(f => f.verified);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(f => 
        f.name.toLowerCase().includes(q) ||
        (f.name_ml && f.name_ml.toLowerCase().includes(q)) ||
        f.description.toLowerCase().includes(q) ||
        f.address.toLowerCase().includes(q)
      );
    }
    if (filters.userLat && filters.userLng) {
      results = results.map(f => ({
        ...f,
        distanceKm: calculateDistance(filters.userLat, filters.userLng, f.coordinates[0], f.coordinates[1])
      })).sort((a, b) => a.distanceKm - b.distanceKm);

      if (filters.radiusKm) {
        results = results.filter(f => f.distanceKm <= filters.radiusKm);
      }
    }
    return results;
  },

  // Lightweight map endpoint for high-speed GIS rendering
  async getMapData(filters = {}) {
    try {
      const params = new URLSearchParams();
      if (filters.categories && Array.isArray(filters.categories) && filters.categories.length > 0) {
        params.append('categories', filters.categories.join(','));
      } else if (filters.category && filters.category !== 'all') {
        params.append('category', filters.category);
      }
      if (filters.ward) params.append('ward', filters.ward);
      if (filters.search) params.append('search', filters.search);
      if (filters.verifiedOnly) params.append('verified', 'true');
      if (filters.bbox) params.append('bbox', filters.bbox);

      const res = await fetch(`${BASE_URL}/facilities/map-data/?${params.toString()}`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        return (data.results || data).map(item => {
          const localMatch = FACILITIES.find(f => f.id === item.id || f.name === item.name);
          return {
            ...item,
            image: item.image || (localMatch ? localMatch.image : null),
            coordinates: item.coordinates || [item.latitude, item.longitude],
            wardId: item.ward_id || item.ward_number,
            wardName: item.ward_name,
            category: item.category
          };
        });
      }
    } catch {}

    // Fallback: local data mapped
    return this.getFacilities(filters);
  },

  // Get Nearby Facilities around a specific facility or point
  async getNearbyFacilities(lat, lng, limit = 5, excludeId = null) {
    try {
      const res = await fetch(`${BASE_URL}/facilities/near-location/?lat=${lat}&lng=${lng}&limit=${limit}`, { signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        return (data.results || data)
          .filter(f => f.id !== excludeId)
          .map(f => ({
            ...f,
            coordinates: [f.latitude, f.longitude],
            distanceKm: f.distance_km || calculateDistance(lat, lng, f.latitude, f.longitude)
          }));
      }
    } catch {}

    const all = [...FACILITIES];
    return all
      .filter(f => f.id !== excludeId)
      .map(f => ({
        ...f,
        distanceKm: calculateDistance(lat, lng, f.coordinates[0], f.coordinates[1])
      }))
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, limit);
  },

  // Wards
  async getWards() {
    try {
      const res = await fetch(`${BASE_URL}/wards/`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch {}
    return WARDS;
  },

  // Services
  async getCitizenServices() {
    try {
      const res = await fetch(`${BASE_URL}/services/`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch {}
    return CITIZEN_SERVICES;
  },

  // Projects
  async getProjects() {
    try {
      const res = await fetch(`${BASE_URL}/projects/`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const data = await res.json();
        return (data.results || data).map(p => ({
          ...p,
          coordinates: (p.latitude && p.longitude) ? [p.latitude, p.longitude] : p.coordinates
        }));
      }
    } catch {}
    return MUNICIPAL_PROJECTS;
  },

  // Directory
  async getDirectory() {
    try {
      const res = await fetch(`${BASE_URL}/directory/`, { signal: AbortSignal.timeout(1500) });
      if (res.ok) return await res.json();
    } catch {}
    return DIRECTORY_ENTRIES;
  },

  // Submit Business
  async submitBusiness(data) {
    try {
      const res = await fetch(`${BASE_URL}/directory/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch {}
    return { success: true, message: "Business submission received! Status: Pending Municipal Verification." };
  },

  // Submit Civic Issue
  async submitIssue(data) {
    try {
      const res = await fetch(`${BASE_URL}/issues/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch {}
    const trackingCode = `ANT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      success: true,
      trackingCode,
      message: `Issue reported successfully! Tracking token: ${trackingCode}. Under review by Municipal Health & Works section.`
    };
  }
};
