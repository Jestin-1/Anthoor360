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
      [11.9680, 75.4120],
      [11.9630, 75.4100],
      [11.9592, 75.4072], // Parassinikkadavu Temple Riverfront
      [11.9560, 75.4080],
      [11.9520, 75.4030],
      [11.9500, 75.3950],
      [11.9480, 75.3850],
      [11.9450, 75.3750],
      [11.9430, 75.3780],
      [11.9470, 75.3900],
      [11.9510, 75.4000],
      [11.9550, 75.4120],
      [11.9600, 75.4140],
      [11.9660, 75.4170],
      [11.9700, 75.4160],
      [11.9680, 75.4120]
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
      [11.9980, 75.3560],
      [12.0030, 75.3540],
      [12.0060, 75.3500],
      [12.0080, 75.3460],
      [12.0050, 75.3440],
      [12.0010, 75.3480],
      [11.9970, 75.3510],
      [11.9980, 75.3560]
    ]
  }
];
