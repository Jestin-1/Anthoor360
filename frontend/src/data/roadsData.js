// Anthoor Municipality Major Roads and Transportation Corridors GIS Data

export const ANTHOOR_ROADS = [
  {
    id: "road-1",
    name: "National Highway 66 (Dharmasala 6-Lane Corridor)",
    name_ml: "ദേശീയപാത 66 (ധർമ്മശാല ആറുവരിപ്പാത)",
    type: "National Highway",
    type_ml: "ദേശീയപാത",
    color: "#F59E0B", // Amber Gold
    weight: 5,
    dashArray: null,
    lengthKm: 6.8,
    wards: "Wards 7, 8, 17, 28",
    description: "Primary arterial corridor connecting Kannur to Taliparamba and Mangalore via Dharmasala junction.",
    coordinates: [
      [11.9520, 75.3810],
      [11.9610, 75.3830],
      [11.9680, 75.3850],
      [11.9730, 75.3850], // Dharmasala Junction
      [11.9790, 75.3830],
      [11.9840, 75.3780], // Bakkalam
      [11.9920, 75.3700],
      [11.9990, 75.3620]
    ]
  },
  {
    id: "road-2",
    name: "Dharmasala - Parassinikkadavu Temple Pilgrimage Road",
    name_ml: "ധർമ്മശാല - പറശ്ശിനിക്കടവ് ക്ഷേത്ര തീർത്ഥാടന പാത",
    type: "Major Tourism Arterial",
    type_ml: "പ്രധാന ടൂറിസം റോഡ്",
    color: "#7C3AED", // Purple
    weight: 4,
    dashArray: null,
    lengthKm: 4.2,
    wards: "Wards 7, 9, 10, 11",
    description: "Famous pilgrimage route leading to Sree Muthappan Madappura, Snake Park, and Vismaya Park along Valapattanam River.",
    coordinates: [
      [11.9730, 75.3850], // Dharmasala Junction
      [11.9710, 75.3890],
      [11.9680, 75.3940],
      [11.9655, 75.3980], // Vismaya Junction
      [11.9635, 75.4010], // Snake Park
      [11.9610, 75.4045],
      [11.9592, 75.4072]  // Parassinikkadavu Temple Gate
    ]
  },
  {
    id: "road-3",
    name: "Dharmasala - Morazha - Vellikkeel Eco Park Road",
    name_ml: "ധർമ്മശാല - മൊറാഴ - വെള്ളിക്കീൽ ഇക്കോ പാർക്ക് റോഡ്",
    type: "Major Municipal Road",
    type_ml: "നഗരസഭാ പ്രധാന റോഡ്",
    color: "#059669", // Emerald Green
    weight: 3.5,
    dashArray: null,
    lengthKm: 5.4,
    wards: "Wards 1, 2, 3, 4, 6, 7",
    description: "Historic corridor connecting Dharmasala to the 1940 Morazha Peasant Monument and Vellikkeel Mangrove Eco Park.",
    coordinates: [
      [11.9730, 75.3850], // Dharmasala
      [11.9780, 75.3770], // Anthoor North
      [11.9820, 75.3710],
      [11.9860, 75.3620], // Morazha Peasant Memorial
      [11.9910, 75.3610],
      [11.9950, 75.3600], // Kanool
      [12.0010, 75.3520]  // Vellikkeel Mangrove Boardwalk
    ]
  },
  {
    id: "road-4",
    name: "Mangattuparamba Institutional Boulevard (GCEK - NIFT - University)",
    name_ml: "മാങ്ങാട്ടുപറമ്പ് വിദ്യാഭ്യാസ ബൊളിവാർഡ് (എൻജിനീയറിങ് - നിഫ്റ്റ് - സർവ്വകലാശാല)",
    type: "Educational Boulevard",
    type_ml: "വിദ്യാഭ്യാസ ഇടനാഴി",
    color: "#2563EB", // Blue
    weight: 3.5,
    dashArray: null,
    lengthKm: 2.8,
    wards: "Wards 20, 21, 22",
    description: "Access highway linking Government Engineering College Kannur, NIFT Kannur campus, and Kannur University.",
    coordinates: [
      [11.9750, 75.3840],
      [11.9745, 75.3860], // GCEK Gate
      [11.9710, 75.3880],
      [11.9680, 75.3895], // NIFT Campus
      [11.9650, 75.3880]  // Kannur University Campus
    ]
  },
  {
    id: "road-5",
    name: "Kalliasseri - Aroli Riverbank Link Road",
    name_ml: "കല്യാശ്ശേരി - ആരോളി റിവർഫ്രണ്ട് ലിങ്ക് റോഡ്",
    type: "Riverbank Collector Road",
    type_ml: "തീരദേശ റോഡ്",
    color: "#0891B2", // Cyan
    weight: 3,
    dashArray: "5, 5",
    lengthKm: 3.9,
    wards: "Wards 12, 13, 23, 24",
    description: "Scenic southern boundary link traversing lush coconut groves alongside Valapattanam river.",
    coordinates: [
      [11.9510, 75.3680], // Aroli Central
      [11.9540, 75.3720], // Aroli East
      [11.9560, 75.3800], // Kalliasseri Boundary
      [11.9580, 75.3920],
      [11.9560, 75.4020]  // Riverfront Gate
    ]
  },
  {
    id: "road-6",
    name: "Kinfra Industrial Park Access Corridor",
    name_ml: "കിൻഫ്ര ഇൻഡസ്ട്രിയൽ പാർക്ക് അപ്രോച്ച് റോഡ്",
    type: "Industrial Access Road",
    type_ml: "വ്യവസായ ലിങ്ക് റോഡ്",
    color: "#64748B", // Slate
    weight: 3,
    dashArray: null,
    lengthKm: 2.1,
    wards: "Wards 18, 19",
    description: "Heavy logistics access route connecting NH 66 Bakkalam to the KINFRA Apparel & Industrial complex.",
    coordinates: [
      [11.9820, 75.3780], // Bakkalam on NH 66
      [11.9820, 75.3850], // Kadambur Link
      [11.9820, 75.3910]  // Kinfra Gate
    ]
  }
];
