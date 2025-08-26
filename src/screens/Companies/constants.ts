import { Comment } from '../Home/constants.ts';

export type COMPANY_CREATED_BY = {
  id: string;
  name: string;
  photoUrl: string;
};

export type COMPANY = {
  id: string;
  title: string;
  desc: string;
  coverPhotoUrl: string;
  logoPhotoUrl: string;
  category: string; // construction, restaurant, software it will gonna extend so do not use enum
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  phoneNumber: string;
  email: string;
  website: string;
  commentCount: number;
  comments: Comment[];
  likeCount: number;
  createdBy?: COMPANY_CREATED_BY;
};

export const MOCK_COMPANIES: COMPANY[] = [
  {
    id: 'c1',
    title: 'Skyline Constructions',
    desc: 'Leading residential and commercial construction projects.',
    coverPhotoUrl: 'https://picsum.photos/800/400?1',
    logoPhotoUrl: 'https://picsum.photos/100/100?1',
    category: 'construction',
    location: { lat: 40.7128, lng: -74.006, name: 'New York, USA' },
    phoneNumber: '+1-212-555-1234',
    email: 'info@skylinebuild.com',
    website: 'https://skylinebuild.com',
    commentCount: 2,
    comments: [
      {
        _id: 'cm1',
        profilePhotoUrl: 'https://picsum.photos/50/50?1',
        profileName: 'John Doe',
        content: 'Great service and on-time delivery!',
        likeCount: 5,
        createdAt: new Date(),
        subComments: [],
      },
      {
        _id: 'cm2',
        profilePhotoUrl: 'https://picsum.photos/50/50?2',
        profileName: 'Jane Smith',
        content: 'Very professional team.',
        likeCount: 2,
        createdAt: new Date(),
        subComments: [],
      },
    ],
    likeCount: 10,
  },
  {
    id: 'c2',
    title: 'La Bella Ristorante',
    desc: 'Authentic Italian cuisine with a modern twist.',
    coverPhotoUrl: 'https://picsum.photos/800/400?2',
    logoPhotoUrl: 'https://picsum.photos/100/100?2',
    category: 'restaurant',
    location: { lat: 41.9028, lng: 12.4964, name: 'Rome, Italy' },
    phoneNumber: '+39-06-555-9876',
    email: 'contact@labellaristo.it',
    website: 'https://labellaristo.it',
    commentCount: 1,
    comments: [
      {
        _id: 'cm3',
        profilePhotoUrl: 'https://picsum.photos/50/50?3',
        profileName: 'Marco Rossi',
        content: 'The best pasta in Rome!',
        likeCount: 8,
        createdAt: new Date(),
        subComments: [],
      },
    ],
    likeCount: 23,
    createdBy: {
      id: 'u2',
      name: 'Sofia Loren',
      photoUrl: 'https://picsum.photos/40/40?2',
    },
  },
  {
    id: 'c3',
    title: 'TechNova Software',
    desc: 'Custom enterprise solutions and cloud platforms.',
    coverPhotoUrl: 'https://picsum.photos/800/400?3',
    logoPhotoUrl: 'https://picsum.photos/100/100?3',
    category: 'software',
    location: { lat: 37.7749, lng: -122.4194, name: 'San Francisco, USA' },
    phoneNumber: '+1-415-555-4567',
    email: 'hello@technova.com',
    website: 'https://technova.com',
    commentCount: 0,
    comments: [],
    likeCount: 15,
    createdBy: {
      id: 'u3',
      name: 'Elon Parker',
      photoUrl: 'https://picsum.photos/40/40?3',
    },
  },
  {
    id: 'c4',
    title: 'HealthyLife Clinic',
    desc: 'Comprehensive healthcare services for families.',
    coverPhotoUrl: 'https://picsum.photos/800/400?4',
    logoPhotoUrl: 'https://picsum.photos/100/100?4',
    category: 'healthcare',
    location: { lat: 34.0522, lng: -118.2437, name: 'Los Angeles, USA' },
    phoneNumber: '+1-310-555-1122',
    email: 'support@healthylife.com',
    website: 'https://healthylife.com',
    commentCount: 1,
    comments: [
      {
        _id: 'cm4',
        profilePhotoUrl: 'https://picsum.photos/50/50?4',
        profileName: 'Anna White',
        content: 'Very caring doctors.',
        likeCount: 4,
        createdAt: new Date(),
        subComments: [],
      },
    ],
    likeCount: 12,
    createdBy: {
      id: 'u4',
      name: 'Dr. Emma Wilson',
      photoUrl: 'https://picsum.photos/40/40?4',
    },
  },
  {
    id: 'c5',
    title: 'EcoBuild Solutions',
    desc: 'Sustainable construction and green building services.',
    coverPhotoUrl: 'https://picsum.photos/800/400?5',
    logoPhotoUrl: 'https://picsum.photos/100/100?5',
    category: 'construction',
    location: { lat: 51.5074, lng: -0.1278, name: 'London, UK' },
    phoneNumber: '+44-20-5555-2233',
    email: 'info@ecobuild.co.uk',
    website: 'https://ecobuild.co.uk',
    commentCount: 0,
    comments: [],
    likeCount: 9,
    createdBy: {
      id: 'u5',
      name: 'James Green',
      photoUrl: 'https://picsum.photos/40/40?5',
    },
  },
  {
    id: 'c6',
    title: 'CloudEdge Systems',
    desc: 'AI-powered SaaS solutions for startups.',
    coverPhotoUrl: 'https://picsum.photos/800/400?6',
    logoPhotoUrl: 'https://picsum.photos/100/100?6',
    category: 'software',
    location: { lat: 48.8566, lng: 2.3522, name: 'Paris, France' },
    phoneNumber: '+33-1-555-7788',
    email: 'sales@cloudedge.fr',
    website: 'https://cloudedge.fr',
    commentCount: 2,
    comments: [
      {
        _id: 'cm5',
        profilePhotoUrl: 'https://picsum.photos/50/50?5',
        profileName: 'Pierre Dubois',
        content: 'Amazing cloud performance.',
        likeCount: 6,
        createdAt: new Date(),
        subComments: [],
      },
      {
        _id: 'cm6',
        profilePhotoUrl: 'https://picsum.photos/50/50?6',
        profileName: 'Lucie Martin',
        content: 'Customer support is very responsive.',
        likeCount: 3,
        createdAt: new Date(),
        subComments: [],
      },
    ],
    likeCount: 18,
    createdBy: {
      id: 'u6',
      name: 'Claire Fournier',
      photoUrl: 'https://picsum.photos/40/40?6',
    },
  },
  {
    id: 'c7',
    title: 'OceanBreeze Resort',
    desc: 'Luxury beachside resort with all-inclusive packages.',
    coverPhotoUrl: 'https://picsum.photos/800/400?7',
    logoPhotoUrl: 'https://picsum.photos/100/100?7',
    category: 'hospitality',
    location: { lat: 25.7617, lng: -80.1918, name: 'Miami, USA' },
    phoneNumber: '+1-305-555-8899',
    email: 'booking@oceanbreeze.com',
    website: 'https://oceanbreeze.com',
    commentCount: 1,
    comments: [
      {
        _id: 'cm7',
        profilePhotoUrl: 'https://picsum.photos/50/50?7',
        profileName: 'Carlos Rivera',
        content: 'Fantastic holiday experience!',
        likeCount: 10,
        createdAt: new Date(),
        subComments: [],
      },
    ],
    likeCount: 30,
    createdBy: {
      id: 'u7',
      name: 'Maria Lopez',
      photoUrl: 'https://picsum.photos/40/40?7',
    },
  },
  {
    id: 'c8',
    title: 'FreshMart Organic',
    desc: 'Local organic grocery store with home delivery.',
    coverPhotoUrl: 'https://picsum.photos/800/400?8',
    logoPhotoUrl: 'https://picsum.photos/100/100?8',
    category: 'retail',
    location: { lat: 35.6895, lng: 139.6917, name: 'Tokyo, Japan' },
    phoneNumber: '+81-3-5555-6677',
    email: 'hello@freshmart.jp',
    website: 'https://freshmart.jp',
    commentCount: 0,
    comments: [],
    likeCount: 14,
    createdBy: {
      id: 'u8',
      name: 'Takashi Ito',
      photoUrl: 'https://picsum.photos/40/40?8',
    },
  },
  {
    id: 'c9',
    title: 'Zen Spa & Wellness',
    desc: 'Relaxation and wellness therapies in a serene environment.',
    coverPhotoUrl: 'https://picsum.photos/800/400?9',
    logoPhotoUrl: 'https://picsum.photos/100/100?9',
    category: 'wellness',
    location: { lat: 52.52, lng: 13.405, name: 'Berlin, Germany' },
    phoneNumber: '+49-30-555-9900',
    email: 'relax@zenspa.de',
    website: 'https://zenspa.de',
    commentCount: 1,
    comments: [
      {
        _id: 'cm8',
        profilePhotoUrl: 'https://picsum.photos/50/50?9',
        profileName: 'Sabine Keller',
        content: "One of the best spa experiences I've had.",
        likeCount: 7,
        createdAt: new Date(),
        subComments: [],
      },
    ],
    likeCount: 20,
    createdBy: {
      id: 'u9',
      name: 'Karl Schmidt',
      photoUrl: 'https://picsum.photos/40/40?9',
    },
  },
  {
    id: 'c10',
    title: 'Urban Eats Café',
    desc: 'Trendy café serving artisanal coffee and brunch specials.',
    coverPhotoUrl: 'https://picsum.photos/800/400?10',
    logoPhotoUrl: 'https://picsum.photos/100/100?10',
    category: 'restaurant',
    location: { lat: 43.6532, lng: -79.3832, name: 'Toronto, Canada' },
    phoneNumber: '+1-416-555-3344',
    email: 'contact@urbaneats.ca',
    website: 'https://urbaneats.ca',
    commentCount: 0,
    comments: [],
    likeCount: 11,
    createdBy: {
      id: 'u10',
      name: 'Olivia Brown',
      photoUrl: 'https://picsum.photos/40/40?10',
    },
  },
];
