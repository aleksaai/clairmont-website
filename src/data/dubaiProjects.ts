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
    images: [tivanno, tivanno2],
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
    images: [dubaisHills, dubaisHills2],
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
    images: [selora, selora2],
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
    images: [khalidBinSultan, khalidBinSultan2],
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
    images: [cdsWave, cdsWave2],
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
    images: [knightsbridge, knightsbridge2],
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
    images: [oneCrescentPalm, oneCrescentPalm2],
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
    images: [livelResidenza, livelResidenza2],
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
    images: [tresora, tresora2],
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
    images: [theBrooks, theBrooks2],
    finishing: "Modern finishing with premium materials.",
    kitchen: "Fully equipped kitchen",
  },
];
