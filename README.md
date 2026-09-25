# ANTHOOR 360 | ആന്തൂർ 360

## Digital Civic, GIS & Information Platform for Anthoor Municipality, Kannur, Kerala

![Anthoor 360 Hero](frontend/public/assets/anthoor_hero.jpg)

**Anthoor 360** is a modern, unified digital civic and geographic information system (GIS) platform built specifically for **Anthoor Municipality** in Kannur District, Kerala, India.

---

## 🌟 Key Features

### 1. Interactive GIS Map Explorer (`/map`)
- **Interactive OpenStreetMap + Leaflet integration** centered at Anthoor (`11.9865° N, 75.3780° E`).
- **Ward boundary polygon overlays** and 28 electoral ward containment.
- **Dynamic Category Pins**: Education, Healthcare, Government, Transport & Fuel, Tourism, Commercial, and Public Infrastructure.
- **"Near Me" GPS Radar**: Live browser geolocation with radius filtering.
- **"What's Around Here?"**: Automatic Haversine proximity calculations between facilities.
- **Slide-over Facility Drawer**: Opening hours, contact dialer, email, wheelchair accessibility, and direct Google Maps navigation.

### 2. Comprehensive Citizen Services Guide (`/services`)
- Step-by-step guides for essential municipal services:
  - Birth & Death Certificate Registration (Sevana)
  - Property & Building Tax (Sanchaya e-Payment)
  - Building Permits (Sanketham)
  - Commercial Trade License (K-SWIFT / e-Nagaraseva)
  - Social Security Welfare Pensions (Sevana Pension)
  - Civic Grievance Redressal (ILGMS)
  - Haritha Karma Sena Waste Management
- Document checklists, processing timelines, and direct outbound links to official Kerala LSGD portals.

### 3. Tourism & Cultural Heritage Portal (`/tourism`)
- Highlighting Anthoor's destinations:
  - **Parassinikkadavu Sree Muthappan Madappura**: Sacred riverside shrine with daily Theyyam.
  - **Parassinikkadavu Snake Park & Zoo**: Reptile conservation & venom research center.
  - **Vellikkeel Eco Tourism Park**: Mangrove boardwalk walkway & boating.
  - **Vismaya Water Theme Park**: Family amusement & eco park.
  - **Historic Morazha Peasant Monument**: 1940 freedom movement heritage.

### 4. Electoral Wards Directory (`/wards`)
- All 28 municipal wards (Morazha, Dharmasala, Mangattuparamba, Parassinikkadavu, Vellikkeel, etc.).
- Elected councillors, population counts, contact numbers, and direct map link.

### 5. Development Projects Transparency Tracker (`/projects`)
- Public tracking of civic works (Dharmasala Smart Bus Interchange, Valapattanam Mangrove Eco-Walkway, Jal Jeevan Mission pipeline network, Solar street lighting).
- Real-time progress bars, budget allocation, contractor details, and target dates.

### 6. 24x7 Emergency Hub (`/emergency`)
- Instant one-tap direct calling for Fire & Rescue, Police Control, Anthoor CHC Hospital, KSEB Electricity Fault Desk, and Snake Bite Anti-Venom Squad.

### 7. Verified Local Business Directory (`/directory`)
- Verified local enterprise directory with "+ Register Your Business" workflow (Pending -> Admin Review -> Verified).

### 8. Civic Issue Reporting (`/report-issue`)
- Citizen grievance submission (potholes, streetlights, garbage, drainage) with official tracking token generation (e.g., `ANT-2026-XXXXXX`).

### 9. Anthoor 360 AI Civic Assistant (`Floating Widget`)
- Conversational assistant answering queries in **English** and **Malayalam (മലയാളം)** with speech-to-text voice recognition!

### 10. Complete Bilingual Support
- Seamless one-click switch between **English** and **മലയാളം** with authentic typography.

---

## 🏗️ Architecture & Technology Stack

```
anthoor360/
├── ANTHOOR_360_PROJECT_SPECIFICATION.md  # Detailed project specification
├── frontend/                             # React + Vite Frontend
│   ├── src/
│   │   ├── components/                   # Navbar, Footer, MapView, FacilityDrawer, QuickSearch, AIAssistant
│   │   ├── pages/                        # Home, Map, About, Tourism, Services, Wards, Projects, Emergency...
│   │   ├── context/                      # LanguageContext (English & Malayalam)
│   │   ├── data/                         # anthoorData.js (Master verified GIS dataset)
│   │   └── services/                     # api.js (Dual mode: Django API + local fallback)
│   └── package.json
└── backend/                              # Django + DRF Backend
    ├── config/                           # settings.py, urls.py, wsgi.py
    ├── locations/                        # Wards & Boundaries
    ├── facilities/                       # Facility models, categories, spatial queries
    ├── projects/                         # Municipal development projects
    ├── content/                          # Citizen services & announcements
    ├── directory/                        # Local business directory
    ├── issues/                           # Civic issues reporting
    ├── seed_data.py                      # Database seeder script
    ├── requirements.txt
    └── manage.py
```

---

## 🚀 Getting Started

### 1. Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 2. Running the Backend
```bash
cd backend
python manage.py migrate
python seed_data.py
python manage.py runserver 127.0.0.1:8000
```
Backend API will be accessible at **[http://127.0.0.1:8000/api/v1/](http://127.0.0.1:8000/api/v1/)**.

---

## 🏛️ Municipal Administration
- **Headquarters**: Dharmasala, Anthoor Municipality, Kannur - 670567
- **Helpline**: 0497 2780005 | 2780006
- **Email**: anthoormunicipality@gmail.com
