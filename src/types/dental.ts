export interface DoctorInfo {
  id: string;
  name: string;
  title: string;
  credentials: string;
  bio: string;
  education: string[];
  accreditations: string[];
  image: string;
  role: string;
}

export interface ServiceDetail {
  id: string;
  category: 'cosmetic' | 'implants' | 'ortho' | 'general' | 'emergency';
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  technology: string;
  duration: string;
  recommendedFor: string;
  priceGuide?: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  source: 'Birdeye' | 'Google Reviews';
  treatment: string;
  quote: string;
  verified: boolean;
}

export interface OfficeLocation {
  id: string;
  name: string;
  area: string;
  address: string;
  cityStateZip: string;
  phone: string;
  secondaryPhone?: string;
  email: string;
  hours: {
    days: string;
    hours: string;
  }[];
  mapQuery: string;
  parkingNote: string;
}

export interface BeforeAfterCase {
  id: string;
  title: string;
  treatment: string;
  doctor: string;
  timeframe: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  tags: string[];
}
