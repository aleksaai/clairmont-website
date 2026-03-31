import tivanno from "@/assets/projects/dubai/tivanno.jpg";
import dubaisHills from "@/assets/projects/dubai/dubais-hills.jpg";
import selora from "@/assets/projects/dubai/selora.jpg";
import khalidBinSultan from "@/assets/projects/dubai/khalid-bin-sultan.jpg";
import cdsWave from "@/assets/projects/dubai/cds-wave.jpg";
import knightsbridge from "@/assets/projects/dubai/knightsbridge.jpg";
import oneCrescentPalm from "@/assets/projects/dubai/one-crescent-palm.jpg";
import livelResidenza from "@/assets/projects/dubai/livel-residenza.jpg";
import tresora from "@/assets/projects/dubai/tresora.jpg";
import theBrooks from "@/assets/projects/dubai/the-brooks.jpg";
import bugattiResidences from "@/assets/projects/dubai/bugatti-residences.jpg";
import theEditD3 from "@/assets/projects/dubai/the-edit-d3.jpg";
import damacBelair from "@/assets/projects/dubai/damac-belair.jpg";
import nexara from "@/assets/projects/dubai/nexara.jpg";
import terraGolf from "@/assets/projects/dubai/terra-golf.jpg";
import manchesterCityYas from "@/assets/projects/dubai/manchester-city-yas.jpg";
import sobhaSeahaven from "@/assets/projects/dubai/sobha-seahaven.jpg";

export interface UnitType {
  type: string;
  bedrooms: string;
  area: string;
  priceFrom: string;
}

export interface DubaiProject {
  id: string;
  name: string;
  developer: string;
  district: string;
  handover: string;
  description: string;
  units: UnitType[];
  images: string[];
  finishing: string;
  kitchen: string;
}

export const dubaiProjects: DubaiProject[] = [
  {
    id: "tivanno",
    name: "Tivanno",
    developer: "AYS Developers",
    district: "Dubai Islands, Dubai",
    handover: "Q1 2027",
    description: "Tivanno 1 is a prestigious residential development by AYS Developments, prominently situated in the Dubai Island area. This 11-story complex features a mix of luxurious 1 and 2-bedroom units, exclusive 3-bedroom duplexes, and 4-bedroom apartments. Each residence is equipped with top-tier amenities, including frameless internal doors, a balcony with a built-in customized jacuzzi, and smart home technology.",
    units: [
      { type: "Apartments", bedrooms: "1 Bedroom", area: "967 – 1,047 sqft", priceFrom: "1,567,029 AED" },
      { type: "Apartments", bedrooms: "2 Bedrooms", area: "1,377 – 1,440 sqft", priceFrom: "2,231,834 AED" },
      { type: "Duplex", bedrooms: "3 Bedrooms", area: "3,063 sqft", priceFrom: "44,963,812 AED" },
    ],
    images: [tivanno],
    finishing: "Modern finishing with high-quality materials. Full smart home Alexa system.",
    kitchen: "Bertolotto, Scavolini, Ceracasa, Villeroy & Boch, Schindler",
  },
  {
    id: "dubais-hills-fairways-69",
    name: "Dubai's Hills Fairways 69",
    developer: "Wellington Developments",
    district: "Dubai Hills, Dubai",
    handover: "On request",
    description: "Dubai's Hills Fairways 69 is an exclusive residential development that redefines luxury living with its contemporary design and refined aesthetics. The project features an exquisite collection of villas, thoughtfully designed to offer spacious layouts, floor-to-ceiling windows, and high-end finishes. Smart home technology ensures convenience and efficiency throughout each residence.",
    units: [
      { type: "Villa", bedrooms: "7 Bedrooms", area: "16,286 sqft", priceFrom: "17,699,115 USD" },
    ],
    images: [dubaisHills],
    finishing: "Modern finishing with high-quality materials and smart home system.",
    kitchen: "Fully equipped kitchen",
  },
  {
    id: "selora-residences",
    name: "Selora Residences",
    developer: "Swank Development",
    district: "MBR District 11 (Meydan South), Dubai",
    handover: "Q2 2027",
    description: "Selora Residences is a boutique collection of 30 luxurious villas nestled in MBR City. Designed as a sanctuary inspired by nature — earth, air, water, and light — Selora offers a holistic living experience. The villas include 4, 5, and 6-bedroom residences with private pools, landscaped gardens, and elevators.",
    units: [
      { type: "Villa", bedrooms: "4 Bedrooms", area: "4,667 sqft", priceFrom: "2,545,949 USD" },
      { type: "Villa", bedrooms: "5 Bedrooms", area: "5,543 sqft", priceFrom: "3,403,675 USD" },
      { type: "Villa", bedrooms: "6 Bedrooms", area: "8,800 sqft", priceFrom: "5,137,281 USD" },
    ],
    images: [selora],
    finishing: "Modern finishing with high-quality materials.",
    kitchen: "Equipped kitchens with appliances",
  },
  {
    id: "khalid-bin-sultan-city",
    name: "Khalid Bin Sultan City",
    developer: "BEEAH Group",
    district: "Al Rowdat Suburb, Sharjah",
    handover: "On request",
    description: "Khalid Bin Sultan City is a visionary master community in Sharjah, developed by BEEAH Group and designed by Zaha Hadid Architects. The project offers 2, 3, and 4 bedroom townhouses along with 4 and 5 bedroom villas, reflecting contemporary architecture and harmony with nature. The entire development is built around smart-energy infrastructure and designed to be Net Zero–ready.",
    units: [
      { type: "Townhouse", bedrooms: "2 Bedrooms", area: "2,253 sqft", priceFrom: "1,850,000 AED" },
      { type: "Townhouse", bedrooms: "3 Bedrooms", area: "2,535 – 2,693 sqft", priceFrom: "2,300,000 AED" },
      { type: "Townhouse", bedrooms: "4 Bedrooms", area: "3,240 – 3,316 sqft", priceFrom: "2,900,000 AED" },
      { type: "Villa", bedrooms: "4 Bedrooms", area: "3,855 sqft", priceFrom: "4,450,000 AED" },
      { type: "Villa", bedrooms: "5 Bedrooms", area: "5,476 – 5,480 sqft", priceFrom: "5,531,000 AED" },
    ],
    images: [khalidBinSultan],
    finishing: "Modern finishing with high-quality materials.",
    kitchen: "Equipped kitchens",
  },
  {
    id: "cds-wave",
    name: "CDS Wave",
    developer: "CDS Developments",
    district: "Dubai Islands, Dubai",
    handover: "Q4 2027",
    description: "CDS Wave by CDS Developments is a striking landmark that embodies elegance, comfort, and modern artistry. The project offers a refined collection of 1, 2, and 3-bedroom apartments, 3-bedroom duplexes, and 3-bedroom penthouses. Residents enjoy exclusive amenities including a gym, spa, rooftop pool and bar.",
    units: [
      { type: "Apartments", bedrooms: "1 Bedroom", area: "712 sqft", priceFrom: "544,588 USD" },
      { type: "Apartments", bedrooms: "2 Bedrooms", area: "1,498 sqft", priceFrom: "On request" },
      { type: "Apartments", bedrooms: "3 Bedrooms", area: "2,055 sqft", priceFrom: "On request" },
      { type: "Duplex", bedrooms: "3 Bedrooms", area: "3,561 sqft", priceFrom: "On request" },
      { type: "Penthouse", bedrooms: "3 Bedrooms", area: "2,735 sqft", priceFrom: "On request" },
    ],
    images: [cdsWave],
    finishing: "High-end finishes with contemporary design.",
    kitchen: "Fully equipped kitchen",
  },
  {
    id: "knightsbridge",
    name: "Knightsbridge",
    developer: "Leos",
    district: "MBR District 11 (Meydan South), Dubai",
    handover: "Q2 2027",
    description: "Knightsbridge represents the pinnacle of refined living, where modern sophistication merges with timeless elegance. This exclusive community offers spacious 4-bedroom townhouses and luxurious 5 and 6-bedroom villas. The project includes solar panels, energy-efficient lighting, UV-proof double glazing, smart home systems, and EV charging facilities.",
    units: [
      { type: "Townhouse", bedrooms: "4 Bedrooms", area: "3,971 sqft", priceFrom: "2,162,571 USD" },
      { type: "Villa", bedrooms: "5 Bedrooms", area: "6,004 sqft", priceFrom: "3,760,703 USD" },
      { type: "Villa", bedrooms: "6 Bedrooms", area: "9,006 – 9,007 sqft", priceFrom: "5,886,002 USD" },
    ],
    images: [knightsbridge],
    finishing: "Modern finishing with high-quality materials.",
    kitchen: "Fully equipped kitchen with Miele appliances",
  },
  {
    id: "one-crescent-palm",
    name: "One Crescent Palm",
    developer: "AHS Properties",
    district: "Palm Jumeirah, Dubai",
    handover: "Q2 2026",
    description: "Nestled on the iconic Palm Jumeirah, One Crescent is an ultra-luxury 9-storey residential development by AHS Properties. The exclusive complex boasts a wave-like integrated architecture with individual residential swimming pools and green pockets on each curve of its stunning facade.",
    units: [
      { type: "Penthouse", bedrooms: "6 Bedrooms", area: "22,600 sqft", priceFrom: "50,374,404 USD" },
    ],
    images: [oneCrescentPalm],
    finishing: "High quality materials with two kinds of kitchens, outdoor dining, teppanyaki station, private elevator.",
    kitchen: "Fully-equipped kitchen",
  },
  {
    id: "livel-residenza",
    name: "Livel Residenza",
    developer: "Vantage Developments",
    district: "JVC (Jumeirah Village Circle), Dubai",
    handover: "Q4 2026",
    description: "Welcome to Livel, a prestigious residential project in the heart of JVC. Interior design crafted by Gandolfi e Mura Architetti Associati from Milan. Communal facilities include immediate access to the Italian garden, cinema and paw park. The building exemplifies commitment to sustainability and innovative design.",
    units: [
      { type: "Apartments", bedrooms: "Studio", area: "453 – 489 sqft", priceFrom: "213,880 USD" },
      { type: "Apartments", bedrooms: "1 Bedroom", area: "757 – 768 sqft", priceFrom: "312,292 USD" },
      { type: "Apartments", bedrooms: "2 Bedrooms", area: "902 – 1,246 sqft", priceFrom: "379,152 USD" },
    ],
    images: [livelResidenza],
    finishing: "Subtle design and elegant finishes with premium, contemporary homes.",
    kitchen: "Equipped kitchen",
  },
  {
    id: "tresora-by-wadan",
    name: "Tresora by Wadan",
    developer: "WADAN Developments",
    district: "JVC (Jumeirah Village Circle), Dubai",
    handover: "On request",
    description: "Tresora is a contemporary mixed-use development in JVC, combining residential living, workspaces, and everyday conveniences within a single address. Clean lines, layered balconies, and integrated greenery contribute to a calm yet urban presence within one of Dubai's most liveable communities.",
    units: [
      { type: "Apartments", bedrooms: "Studio", area: "420 sqft", priceFrom: "182,437 USD" },
      { type: "Apartments", bedrooms: "1 Bedroom", area: "670 sqft", priceFrom: "258,679 USD" },
      { type: "Apartments", bedrooms: "2 Bedrooms", area: "1,350 sqft", priceFrom: "476,514 USD" },
    ],
    images: [tresora],
    finishing: "Modern finishing with contemporary design.",
    kitchen: "Equipped kitchen",
  },
  {
    id: "the-brooks-sobha-sanctuary",
    name: "The Brooks at Sobha Sanctuary",
    developer: "Sobha",
    district: "Sobha Sanctuary, Dubai",
    handover: "On request",
    description: "The Brooks at Sobha Sanctuary is a refined residential enclave where nature, wellness, and community come together in perfect balance. Designed around the idea of everyday ease with calm landscapes, flowing water elements. Garden and courtyard villas feature smart-home readiness, generous layouts, private terraces, and seamless indoor-outdoor living.",
    units: [
      { type: "Villa", bedrooms: "4 Bedrooms", area: "1,731 – 2,837 sqft", priceFrom: "942,298 EUR" },
      { type: "Villa", bedrooms: "5 Bedrooms", area: "3,133 – 3,239 sqft", priceFrom: "1,718,975 EUR" },
    ],
    images: [theBrooks],
    finishing: "Modern finishing with premium materials.",
    kitchen: "Fully equipped kitchen",
  },
  {
    id: "bugatti-residences-binghatti",
    name: "Bugatti Residences by Binghatti",
    developer: "Binghatti",
    district: "Business Bay, Dubai",
    handover: "Q1 2026",
    description: "The birth of an icon – the hyper tower is poised to become a landmark of architectural prowess, derived from the Bugatti and Binghatti DNA. Inspired by the world's most eminent structural masterpieces, the facade is characterized by fluid lines and subtle contours reminiscent of the French Riviera – a resort-inspired lifestyle in the heart of the metropolis.",
    units: [
      { type: "Apartments", bedrooms: "2 Bedrooms", area: "2,028 – 5,392 sqft", priceFrom: "5,282,505 USD" },
      { type: "Apartments", bedrooms: "3 Bedrooms", area: "3,789 – 6,928 sqft", priceFrom: "9,965,963 USD" },
      { type: "Apartments", bedrooms: "4 Bedrooms", area: "6,689 – 6,705 sqft", priceFrom: "12,307,692 USD" },
      { type: "Penthouse", bedrooms: "5 Bedrooms", area: "14,304 sqft", priceFrom: "42,205,582 USD" },
      { type: "Penthouse", bedrooms: "8 Bedrooms", area: "20,449 sqft", priceFrom: "81,688,223 USD" },
    ],
    images: [bugattiResidences],
    finishing: "Exquisite moulding and sleek contemporary fixtures. Every inch exudes quality, refinement and excellence.",
    kitchen: "Fully equipped kitchen",
  },
  {
    id: "the-edit-at-d3",
    name: "The Edit at d3",
    developer: "Meraas",
    district: "Dubai Design District (d3), Dubai",
    handover: "On request",
    description: "The Edit at d3 by Meraas stands as an architectural landmark within Dubai Design District — three sculptural towers rising in elegant harmony along the waterfront, with flowing balconies, soft curves, and lush sky gardens. Residents enjoy resort-style pools, sky gardens, gym, yoga studio, cinema, co-working spaces, padel courts and more.",
    units: [
      { type: "Apartments", bedrooms: "1 Bedroom", area: "873 – 940 sqft", priceFrom: "639,074 USD" },
      { type: "Apartments", bedrooms: "2 Bedrooms", area: "1,266 – 1,356 sqft", priceFrom: "1,128,931 USD" },
      { type: "Apartments", bedrooms: "3 Bedrooms", area: "2,127 – 2,267 sqft", priceFrom: "2,101,565 USD" },
      { type: "Apartments", bedrooms: "4 Bedrooms", area: "2,772 – 2,975 sqft", priceFrom: "2,927,978 USD" },
    ],
    images: [theEditD3],
    finishing: "High-quality natural materials, engineered stone countertops, custom joinery.",
    kitchen: "Premium fittings and cabinetry, fully equipped",
  },
  {
    id: "damac-hills-belair-phase-2",
    name: "Damac Hills – Belair Phase 2",
    developer: "DAMAC",
    district: "Damac Hills, Dubai",
    handover: "Q4 2024",
    description: "Surrounded by championship golf course greens and nestled within Trump Estates, a private gated community, step into sumptuous living at the BelAir at The Trump Estates – Phase 2. With sprawling mansions for the discerning few, the best of Cali living meets lush DAMAC Hills luxury.",
    units: [
      { type: "Villa", bedrooms: "8 Bedrooms", area: "9,039 – 9,187 sqft", priceFrom: "4,643,430 USD" },
    ],
    images: [damacBelair],
    finishing: "High quality materials.",
    kitchen: "Fully-equipped kitchen",
  },
  {
    id: "nexara-by-7th-key",
    name: "Nexara by 7th Key",
    developer: "7th Key Development",
    district: "JVC (Jumeirah Village Circle), Dubai",
    handover: "Q4 2027",
    description: "Nexara by 7th Key is a contemporary residential development with a minimalist design language defined by clean lines, strong geometry, and natural light. Surrounded by landscaped areas and golf course views, Nexara offers a lifestyle where modern aesthetics blend seamlessly with openness and serenity.",
    units: [
      { type: "Apartments", bedrooms: "1 Bedroom", area: "654 – 761 sqft", priceFrom: "292,443 USD" },
      { type: "Apartments", bedrooms: "2 Bedrooms", area: "1,126 – 1,595 sqft", priceFrom: "518,992 USD" },
      { type: "Apartments", bedrooms: "3 Bedrooms", area: "1,878 – 2,017 sqft", priceFrom: "896,936 USD" },
    ],
    images: [nexara],
    finishing: "Modern finishes with high-quality materials, clean and timeless aesthetic.",
    kitchen: "Fully equipped with integrated appliances",
  },
  {
    id: "terra-golf-collection-phase-2",
    name: "Terra Golf Collection Phase 2",
    developer: "Taraf Holding",
    district: "Jumeirah Golf Estates, Dubai",
    handover: "On request",
    description: "Terra Golf Collection Phase 2 by Taraf redefines modern luxury within the lush landscapes of Jumeirah Golf Estates. This limited collection of golf-facing townhouses and villas reflects a refined architectural vision where design, functionality, and nature exist in perfect harmony.",
    units: [
      { type: "Townhouse", bedrooms: "6 Bedrooms", area: "4,772 – 4,836 sqft", priceFrom: "2,887,678 USD" },
      { type: "Villa", bedrooms: "6 Bedrooms", area: "6,921 – 8,699 sqft", priceFrom: "4,214,295 USD" },
    ],
    images: [terraGolf],
    finishing: "Modern finishing using high quality materials.",
    kitchen: "Equipped kitchens",
  },
  {
    id: "manchester-city-yas-residences",
    name: "Manchester City Yas Residences by Ohana",
    developer: "Ohana Developments",
    district: "Yas Island, Abu Dhabi",
    handover: "On request",
    description: "A landmark football-branded waterfront community on Yas Island, created in partnership with Manchester City. The club's philosophy, culture and lifestyle are embedded into the DNA of the project — architecture, public spaces, and amenities reflect a balance between elite performance and refined lifestyle.",
    units: [
      { type: "Apartments", bedrooms: "1 Bedroom", area: "807 sqft", priceFrom: "1,700,000 AED" },
      { type: "Apartments", bedrooms: "2 Bedrooms", area: "1,291 sqft", priceFrom: "2,700,000 AED" },
      { type: "Apartments", bedrooms: "3 Bedrooms", area: "1,883 sqft", priceFrom: "4,000,000 AED" },
      { type: "Villa", bedrooms: "4 Bedrooms", area: "2,949 – 3,229 sqft", priceFrom: "5,900,000 AED" },
      { type: "Penthouse", bedrooms: "4 Bedrooms", area: "4,251 sqft", priceFrom: "9,000,000 AED" },
      { type: "Villa", bedrooms: "5 Bedrooms", area: "4,822 sqft", priceFrom: "9,300,000 AED" },
    ],
    images: [manchesterCityYas],
    finishing: "Premium materials with contemporary design.",
    kitchen: "Fully equipped kitchen",
  },
  {
    id: "sobha-seahaven",
    name: "Sobha Seahaven",
    developer: "Sobha",
    district: "Dubai Harbour, Dubai",
    handover: "Q3 2026",
    description: "Sobha Seahaven is a luxury residential development offering 1 to 6-bedroom apartments at Dubai Harbour. Three towers collection with the highest rising 67 storeys, featuring awe-inspiring views of Dubai. Smart home automation, porcelain tiles, pre-engineered timber flooring, and floor-to-ceiling glass curtain walls.",
    units: [
      { type: "Apartments", bedrooms: "1 Bedroom", area: "846 – 1,243 sqft", priceFrom: "970,031 USD" },
      { type: "Apartments", bedrooms: "2 Bedrooms", area: "1,716 sqft", priceFrom: "1,775,782 USD" },
      { type: "Apartments", bedrooms: "3 Bedrooms", area: "3,563 – 4,186 sqft", priceFrom: "4,797,992 USD" },
      { type: "Apartments", bedrooms: "4 Bedrooms", area: "4,043 – 7,284 sqft", priceFrom: "6,056,050 USD" },
      { type: "Penthouse", bedrooms: "4 Bedrooms", area: "4,053 – 4,679 sqft", priceFrom: "6,070,068 USD" },
      { type: "Apartments", bedrooms: "5 Bedrooms", area: "7,814 – 8,086 sqft", priceFrom: "13,938,308 USD" },
      { type: "Apartments", bedrooms: "6 Bedrooms", area: "16,204 – 24,398 sqft", priceFrom: "28,680,955 USD" },
    ],
    images: [sobhaSeahaven],
    finishing: "Porcelain tiles, pre-engineered timber flooring, marble & solid surface countertops, veneer doors, smart home automation.",
    kitchen: "Fully-fitted with Miele fittings, marble and solid surface countertops",
  },
];
