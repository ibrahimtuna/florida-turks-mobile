export type EVENT_PARTICIPANT = {
  id: string;
  name: string;
  photoUrl: string;
};

export type EVENT = {
  id: string;
  title: string;
  desc: string;
  coverPhotoUrl: string;
  category: string; // cultural, business, social it will gonna extend so do not use enum
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  maxParticipants: number;
  date: Date;
  fee: number; // if 0 its free
  totalParticipants: number;
  participants: EVENT_PARTICIPANT[];
  organizer: {
    name: string;
    profile: {
      id: string;
      profileUrl: string;
      name: string;
    };
  };
};

export const MOCK_EVENTS: EVENT[] = [
  {
    id: 'evt_001',
    title: 'Beyoğlu Street Photography Walk',
    desc: 'Golden Hour photowalk through İstiklal Caddesi and Galata Tower area.',
    coverPhotoUrl:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    category: 'cultural',
    location: { lat: 41.0329, lng: 28.9768, name: 'Beyoğlu, İstanbul' },
    maxParticipants: 30,
    date: new Date('2025-09-07T18:00:00+03:00'),
    fee: 0,
    participants: [
      {
        id: 'usr_001',
        name: 'Ava Johnson',
        photoUrl: 'https://randomuser.me/api/portraits/women/12.jpg',
      },
      {
        id: 'usr_002',
        name: 'Mehmet Demir',
        photoUrl: 'https://randomuser.me/api/portraits/men/22.jpg',
      },
    ],
    totalParticipants: 2,
    organizer: {
      name: 'İstanbul Photography Club',
      profile: {
        id: 'org_001',
        profileUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
        name: 'Kerem Yılmaz',
      },
    },
  },
  {
    id: 'evt_002',
    title: 'SaaS Pricing Roundtable',
    desc: 'Operator-focused chat on usage-based vs seat-based pricing.',
    coverPhotoUrl:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
    category: 'business',
    location: { lat: 37.7879, lng: -122.4009, name: 'FiDi, San Francisco' },
    maxParticipants: 20,
    date: new Date('2025-09-10T09:30:00-07:00'),
    fee: 25,
    participants: [
      {
        id: 'usr_003',
        name: 'Liam Carter',
        photoUrl: 'https://randomuser.me/api/portraits/men/41.jpg',
      },
      {
        id: 'usr_004',
        name: 'Emily Brown',
        photoUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
      },
    ],
    totalParticipants: 2,
    organizer: {
      name: 'Bay Area SaaS Founders',
      profile: {
        id: 'org_002',
        profileUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
        name: 'Sarah Johnson',
      },
    },
  },
  {
    id: 'evt_003',
    title: 'Thames River Sunset Picnic',
    desc: 'Bring a blanket; we’ll meet near Battersea Park pergola.',
    coverPhotoUrl:
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad',
    category: 'social',
    location: { lat: 51.4775, lng: -0.1596, name: 'Battersea Park, London' },
    maxParticipants: 40,
    date: new Date('2025-09-05T19:00:00+01:00'),
    fee: 0,
    participants: [
      {
        id: 'usr_005',
        name: 'Oliver Smith',
        photoUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
      },
      {
        id: 'usr_006',
        name: 'Isla Thompson',
        photoUrl: 'https://randomuser.me/api/portraits/women/74.jpg',
      },
    ],
    totalParticipants: 2,
    organizer: {
      name: 'London Social Club',
      profile: {
        id: 'org_003',
        profileUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
        name: 'George Taylor',
      },
    },
  },
];
