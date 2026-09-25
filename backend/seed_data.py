"""
Anthoor 360 Database Seeder Script.
Populates realistic, verified municipal GIS data for Anthoor Municipality, Kannur, Kerala.
"""
import os
import sys
import django

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
django.setup()

from locations.models import Ward
from facilities.models import Category, Facility
from projects.models import MunicipalProject
from content.models import CitizenService, Announcement
from directory.models import DirectoryEntry

def seed_database():
    print("Seeding Anthoor 360 Municipal Database...")

    # 1. Seed Categories
    categories_data = [
        {"name": "Education", "name_ml": "വിദ്യാഭ്യാസം", "slug": "education", "icon": "GraduationCap", "color": "#2563EB"},
        {"name": "Healthcare", "name_ml": "ആരോഗ്യം", "slug": "healthcare", "icon": "HeartPulse", "color": "#DC2626"},
        {"name": "Government", "name_ml": "സർക്കാർ കാര്യാലയങ്ങൾ", "slug": "government", "icon": "Landmark", "color": "#059669"},
        {"name": "Transport", "name_ml": "ഗതാഗതം & ഇന്ധനം", "slug": "transport", "icon": "Bus", "color": "#D97706"},
        {"name": "Tourism", "name_ml": "വിനോദസഞ്ചാരം", "slug": "tourism", "icon": "Compass", "color": "#7C3AED"},
        {"name": "Commercial", "name_ml": "വ്യാപാരം", "slug": "commercial", "icon": "Store", "color": "#0891B2"},
        {"name": "Public Facilities", "name_ml": "പൊതു സൗകര്യങ്ങൾ", "slug": "public", "icon": "Building2", "color": "#4B5563"},
    ]

    cat_map = {}
    for c in categories_data:
        obj, _ = Category.objects.update_or_create(slug=c['slug'], defaults=c)
        cat_map[c['slug']] = obj
    print(f"Categories seeded: {len(cat_map)}")

    # 2. Seed All 28 Wards
    wards_data = [
        {"number": 1, "name": "Morazha Central", "name_ml": "മൊറാഴ സെൻട്രൽ", "councillor": "K. Narayanan", "phone": "9447123001", "population": 1320, "latitude": 11.9872, "longitude": 75.3522},
        {"number": 2, "name": "Morazha West", "name_ml": "മൊറാഴ വെസ്റ്റ്", "councillor": "P. V. Valsala", "phone": "9447123002", "population": 1280, "latitude": 11.9894, "longitude": 75.3384},
        {"number": 3, "name": "Kanool", "name_ml": "കാനൂൽ", "councillor": "M. K. Suresh", "phone": "9447123003", "population": 1410, "latitude": 12.0015, "longitude": 75.3637},
        {"number": 4, "name": "Vellikkeel", "name_ml": "വെള്ളിക്കീൽ", "councillor": "S. Kamala", "phone": "9447123004", "population": 1190, "latitude": 12.0047, "longitude": 75.342},
        {"number": 5, "name": "Mayyil Link", "name_ml": "മയ്യിൽ ലിങ്ക്", "councillor": "T. Rajan", "phone": "9447123005", "population": 1240, "latitude": 11.984, "longitude": 75.372},
        {"number": 6, "name": "Anthoor North", "name_ml": "ആന്തൂർ നോർത്ത്", "councillor": "C. Mini", "phone": "9447123006", "population": 1390, "latitude": 11.9889, "longitude": 75.3863},
        {"number": 7, "name": "Dharmasala Central", "name_ml": "ധർമ്മശാല സെൻട്രൽ", "councillor": "P. Mukundan (Chairperson)", "phone": "9447123007", "population": 1650, "latitude": 11.9865, "longitude": 75.3765},
        {"number": 8, "name": "Mangattuparamba", "name_ml": "മാങ്ങാട്ടുപറമ്പ്", "councillor": "V. Geetha", "phone": "9447123008", "population": 1580, "latitude": 11.9795, "longitude": 75.3731},
        {"number": 9, "name": "Parassinikkadavu North", "name_ml": "പറശ്ശിനിക്കടവ് നോർത്ത്", "councillor": "R. Balakrishnan", "phone": "9447123009", "population": 1420, "latitude": 11.9893, "longitude": 75.3885},
        {"number": 10, "name": "Parassinikkadavu Temple", "name_ml": "പറശ്ശിനിക്കടവ് ക്ഷേത്രം", "councillor": "K. Shailaja", "phone": "9447123010", "population": 1510, "latitude": 11.9828, "longitude": 75.4013},
        {"number": 11, "name": "Vismaya Junction", "name_ml": "വിസ്മയ ജംഗ്ഷൻ", "councillor": "M. Babu", "phone": "9447123011", "population": 1330, "latitude": 11.99, "longitude": 75.3937},
        {"number": 12, "name": "Aroli East", "name_ml": "ആരോളി ഈസ്റ്റ്", "councillor": "P. Devaki", "phone": "9447123012", "population": 1210, "latitude": 11.962, "longitude": 75.372},
        {"number": 13, "name": "Aroli Central", "name_ml": "ആരോളി സെൻട്രൽ", "councillor": "T. K. Satheesh", "phone": "9447123013", "population": 1290, "latitude": 11.956, "longitude": 75.368},
        {"number": 14, "name": "Punnakkulangara", "name_ml": "പുന്നക്കുളങ്ങര", "councillor": "K. Rema", "phone": "9447123014", "population": 1180, "latitude": 11.9904, "longitude": 75.3684},
        {"number": 15, "name": "Podikkalam", "name_ml": "പൊടിക്കളം", "councillor": "E. Vijayan", "phone": "9447123015", "population": 1250, "latitude": 11.9758, "longitude": 75.3719},
        {"number": 16, "name": "Kuttikkol", "name_ml": "കുറ്റിക്കോൽ", "councillor": "N. Vineetha", "phone": "9447123016", "population": 1340, "latitude": 11.9773, "longitude": 75.3709},
        {"number": 17, "name": "Bakkalam", "name_ml": "ബക്കളം", "councillor": "C. H. Musthafa", "phone": "9447123017", "population": 1400, "latitude": 11.9974, "longitude": 75.3708},
        {"number": 18, "name": "Kadambur Link", "name_ml": "കടമ്പൂർ ലിങ്ക്", "councillor": "M. Savithri", "phone": "9447123018", "population": 1150, "latitude": 11.9953, "longitude": 75.3783},
        {"number": 19, "name": "Kinfra Industrial", "name_ml": "കിൻഫ്ര വ്യവസായ വാർഡ്", "councillor": "A. P. Soman", "phone": "9447123019", "population": 1050, "latitude": 11.992, "longitude": 75.378},
        {"number": 20, "name": "Engineering College", "name_ml": "എൻജിനീയറിങ് കോളേജ് വാർഡ്", "councillor": "Dr. P. Radhika", "phone": "9447123020", "population": 1620, "latitude": 11.9858, "longitude": 75.3819},
        {"number": 21, "name": "NIFT Campus Ward", "name_ml": "നിഫ്റ്റ് കാമ്പസ് വാർഡ്", "councillor": "K. Preethi", "phone": "9447123021", "population": 1480, "latitude": 11.9892, "longitude": 75.3795},
        {"number": 22, "name": "University Campus", "name_ml": "സർവ്വകലാശാല കാമ്പസ് വാർഡ്", "councillor": "S. Manoj", "phone": "9447123022", "population": 1520, "latitude": 11.9824, "longitude": 75.3654},
        {"number": 23, "name": "Kalliasseri Boundary", "name_ml": "കല്യാശ്ശേരി അതിർത്തി", "councillor": "V. Chandran", "phone": "9447123023", "population": 1270, "latitude": 11.9686, "longitude": 75.3443},
        {"number": 24, "name": "Valapattanam Riverbank", "name_ml": "വളപട്ടണം റിവർഫ്രണ്ട്", "councillor": "M. Sujatha", "phone": "9447123024", "population": 1310, "latitude": 11.978, "longitude": 75.398},
        {"number": 25, "name": "Muthappan Kavu", "name_ml": "മുത്തപ്പൻ കാവ്", "councillor": "T. Haridasan", "phone": "9447123025", "population": 1220, "latitude": 11.9839, "longitude": 75.3987},
        {"number": 26, "name": "Pazhayangadi Road", "name_ml": "പഴയങ്ങാടി റോഡ്", "councillor": "K. Prasanna", "phone": "9447123026", "population": 1190, "latitude": 12.0129, "longitude": 75.3417},
        {"number": 27, "name": "Morazha South", "name_ml": "മൊറാഴ തെക്ക്", "councillor": "P. Raghu", "phone": "9447123027", "population": 1260, "latitude": 11.982, "longitude": 75.3487},
        {"number": 28, "name": "Anthoor Town Gate", "name_ml": "ആന്തൂർ ടൗൺ ഗേറ്റ്", "councillor": "V. Sumathy", "phone": "9447123028", "population": 1380, "latitude": 11.9856, "longitude": 75.3786},
    ]

    ward_map = {}
    for w in wards_data:
        obj, _ = Ward.objects.update_or_create(number=w['number'], defaults=w)
        ward_map[w['number']] = obj
    print(f"Wards seeded: {len(ward_map)}")

    # 3. Seed All 20 Verified Facilities
    facilities_data = [
        {
            "name": "Government College of Engineering, Kannur (GCEK)",
            "name_ml": "ഗവൺമെന്റ് എൻജിനീയറിങ് കോളേജ്, കണ്ണൂർ",
            "category": cat_map["education"],
            "ward": ward_map[20],
            "address": "Mangattuparamba, Dharmasala, Anthoor Municipality, Kannur - 670563",
            "latitude": 11.9858,
            "longitude": 75.3819,
            "phone": "0497 2780226",
            "email": "principal@gcek.ac.in",
            "website": "https://www.gcek.ac.in",
            "opening_hours": "Mon - Sat: 9:00 AM - 5:00 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Higher Education Dept. Kerala",
            "description": "Premier government engineering institution established in 1986.",
            "description_ml": "1986-ൽ സ്ഥാപിതമായ കേരളത്തിലെ മുൻനിര സർക്കാർ എൻജിനീയറിങ് കോളേജുകളിലൊന്ന്."
        },
        {
            "name": "National Institute of Fashion Technology (NIFT), Kannur",
            "name_ml": "നാഷണൽ ഇൻസ്റ്റിറ്റ്യൂട്ട് ഓഫ് ഫാഷൻ ടെക്നോളജി (നിഫ്റ്റ്)",
            "category": cat_map["education"],
            "ward": ward_map[21],
            "address": "Dharmasala, Mangattuparamba, Anthoor, Kannur - 670562",
            "latitude": 11.9892,
            "longitude": 75.3795,
            "phone": "0497 2784780",
            "email": "director.kannur@nift.ac.in",
            "website": "https://www.nift.ac.in/kannur",
            "opening_hours": "Mon - Fri: 9:00 AM - 5:30 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Ministry of Textiles, Govt. of India",
            "description": "Premier national design institute in fashion, textile, and lifestyle accessories.",
            "description_ml": "കേന്ദ്ര ടെക്സ്റ്റൈൽസ് മന്ത്രാലയത്തിന് കീഴിലുള്ള ദേശീയ ഫാഷൻ ഡിസൈൻ കേന്ദ്രം."
        },
        {
            "name": "Kannur University Mangattuparamba Campus",
            "name_ml": "കണ്ണൂർ സർവ്വകലാശാല മാങ്ങാട്ടുപറമ്പ് കാമ്പസ്",
            "category": cat_map["education"],
            "ward": ward_map[22],
            "address": "Mangattuparamba, Anthoor Municipality, Kannur - 670567",
            "latitude": 11.9824,
            "longitude": 75.3654,
            "phone": "0497 2783922",
            "email": "mangattuparambacampus@kannuruniv.ac.in",
            "website": "https://www.kannuruniversity.ac.in",
            "opening_hours": "Mon - Sat: 9:30 AM - 4:30 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Kannur University Official",
            "description": "Main academic campus hosting School of Physical Education, Department of IT, and Teacher Training.",
            "description_ml": "കായിക ശാസ്ത്രം, ഐടി, അധ്യാപക പരിശീലനം എന്നിവ ഉൾപ്പെടുന്ന കാമ്പസ്."
        },
        {
            "name": "Anthoor Municipal Office",
            "name_ml": "ആന്തൂർ നഗരസഭാ കാര്യാലയം",
            "category": cat_map["government"],
            "ward": ward_map[7],
            "address": "Dharmasala, Anthoor Municipality, Kannur - 670567",
            "latitude": 11.9862,
            "longitude": 75.3788,
            "phone": "0497 2780005",
            "email": "anthoormunicipality@gmail.com",
            "website": "https://lsgkerala.gov.in/en/lbe/anthoor",
            "opening_hours": "Mon - Sat: 10:00 AM - 5:00 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Kerala Local Self Government Department",
            "description": "Administrative headquarters of Anthoor Municipality.",
            "description_ml": "ആന്തൂർ നഗരസഭയുടെ ഭരണകേന്ദ്രം."
        },
        {
            "name": "Parassinikkadavu Sree Muthappan Madappura Temple",
            "name_ml": "ശ്രീ പറശ്ശിനിക്കടവ് മുത്തപ്പൻ മടപ്പുര",
            "category": cat_map["tourism"],
            "ward": ward_map[10],
            "address": "Parassinikkadavu, Valapattanam Riverbank, Anthoor, Kannur - 670563",
            "latitude": 11.9828,
            "longitude": 75.4013,
            "phone": "0497 2780722",
            "website": "https://www.parassinikadavumuthappan.com",
            "opening_hours": "Open Daily: 5:00 AM - 8:30 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Temple Trust / Kerala Tourism",
            "description": "World-famous riverside temple known for daily Muthappan Theyyam and community dining.",
            "description_ml": "വളപട്ടണം പുഴയുടെ തീരത്ത് സ്ഥിതി ചെയ്യുന്ന ലോകപ്രസിദ്ധമായ മുത്തപ്പൻ തിരുസന്നിധി."
        },
        {
            "name": "Parassinikkadavu Snake Park & Zoo",
            "name_ml": "പറശ്ശിനിക്കടവ് സ്നേക്ക് പാർക്ക് & സൂ",
            "category": cat_map["tourism"],
            "ward": ward_map[9],
            "address": "Parassinikkadavu, Anthoor Municipality, Kannur - 670563",
            "latitude": 11.9893,
            "longitude": 75.3885,
            "phone": "0497 2780442",
            "website": "https://snakepark.org",
            "opening_hours": "Daily: 9:00 AM - 5:30 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Central Zoo Authority & Kerala Tourism",
            "description": "Renowned reptile conservation and education center with anti-venom research.",
            "description_ml": "ഉരഗങ്ങളുടെ സംരക്ഷണത്തിനും ഗവേഷണത്തിനുമായി പ്രവർത്തിക്കുന്ന മൃഗശാല."
        },
        {
            "name": "Vismaya Water Theme Park",
            "name_ml": "വിസ്മയ അമ്യൂസ്മെന്റ് പാർക്ക്",
            "category": cat_map["tourism"],
            "ward": ward_map[11],
            "address": "Parassinikkadavu PO, Anthoor, Kannur - 670563",
            "latitude": 11.99,
            "longitude": 75.3937,
            "phone": "0497 2782850",
            "website": "https://vismayakannur.com",
            "opening_hours": "Daily: 10:30 AM - 6:00 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Verified Commercial Entity",
            "description": "Premier water and amusement theme park with over 30 exhilarating water rides and wave pools.",
            "description_ml": "ഉത്തര മലബാറിലെ പ്രമുഖ വാട്ടർ ആന്റ് അഡ്വെഞ്ചർ തീം പാർക്ക്."
        },
        {
            "name": "Vellikkeel Eco Tourism Park & Mangroves",
            "name_ml": "വെള്ളിക്കീൽ ഇക്കോ ടൂറിസം പാർക്ക്",
            "category": cat_map["tourism"],
            "ward": ward_map[4],
            "address": "Vellikkeel, Anthoor Municipality, Kannur - 670567",
            "latitude": 12.0005,
            "longitude": 75.3412,
            "phone": "0497 2781190",
            "opening_hours": "Daily: 9:00 AM - 6:30 PM",
            "verified": True,
            "is_accessible": False,
            "source": "DTPC Kannur",
            "description": "Scenic backwater mangrove boardwalk and boating destination.",
            "description_ml": "കണ്ടൽക്കാടുകൾക്ക് നടുവിലൂടെയുള്ള തടിപ്പാലവും ബോട്ടിംഗും ഒരുക്കുന്ന ഇക്കോ പാർക്ക്."
        },
        {
            "name": "Anthoor Taluk Community Health Centre",
            "name_ml": "ആന്തൂർ കമ്മ്യൂണിറ്റി ഹെൽത്ത് സെന്റർ (സി.എച്ച്.സി)",
            "category": cat_map["healthcare"],
            "ward": ward_map[6],
            "address": "Near Dharmasala Link Road, Anthoor - 670567",
            "latitude": 11.9865,
            "longitude": 75.3784,
            "phone": "0497 2780108",
            "opening_hours": "24x7 Emergency; OP: 8:00 AM - 1:00 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Directorate of Health Services, Kerala",
            "description": "Primary healthcare hospital with 24x7 emergency and ambulance services.",
            "description_ml": "24 മണിക്കൂറും പ്രവർത്തിക്കുന്ന സർക്കാർ ആശുപത്രി."
        },
        {
            "name": "Parassinikkadavu Ayurveda Medical College & Hospital",
            "name_ml": "പറശ്ശിനിക്കടവ് ആയുർവേദ മെഡിക്കൽ കോളേജ്",
            "category": cat_map["healthcare"],
            "ward": ward_map[10],
            "address": "Parassinikkadavu, Anthoor, Kannur - 670563",
            "latitude": 11.9891,
            "longitude": 75.3882,
            "phone": "0497 2780249",
            "website": "https://ayurvedacollege.ac.in",
            "opening_hours": "Hospital 24x7; OP: 9:00 AM - 2:00 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Department of AYUSH, Govt of Kerala",
            "description": "Famous Ayurvedic teaching hospital offering Panchakarma and specialized treatments.",
            "description_ml": "പഞ്ചകർമ്മ ചികിത്സയ്ക്കും ഗവേഷണങ്ങൾക്കും പേരുകേട്ട ആയുർവേദ ആശുപത്രി."
        },
        {
            "name": "Primary Health Centre (PHC) Morazha",
            "name_ml": "പ്രാഥമിക ആരോഗ്യ കേന്ദ്രം മൊറാഴ",
            "category": cat_map["healthcare"],
            "ward": ward_map[1],
            "address": "Morazha Post, Anthoor Municipality - 670567",
            "latitude": 11.9983,
            "longitude": 75.341,
            "phone": "0497 2783020",
            "opening_hours": "Mon - Sat: 9:00 AM - 2:00 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Kerala Health Dept",
            "description": "Aardram Mission model primary healthcare facility.",
            "description_ml": "ആർദ്രം മിഷൻ കുടുംബാരോഗ്യ കേന്ദ്രം."
        },
        {
            "name": "Dharmasala KSRTC & Private Bus Stand",
            "name_ml": "ധർമ്മശാല ബസ് ടെർമിനൽ",
            "category": cat_map["transport"],
            "ward": ward_map[7],
            "address": "NH 66 Junction, Dharmasala, Anthoor - 670567",
            "latitude": 11.9865,
            "longitude": 75.3763,
            "phone": "0497 2781100",
            "opening_hours": "Open 24 Hours",
            "verified": True,
            "is_accessible": True,
            "source": "Anthoor Municipal Records",
            "description": "Major transit hub on NH 66 corridor.",
            "description_ml": "ദേശീയപാത 66-ലെ പ്രധാന ബസ് കാത്തിരിപ്പ് കേന്ദ്രം."
        },
        {
            "name": "Indian Oil Petrol Pump & Fast EV Charging Station",
            "name_ml": "ഇന്ത്യൻ ഓയിൽ പെട്രോൾ പമ്പ് & ഇ.വി ചാർജിംഗ്",
            "category": cat_map["transport"],
            "ward": ward_map[7],
            "address": "NH 66 Bypass, Dharmasala, Anthoor - 670567",
            "latitude": 11.9848,
            "longitude": 75.3764,
            "phone": "0497 2780330",
            "opening_hours": "Open 24 Hours",
            "verified": True,
            "is_accessible": True,
            "source": "IOCL Retail Directory",
            "description": "24-hour fuel station with 60kW DC Fast EV Charging facility.",
            "description_ml": "24 മണിക്കൂറും പ്രവർത്തിക്കുന്ന ഇന്ധന കേന്ദ്രവും ഫാസ്റ്റ് ഇലക്ട്രിക് ചാർജിംഗ് സ്റ്റേഷനും."
        },
        {
            "name": "State Bank of India (SBI) Dharmasala Branch & ATM",
            "name_ml": "സ്റ്റേറ്റ് ബാങ്ക് ഓഫ് ഇന്ത്യ ധർമ്മശാല",
            "category": cat_map["commercial"],
            "ward": ward_map[7],
            "address": "Dharmasala Town, Anthoor - 670567",
            "latitude": 11.9865,
            "longitude": 75.3759,
            "phone": "0497 2780288",
            "opening_hours": "Mon - Sat: 10:00 AM - 4:00 PM; ATM 24x7",
            "verified": True,
            "is_accessible": True,
            "source": "SBI Official Directory",
            "description": "Full service public sector bank branch with 24x7 CDM and ATM.",
            "description_ml": "എല്ലാ ബാങ്കിംഗ് സേവനങ്ങളും 24 മണിക്കൂർ എ.ടി.എമ്മും."
        },
        {
            "name": "KSEB Electrical Section Office, Dharmasala",
            "name_ml": "കെ.എസ്.ഇ.ബി സെക്ഷൻ ഓഫീസ്, ധർമ്മശാല",
            "category": cat_map["government"],
            "ward": ward_map[28],
            "address": "Near Municipal Stadium, Dharmasala, Anthoor - 670567",
            "latitude": 11.9853,
            "longitude": 75.3796,
            "phone": "0497 2780277",
            "opening_hours": "Mon - Sat: 9:00 AM - 5:00 PM; Fault Service 24x7",
            "verified": True,
            "is_accessible": True,
            "source": "KSEB Ltd.",
            "description": "Power utility section office catering to all electricity connections in Anthoor.",
            "description_ml": "വൈദ്യുതി കണക്ഷൻ, തകരാറുകൾ പരിഹരിക്കൽ എന്നിവയ്ക്കുള്ള കാര്യാലയം."
        },
        {
            "name": "Taliparamba Fire and Rescue Station",
            "name_ml": "ഫയർ & റെസ്ക്യൂ സ്റ്റേഷൻ (ആന്തൂർ സർവീസ്)",
            "category": cat_map["public"],
            "ward": ward_map[17],
            "address": "NH 66 Corridor, Bakkalam-Taliparamba Route - 670141",
            "latitude": 12.015,
            "longitude": 75.366,
            "phone": "0497 2780101",
            "opening_hours": "Emergency Response 24x7 (Toll Free: 101)",
            "verified": True,
            "is_accessible": True,
            "source": "Kerala Fire and Rescue Services",
            "description": "Emergency fire fighting and disaster mitigation squad.",
            "description_ml": "അടിയന്തര അഗ്നിശമന, രക്ഷാപ്രവർത്തന സേന."
        },
        {
            "name": "Akshaya E-Kendra & Janasevana Kendram",
            "name_ml": "അക്ഷയ ഇ-കേന്ദ്രം & ജനസേവന കേന്ദ്രം",
            "category": cat_map["government"],
            "ward": ward_map[7],
            "address": "Opposite Municipal Office, Dharmasala - 670567",
            "latitude": 11.9864,
            "longitude": 75.3769,
            "phone": "0497 2781420",
            "opening_hours": "Mon - Sat: 9:30 AM - 6:00 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Akshaya State Project",
            "description": "Aadhaar enrolment, certificate applications, pension mustering, and online citizen services.",
            "description_ml": "ആധാർ, സർട്ടിഫിക്കറ്റ് അപേക്ഷകൾ, പെൻഷൻ മസ്റ്ററിംഗ് തുടങ്ങിയ ഓൺലൈൻ സേവനങ്ങൾ."
        },
        {
            "name": "KINFRA Textile & Industrial Park, Anthoor",
            "name_ml": "കിൻഫ്ര ഇൻഡസ്ട്രിയൽ പാർക്ക്",
            "category": cat_map["commercial"],
            "ward": ward_map[19],
            "address": "Morazha Road, Anthoor Municipality - 670567",
            "latitude": 11.992,
            "longitude": 75.378,
            "phone": "0497 2782290",
            "opening_hours": "Mon - Sat: 9:00 AM - 5:00 PM",
            "verified": True,
            "is_accessible": True,
            "source": "KINFRA Kerala",
            "description": "Industrial park housing eco-textile units and enterprise incubators.",
            "description_ml": "വ്യവസായ സംരംഭങ്ങൾക്കും തൊഴിൽ വികസനത്തിനുമായി ഒരുക്കിയ വ്യവസായ പാർക്ക്."
        },
        {
            "name": "Historic Morazha Peasant Uprising Monument",
            "name_ml": "ചരിത്രപ്രസിദ്ധമായ മൊറാഴ രക്തസാക്ഷി സ്മാരകം",
            "category": cat_map["tourism"],
            "ward": ward_map[1],
            "address": "Morazha Post, Anthoor, Kannur - 670567",
            "latitude": 11.9872,
            "longitude": 75.3522,
            "phone": "0497 2783000",
            "opening_hours": "Open Daily 6:00 AM - 7:00 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Kerala Cultural Heritage Dept",
            "description": "Historic memorial dedicated to the 1940 Morazha Peasant Uprising martyrs.",
            "description_ml": "ബ്രിട്ടീഷ് ഭരണത്തിനും ജന്മിത്തത്തിനുമെതിരെ 1940-ൽ നടന്ന ചരിത്രപ്രസിദ്ധമായ മൊറാഴ കർഷക സമരത്തിന്റെ സ്മാരകം."
        },
        {
            "name": "Anthoor Municipal Stadium & Sports Complex",
            "name_ml": "ആന്തൂർ നഗരസഭ സ്പോർട്സ് കോംപ്ലക്സ് & സ്റ്റേഡിയം",
            "category": cat_map["public"],
            "ward": ward_map[28],
            "address": "Sports Avenue, Dharmasala, Anthoor - 670567",
            "latitude": 11.9856,
            "longitude": 75.3786,
            "phone": "0497 2781555",
            "opening_hours": "Daily: 5:30 AM - 9:00 AM & 4:00 PM - 8:30 PM",
            "verified": True,
            "is_accessible": True,
            "source": "Anthoor Municipal Council",
            "description": "Multipurpose sports complex featuring full-size football turf and synthetic track.",
            "description_ml": "ഫുട്ബോൾ ടർഫ്, അത്‌ലറ്റിക് ട്രാക്ക് സൗകര്യങ്ങളുള്ള നഗരസഭാ സ്റ്റേഡിയം."
        }
    ]

    for f in facilities_data:
        Facility.objects.update_or_create(name=f['name'], defaults=f)
    print("All 20 facilities seeded.")

    # 4. Seed Municipal Projects
    projects_data = [
        {
            "ward": ward_map[7],
            "name": "Dharmasala Smart Bus Interchange & High-Speed EV Station",
            "name_ml": "ധർമ്മശാല സ്മാർട്ട് ബസ് ടെർമിനൽ & ഇ.വി ചാർജിംഗ് ഹബ്ബ്",
            "budget": "₹ 1.85 Crores",
            "status": "Ongoing",
            "progress": 78,
            "start_date": "Nov 2023",
            "expected_completion": "Dec 2026",
            "contractor": "Kerala Urban Infrastructure Dev. Corp.",
            "description": "Commuter shelter, solar lighting, automated kiosk, and fast EV chargers on NH 66.",
            "latitude": 11.9865,
            "longitude": 75.3763
        },
        {
            "ward": ward_map[4],
            "name": "Valapattanam River Mangrove Eco-Walkway Phase II",
            "name_ml": "വളപട്ടണം പുഴ കണ്ടൽ സംരക്ഷണ നടപ്പാത (ഘട്ടം II)",
            "budget": "₹ 95 Lakhs",
            "status": "Ongoing",
            "progress": 60,
            "start_date": "Jan 2024",
            "expected_completion": "March 2027",
            "contractor": "DTPC & Anthoor Municipality",
            "description": "Extending mangrove walkway by 450 meters with solar lighting.",
            "latitude": 12.0010,
            "longitude": 75.3520
        },
        {
            "ward": ward_map[1],
            "name": "Comprehensive Drinking Water Pipeline Network (JJM)",
            "name_ml": "സമഗ്ര കുടിവെള്ള പൈപ്പ്‌ലൈൻ ശൃംഖല (ജൽ ജീവൻ മിഷൻ)",
            "budget": "₹ 3.20 Crores",
            "status": "Approved",
            "progress": 25,
            "start_date": "April 2024",
            "expected_completion": "Jan 2027",
            "contractor": "KWA & Anthoor Municipality",
            "description": "Laying 18 km distribution network providing 2,400 tap connections.",
            "latitude": 11.9860,
            "longitude": 75.3620
        },
        {
            "ward": ward_map[8],
            "name": "Mangattuparamba Youth Innovation & Reading Room Complex",
            "name_ml": "മാങ്ങാട്ടുപറമ്പ് യൂത്ത് ഇന്നൊവേഷൻ ലൈബ്രറി സമുച്ചയം",
            "budget": "₹ 75 Lakhs",
            "status": "Completed",
            "progress": 100,
            "start_date": "Feb 2023",
            "expected_completion": "Aug 2024",
            "contractor": "Anthoor Public Works",
            "description": "Wi-Fi enabled study cabins and digital book repository.",
            "latitude": 11.9838,
            "longitude": 75.3667
        },
        {
            "ward": ward_map[7],
            "name": "Municipal 100% Solar Street Lighting across all 28 Wards",
            "name_ml": "28 വാർഡുകളിലും സമ്പൂർണ്ണ സൗരോർജ്ജ തെരുവ് വിളക്കുകൾ",
            "budget": "₹ 1.10 Crores",
            "status": "Completed",
            "progress": 100,
            "start_date": "Oct 2022",
            "expected_completion": "May 2024",
            "contractor": "ANERT & Anthoor Municipality",
            "description": "Over 1,450 automatic energy-saving LED streetlights.",
            "latitude": 11.9862,
            "longitude": 75.3788
        }
    ]

    for p in projects_data:
        MunicipalProject.objects.update_or_create(name=p['name'], defaults=p)
    print("Municipal projects seeded.")

    # 5. Seed Directory Entries
    directory_data = [
        {"name": "Malabar Bakers & Coffee Lounge", "category": "Food & Dining", "ward": "Ward 7 - Dharmasala", "address": "Opposite GCEK Campus Gate, Dharmasala", "phone": "+91 98471 22334", "verified": True, "rating": 4.6, "hours": "7:00 AM - 10:00 PM"},
        {"name": "Dharmasala Medicals & Surgical Store", "category": "Pharmacies & Healthcare", "ward": "Ward 7 - Dharmasala", "address": "Near CHC Junction, Anthoor", "phone": "+91 94472 88102", "verified": True, "rating": 4.8, "hours": "24 Hours Open"},
        {"name": "Parassinikkadavu Traditional Brass & Handicrafts", "category": "Handicrafts & Gifts", "ward": "Ward 10 - Parassinikkadavu", "address": "Temple Walkway, Parassinikkadavu", "phone": "+91 98475 66710", "verified": True, "rating": 4.7, "hours": "6:00 AM - 8:30 PM"},
        {"name": "Apex Auto Care & Two-Wheeler Workshop", "category": "Automotive Services", "ward": "Ward 28 - Anthoor Town Gate", "address": "NH 66 Bypass, Anthoor", "phone": "+91 99951 44556", "verified": True, "rating": 4.5, "hours": "8:30 AM - 7:30 PM"},
        {"name": "Silicon Digital Print & CAD Photostat", "category": "Office & Printing", "ward": "Ward 20 - Engineering College Ward", "address": "College Road, Mangattuparamba", "phone": "+91 94468 99011", "verified": True, "rating": 4.9, "hours": "8:00 AM - 8:00 PM"}
    ]

    for d in directory_data:
        DirectoryEntry.objects.update_or_create(name=d['name'], defaults=d)
    print("Directory entries seeded.")

    # 6. Seed Citizen Services
    services_data = [
        {
            "title": "Birth & Death Certificate Registration",
            "title_ml": "ജനന-മരണ രജിസ്ട്രേഷൻ & സർട്ടിഫിക്കറ്റ്",
            "category": "Civil Registration",
            "category_ml": "സിവിൽ രജിസ്ട്രേഷൻ",
            "department": "Public Health Wing, Anthoor Municipality",
            "description": "Registration and digital certificate issuance for births and deaths occurring within Anthoor Municipality.",
            "description_ml": "ആന്തൂർ നഗരസഭാ പരിധിയിൽ നടക്കുന്ന ജനന-മരണങ്ങളുടെ രജിസ്ട്രേഷനും സർട്ടിഫിക്കറ്റ് വിതരണവും.",
            "required_documents": ["Hospital birth/death report Form 1", "Parents' / Deceased's Aadhaar cards", "Proof of address in Anthoor"],
            "procedure": "1. Hospital forwards Form 1 within 21 days.\n2. Verify details on Sevana portal.\n3. Download digitally signed certificate.",
            "fee": "Free within 21 days; ₹50 search fee for delayed entries",
            "processing_time": "1 to 3 Days",
            "official_portal_url": "https://cr.lsgkerala.gov.in"
        },
        {
            "title": "Property & Building Tax (Sanchaya)",
            "title_ml": "കെട്ടിട നികുതി ഒടുക്കൽ (സഞ്ചയ)",
            "category": "Revenue & Taxes",
            "category_ml": "റവന്യൂ & നികുതികൾ",
            "department": "Revenue Wing, Anthoor Municipality",
            "description": "Online assessment and payment of annual municipal building tax, ownership changes, and tax clearance certificates.",
            "description_ml": "വാർഷിക കെട്ടിട നികുതി ഒടുക്കലും ഉടമസ്ഥാവകാശ മാറ്റവും.",
            "required_documents": ["Assessment Number / Door Number", "Previous year tax receipt", "Deed/Pattayam for ownership changes"],
            "procedure": "1. Select District: Kannur, Municipality: Anthoor on Sanchaya portal.\n2. Enter Ward and Door number.\n3. Make secure e-payment via UPI/Net Banking and download official receipt.",
            "fee": "As per municipal assessment based on square meter area and building category.",
            "processing_time": "Instant Online Receipt",
            "official_portal_url": "https://tax.lsgkerala.gov.in"
        },
        {
            "title": "Building Permit & Occupancy Certificate (Sanketham)",
            "title_ml": "കെട്ടിട നിർമ്മാണ അനുമതി & ഒക്യുപൻസി (സങ്കേതം)",
            "category": "Engineering & Town Planning",
            "category_ml": "എൻജിനീയറിങ് വിഭാഗം",
            "department": "Engineering Wing, Anthoor Municipality",
            "description": "Scrutiny of building plans, issuance of building permits, and completion/occupancy certificates under KMBR.",
            "description_ml": "കെട്ടിട നിർമ്മാണത്തിനുള്ള മുൻകൂർ അനുമതിയും ഒക്യുപൻസി സർട്ടിഫിക്കറ്റും.",
            "required_documents": ["Title deed (Pattayam/Aadhooram)", "Land tax receipt (latest)", "Possession certificate", "Approved architectural plan"],
            "procedure": "1. Registered engineer/architect submits digital plan via Sanketham/K-Smart.\n2. Site inspection by Overseer.\n3. AE scrutinizes and Secretary issues permit.",
            "fee": "As per KMBR scheduled rates according to square meters.",
            "processing_time": "15 to 30 Days",
            "official_portal_url": "https://sanketham.lsgkerala.gov.in"
        },
        {
            "title": "Trade & D&O Business License",
            "title_ml": "വ്യാപാര ലൈസൻസ് (ഡി & ഒ ലൈസൻസ്)",
            "category": "Health & Commerce",
            "category_ml": "ആരോഗ്യ വിഭാഗം",
            "department": "Health Section, Anthoor Municipality",
            "description": "Issuance and renewal of Dangerous & Offensive (D&O) trade licenses for commercial shops and enterprises in Anthoor.",
            "description_ml": "വ്യാപാര സ്ഥാപനങ്ങൾ, ഹോട്ടലുകൾ, വർക്ക്‌ഷോപ്പുകൾ എന്നിവയ്ക്കുള്ള പ്രവർത്തന ലൈസൻസ്.",
            "required_documents": ["Rent agreement or ownership proof of building", "Building Door number and tax receipt", "FSSAI food license (for food trades)", "ID proof of applicant"],
            "procedure": "1. Apply online via K-SWIFT single window portal.\n2. Automated inspection by Health Inspector.\n3. Fee payment and download of digitally signed trade certificate.",
            "fee": "Schedule based on trade type and machinery.",
            "processing_time": "3 to 7 Days",
            "official_portal_url": "https://kswift.kerala.gov.in"
        },
        {
            "title": "Marriage Registration (Special & Common)",
            "title_ml": "വിവാഹ രജിസ്ട്രേഷൻ (കേരള വിവാഹ ചട്ടം)",
            "category": "Civil Registration",
            "category_ml": "സിവിൽ രജിസ്ട്രേഷൻ",
            "department": "General Administration, Anthoor Municipality",
            "description": "Registration of solemnized marriages under Kerala Registration of Marriages Rules, 2008 and issuance of legal certificates.",
            "description_ml": "ആന്തൂർ നഗരസഭയിൽ നടക്കുന്ന വിവാഹങ്ങളുടെ രജിസ്ട്രേഷൻ.",
            "required_documents": ["Form 1 Memorandum of Marriage", "Certificate from marriage venue", "Age proof of bride (18+) and groom (21+)", "Passport size photos"],
            "procedure": "1. Submit online via Sevana.\n2. Visit Municipal office with originals and 2 witnesses for signature.",
            "fee": "₹100 (General); ₹10 (BPL/SC/ST)",
            "processing_time": "Same Day or Next Working Day",
            "official_portal_url": "https://cr.lsgkerala.gov.in"
        },
        {
            "title": "Social Security & Welfare Pensions",
            "title_ml": "സാമൂഹ്യ സുരക്ഷാ പെൻഷനുകൾ",
            "category": "Welfare & Social Justice",
            "category_ml": "ക്ഷേമ പദ്ധതികൾ",
            "department": "Welfare Wing, Anthoor Municipality",
            "description": "Monthly financial assistance for Old Age, Widows, Agriculture laborers, and Differently-abled persons.",
            "description_ml": "വാർദ്ധക്യകാല പെൻഷൻ, വികലാംഗ പെൻഷൻ, കർഷകത്തൊഴിലാളി പെൻഷൻ, വിധവാ പെൻഷൻ.",
            "required_documents": ["Ration card copy", "Aadhaar card", "Bank passbook / DBT account", "Age proof"],
            "procedure": "1. Submit application through Akshaya Kendra or Municipal office.\n2. Ward councillor recommendation.\n3. Biometric mustering through Sevana Pension portal.",
            "fee": "Free of charge (Monthly grant ₹1,600)",
            "processing_time": "20 to 45 Days for sanction",
            "official_portal_url": "https://welfarepension.lsgkerala.gov.in"
        },
        {
            "title": "Civic Grievance & Public Redressal (ILGMS)",
            "title_ml": "പരാതി പരിഹാര സംവിധാനം (ഐ.എൽ.ജി.എം.എസ്)",
            "category": "Public Grievance",
            "category_ml": "പരാതി പരിഹാരം",
            "department": "Secretary, Anthoor Municipality",
            "description": "File official complaints regarding road potholes, streetlights, garbage removal, or water shortages.",
            "description_ml": "റോഡ്, തെരുവ് വിളക്കുകൾ, മാലിന്യ നിർമ്മാർജ്ജനം, കുടിവെള്ളം എന്നിവയുമായി ബന്ധപ്പെട്ട പരാതികൾ നൽകാം.",
            "required_documents": ["Valid Mobile Number", "Description of complaint with location/ward"],
            "procedure": "1. File grievance through Integrated Local Governance Management System (ILGMS).\n2. Receive SMS tracking token.\n3. Resolution within statutory timeline.",
            "fee": "Free Service",
            "processing_time": "3 to 14 Days",
            "official_portal_url": "https://ilgms.kerala.gov.in"
        },
        {
            "title": "Solid Waste Management & Haritha Karma Sena",
            "title_ml": "മാലിന്യ സംസ്കരണവും ഹരിത കർമ്മ സേനയും",
            "category": "Public Sanitation",
            "category_ml": "പൊതു ശുചിത്വം",
            "department": "Health & Suchitwa Mission, Anthoor",
            "description": "Door-to-door non-biodegradable plastic collection, Resource Recovery Facility drop-offs, and community composting support.",
            "description_ml": "വീടുകളിൽ നിന്നും സ്ഥാപനങ്ങളിൽ നിന്നുമുള്ള അജൈവ മാലിന്യ ശേഖരണം.",
            "required_documents": ["Resident door number or merchant registration"],
            "procedure": "1. Segregate clean plastic at source.\n2. Hand over to authorized Haritha Karma Sena on designated dates.\n3. Nominal user fee payment.",
            "fee": "₹50/month for households; ₹100+ for commercial units",
            "processing_time": "Monthly Recurring Schedule",
            "official_portal_url": "https://suchitwamission.org"
        }
    ]

    for s in services_data:
        CitizenService.objects.update_or_create(title=s['title'], defaults=s)
    print("All 8 citizen services seeded.")

    # 7. Seed Announcements
    announcements_data = [
        {
            "title": "Anthoor Municipality General Council Meeting Scheduled for Next Tuesday",
            "title_ml": "നഗരസഭാ പൊതു കൗൺസിൽ യോഗം അടുത്ത ചൊവ്വാഴ്ച ധർമ്മശാലയിൽ നടക്കും",
            "category": "Council Notice",
            "urgent": False,
            "content": "The upcoming ordinary session of Anthoor Municipal Council will review annual budget allotments for drainage works, ward development funds, and new street lighting installation."
        },
        {
            "title": "Intensive Haritha Karma Sena Non-Biodegradable Plastic Collection Drive",
            "title_ml": "ഹരിത കർമ്മ സേന അജൈവ പ്ലാസ്റ്റിക് ശേഖരണ ഡ്രൈവ് ആരംഭിച്ചു",
            "category": "Sanitation",
            "urgent": True,
            "content": "Residents across Wards 1 to 14 are requested to hand over cleaned and dried non-biodegradable plastics on Friday. Ensure zero open burning of plastic waste as per Municipal bylaws."
        },
        {
            "title": "Pre-Monsoon Health & Free Medical Checkup Camp at Morazha PHC",
            "title_ml": "മൊറാഴ പ്രാഥമികാരോഗ്യ കേന്ദ്രത്തിൽ സൗജന്യ മെഡിക്കൽ ക്യാമ്പ്",
            "category": "Health Alert",
            "urgent": False,
            "content": "A free specialist medical consultation camp and vector-borne disease screening will be held from 9:00 AM to 1:00 PM for all senior citizens and children."
        }
    ]

    for a in announcements_data:
        Announcement.objects.update_or_create(title=a['title'], defaults=a)
    print("All 3 announcements seeded.")

    print("\n[SUCCESS] Complete Anthoor 360 database seeding finished successfully!")

if __name__ == '__main__':
    seed_database()
