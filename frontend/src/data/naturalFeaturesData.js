// Anthoor Municipality Natural Geographic Features GIS Data
// (Valapattanam River Corridor, Vellikkeel Mangrove Wetlands, Morazha Hills)

export const ANTHOOR_NATURAL_FEATURES = [
  {
    id: "waterway-1",
    name: "Valapattanam River (Anthoor Stretch)",
    name_ml: "വളപട്ടണം പുഴ (ആന്തൂർ തീരം)",
    type: "River Corridor",
    type_ml: "പുഴ / നദീതീരം",
    color: "#0284C7",
    fillColor: "#38BDF8",
    fillOpacity: 0.25,
    weight: 2,
    description: "The historic Valapattanam River flowing along Parassinikkadavu and Aroli, hosting boat jetties and the revered riverside shrine.",
    description_ml: "പറശ്ശിനിക്കടവ്, ആരോളി തീരങ്ങളിലൂടെ ഒഴുകുന്ന ചരിത്രപ്രസിദ്ധമായ വളപട്ടണം പുഴ.",
    polygon: [
      [11.9750, 75.4120], // Upstream bend from Mayyil
      [11.9810, 75.4050],
      [11.9828, 75.4015], // Parassinikkadavu Muthappan Temple Riverfront
      [11.9850, 75.4045], // Parassini Bridge
      [11.9870, 75.4080],
      [11.9840, 75.4090],
      [11.9815, 75.4035],
      [11.9770, 75.3980],
      [11.9720, 75.3900], // Narath bend
      [11.9650, 75.3800], // Aroli riverbank
      [11.9580, 75.3720],
      [11.9520, 75.3650], // Downstream towards Valapattanam
      [11.9540, 75.3620],
      [11.9620, 75.3700],
      [11.9680, 75.3780],
      [11.9750, 75.3880],
      [11.9800, 75.3960],
      [11.9750, 75.4120]
    ]
  },
  {
    id: "wetland-1",
    name: "Vellikkeel Eco Tourism Mangrove Wetlands",
    name_ml: "വെള്ളിക്കീൽ കണ്ടൽത്തണ്ണീർത്തട ഇക്കോ പാർക്ക്",
    type: "Protected Mangrove Reserve",
    type_ml: "സംരക്ഷിത കണ്ടൽ വനം",
    color: "#059669",
    fillColor: "#10B981",
    fillOpacity: 0.3,
    weight: 2,
    description: "Bio-diverse mangrove delta with elevated wooden walkways, observation watchtowers, and eco-boating facilities.",
    description_ml: "തടിപ്പാലങ്ങളും വാച്ച് ടവറുകളും ബോട്ടിംഗ് സൗകര്യവുമുള്ള കണ്ടൽ സംരക്ഷണ മേഖല.",
    polygon: [
      [12.0000, 75.3430],
      [12.0050, 75.3420],
      [12.0150, 75.3410],
      [12.0260, 75.3406],
      [12.0302, 75.3408], // Vellikkeel Junction / northern mangrove bridge
      [12.0280, 75.3380],
      [12.0180, 75.3385],
      [12.0080, 75.3390],
      [12.0020, 75.3400],
      [12.0000, 75.3430]
    ]
  }
];
