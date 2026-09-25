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
      [11.9540, 75.3600], // Pappinisseri / Aroli entry
      [11.9680, 75.3620], // Aroli
      [11.9780, 75.3700], // Podikkalam approach
      [11.9848, 75.3765], // Dharmasala South
      [11.9865, 75.3763], // Dharmasala Junction
      [11.9900, 75.3715], // North of Dharmasala
      [11.9974, 75.3708], // Bakkalam Junction
      [12.0061, 75.3694], // Kolmotta link
      [12.0200, 75.3657]  // Heading towards Taliparamba
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
      [11.9865, 75.3763], // Dharmasala Junction
      [11.9883, 75.3894], // Parassinikkadavu Road
      [11.9893, 75.3885], // Snake Park Gate
      [11.9900, 75.3937], // Vismaya Amusement Park
      [11.9839, 75.3987], // Parassini Bus Stand
      [11.9828, 75.4013], // Muthappan Temple Gate
      [11.9850, 75.4045]  // Parassinikkadavu Bridge
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
      [11.9865, 75.3763], // Dharmasala
      [11.9870, 75.3600], // Morazha Central Road
      [11.9872, 75.3522], // Historic Morazha Memorial & HSS
      [11.9894, 75.3384], // Morazha West
      [12.0018, 75.3422], // Poothamchal - Vellikkeel Road
      [12.0047, 75.3420], // Vellikkeel Eco Park Entrance
      [12.0302, 75.3408]  // Vellikkeel Junction Bus Stop
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
      [11.9865, 75.3763], // Dharmasala Junction
      [11.9892, 75.3795], // NIFT Kannur Campus Gate
      [11.9858, 75.3819], // Government Engineering College Kannur (GCEK)
      [11.9838, 75.3667], // Mizone Innovation Center
      [11.9824, 75.3654]  // Kannur University Mangattuparamba Campus
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
      [11.9686, 75.3443], // Kalliasseri Boundary
      [11.9620, 75.3620], // Punnakkulangara Link
      [11.9560, 75.3680], // Aroli Central
      [11.9620, 75.3720], // Aroli East Riverfront
      [11.9750, 75.3900]  // River road towards Parassinikkadavu
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
      [11.9974, 75.3708], // Bakkalam on NH 66
      [11.9953, 75.3783], // Kadambery Link
      [11.9920, 75.3780]  // Kinfra Gate
    ]
  }
];
