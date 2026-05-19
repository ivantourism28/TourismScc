// San Carlos City Tourism Data

// Local asset imports — add more images to src/assets/ and import them here
import mayanapeak from '../assets/mayanapeak1.jpg';
import sipawayisland from '../assets/sipawayisland.jpg';
import peoplespark from '../assets/peoplespark.jpg';
import sancarloscathedral from '../assets/sancarloscathedral.jpg';

export const destinations = [
  {
    id: 1,
    name: "Mayana Peak",
    description: "A stunning peak offering beautiful views and recreational activities",
    location: "Sitio Mayana, Barangay Prosperidad, San Carlos City",
    image: mayanapeak,
    activities: ["Photography", "Hiking", "Picnicking"],
    openingHours: "7:00 AM - 6:00 PM",
    rating: 4.8,
    lat: 10.527668081128299,
    lng: 123.33610043051262
  },
  {
    id: 2,
    name: "Peoples Park",
    description: "A picturesque park perfect for leisure, nature walks, and relaxation",
    location: "V. Gustilo St., Barangay 3, San Carlos City",
    image: peoplespark,
    activities: ["Swimming", "Nature Walk", "Photography"],
    openingHours: "8:00 AM - 5:00 PM",
    rating: 4.6,
    lat: 10.485298486482739,
    lng: 123.4254389097449
  },
  {
    id: 3,
    name: "Sipaway Island",
    description: "A serene island offering authentic local experiences and cultural heritage",
    location: "San Carlos City",
    image: sipawayisland,
    activities: ["Cultural Tour", "Local Food", "Village Walk"],
    openingHours: "24/7",
    rating: 4.4,
    lat: 10.472277404192821,
    lng: 123.44125583068916
  },
  {
    id: 4,
    name: "San Carlos Cathedral",
    description: "Historic cathedral showcasing religious and architectural significance",
    location: "Downtown San Carlos City",
    image: sancarloscathedral,
    activities: ["Religious Tour", "Photography", "History"],
    openingHours: "6:00 AM - 8:00 PM",
    rating: 4.7,
    lat: 10.48133668672113,
    lng: 123.41831792127
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "San Carlos the “Green City of Negros Occidental",
    author: "Philippine Tourism and Statistics",
    date: "2025-04-17",
    category: "Travel Guide",
    excerpt: "Highlights San Carlos City as the “Green City,” emphasizing its eco-tourism efforts, renewable energy initiatives, natural attractions, and sustainable city programs.",
    content: "Nestled between the mountains and the calm waters of the Tañon Strait, the component city of San Carlos in Negros Occidental is one of the Philippines’ best-kept secrets. Known as the “Green City, San Carlos blends natural beauty, sustainable practices, and warm Negrense hospitality, making it a must-visit for travelers seeking a unique and eco-conscious destination. San Carlos is another city with a twin city that is in Pangasinan.",
    image: "https://turistasapilipinas.com/wp-content/uploads/2025/04/San_Carlos_NegOcc-1024x579.jpg",
    featured: true
  },
  {
    id: 2,
    title: "Sipaway Island: Unspoiled Island Life Experience in San Carlos City",
    author: "Mark Maylan",
    date: "2021-05-10",
    category: "Travel Guide",
    excerpt: "Focuses on Sipaway Island, describing its white beaches, peaceful island life, snorkeling spots, and untouched natural beauty.",
    content: "This island hasn’t created that much buzz yet on social media and other online platforms making it less travelled. Its location may have also significantly affected why only few people have gone to this place yet. It is only reachable via 10-15 minutes boat ride from San Carlos City which is around two hours away from Bacolod.",
    image: "https://freedomwall.net/files/2019/03/beach-ermita-sipaway.jpg",
    featured: true
  },
  {
    id: 3,
    title: "San Carlos City Negros Occidental",
    author: "Blogspot Archive",
    date: "2026-05-05",
    category: "Food & Culture",
    excerpt: "Gives a general overview of the city’s history, geography, economy, and notable landmarks, serving as a background reference on San Carlos.",
    content: "San Carlos Negros Occidental, officially the City of San Carlos and often referred to as San Carlos City, is a second class component city in the province of Negros Occidental, Philippines. The town gained city status on July 1, 1960, per Republic Act 2643. According to the 2010 census, it has a population of 129,981 people.",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOniCoOCEhTxXiTcDXBVv_VMsIhip2VSbSAZwxJTlg9q94RrPlkT0nDnUKxNmEdktHEMySG1I-ylelhbqg0OhwzL67QdzbeTDhI8-j5G5jhu1Kctck8pVs0Rb85NQyvUIy4dDkVz-LNTFB/s1090/1142x761xkasadyaan-langyaw-2.jpg.pagespeed.ic.ZNPusTMVM_.jpg",
    featured: false
  },
  {
    id: 4,
    title: "The Potential of San Carlos City, Negros Occidental as a MICE Destination",
    author: "Cybill Ann A. Ramirez, Rizalie N.E. Mibato",
    date: "2020-11-10",
    category: "Food & Culture",
    excerpt: "A practical travel guide featuring where to go, what to do, transportation options, and suggested activities for first-time visitors to the city.",
    content: "The Meetings, Incentives, Conventions, and Exhibitions (MICE) tourism is a niche segment in the tourism market that has abundant potential and is gaining significance worldwide due to the growth of business tourism. In San Carlos City, the MICE industry is not yet fully developed. The assessment of San Carlos City's potential as a MICE destination is still necessary to determine if the city has met all the essential requirements.",
    image: "http://sancarloscity.gov.ph/wp-content/uploads/2024/02/12038325_10204835972800632_3915684846335912139_n.jpg",
    featured: false
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    content: "San Carlos City exceeded all my expectations! The natural beauty combined with warm hospitality made it an unforgettable experience.",
    rating: 5,
    location: "USA"
  },
  {
    id: 2,
    name: "Marco Rodriguez",
    content: "The best vacation I've had in years. Every destination was breathtaking and the local guides were incredibly knowledgeable.",
    rating: 5,
    location: "Spain"
  },
  {
    id: 3,
    name: "Emma Chen",
    content: "A hidden paradise! I loved the mix of adventure and cultural experiences. Can't wait to return!",
    rating: 5,
    location: "Singapore"
  }
];
