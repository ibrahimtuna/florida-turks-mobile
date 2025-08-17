type BaseFeedItems = {
  _id: string;
  createdAt: Date;
  content: string;
  category: string;
  imageUrl?: string;
  location?: string;
};

type SponsoredFeedItems = {
  isSponsored: true;
  ctaButtonText: string;
};

type NonSponsoredFeedItems = {
  isSponsored?: false;
  profilePhotoUrl?: string;
  profileName?: string;
};

export type FeedItem = BaseFeedItems &
  (SponsoredFeedItems | NonSponsoredFeedItems);

export const mockFeedItems: FeedItem[] = [
  // Non-sponsored
  {
    _id: '1',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
    content: "Exploring the hidden gems of Kyoto's old town 🌸",
    category: 'celebrations',
    imageUrl: 'https://picsum.photos/id/1018/600/400',
    profilePhotoUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    profileName: 'Hana Sato',
    location: 'Kyoto, Japan',
    isSponsored: false,
  },
  {
    _id: '2',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5h ago
    content: 'New AI model just dropped — it’s changing the game! 🤖🔥',
    category: 'jobPosts',
    imageUrl: 'https://picsum.photos/id/1021/600/400',
    profilePhotoUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    profileName: 'Alex Chen',
    isSponsored: false,
  },
  {
    _id: '3',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    content: 'Sunday brunch with the best crew 🥐☕',
    category: 'celebrations',
    imageUrl: 'https://picsum.photos/id/1035/600/400',
    profilePhotoUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    profileName: 'Sofia Martinez',
    location: 'Barcelona, Spain',
    isSponsored: false,
  },
  {
    _id: '4',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    content: 'Just launched my first mobile app 🚀',
    category: 'jobPosts',
    imageUrl: 'https://picsum.photos/id/1074/600/400',
    profilePhotoUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
    profileName: 'Olivia Nguyen',
    location: 'Toronto, Canada',
    isSponsored: false,
  },
  {
    _id: '5',
    createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000), // 20h ago
    content: 'Morning hike to clear the mind 🌄',
    category: 'greenCard',
    imageUrl: 'https://picsum.photos/id/1084/600/400',
    profilePhotoUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
    profileName: 'Ethan Park',
    location: 'Seoul, South Korea',
    isSponsored: false,
  },
  {
    _id: '6',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    content: 'Discover the future of electric driving with VoltX ⚡',
    category: 'greenCard',
    isSponsored: true,
    ctaButtonText: 'Learn More',
    imageUrl: 'https://picsum.photos/id/1025/600/400',
    location: 'San Francisco, USA',
  },
  {
    _id: '7',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    content: 'Level up your workflow with TaskMaster Pro ✅',
    category: 'jobPosts',
    isSponsored: true,
    ctaButtonText: 'Get Started',
    imageUrl: 'https://picsum.photos/id/1062/600/400',
  },
  {
    _id: '8',
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12h ago
    content: 'Travel the world for less with FlyAway Deals ✈️',
    category: 'celebrations',
    isSponsored: true,
    ctaButtonText: 'Book Now',
    imageUrl: 'https://picsum.photos/id/110/600/400',
    location: 'Global',
  },
  {
    _id: '9',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    content: 'Boost your career with CodeMaster Online Bootcamp 💻',
    category: 'jobPosts',
    isSponsored: true,
    ctaButtonText: 'Enroll Today',
    imageUrl: 'https://picsum.photos/id/111/600/400',
  },
  {
    _id: '10',
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8h ago
    content: 'GreenLiving Solar Panels — Save money & the planet 🌱',
    category: 'greenCard',
    isSponsored: true,
    ctaButtonText: 'Get a Quote',
    imageUrl: 'https://picsum.photos/id/112/600/400',
    location: 'Los Angeles, USA',
  },
];

export type ISubComment = Omit<Comment, 'subComments'>;

export type Comment = {
  _id: string;
  profilePhotoUrl: string;
  profileName: string;
  content: string;
  likeCount: number;
  createdAt: Date;
  subComments: ISubComment[];
};

export const mockComments: Comment[] = [
  {
    _id: '1',
    profilePhotoUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
    profileName: 'John Doe',
    content: 'This is a great post! Thanks for sharing.',
    likeCount: 12,
    createdAt: new Date('2025-08-12T10:15:00'),
    subComments: [
      {
        _id: '1a',
        profilePhotoUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
        profileName: 'Jane Smith',
        content: 'Totally agree with you, John!',
        likeCount: 4,
        createdAt: new Date('2025-08-12T10:45:00'),
      },
      {
        _id: '1b',
        profilePhotoUrl: 'https://randomuser.me/api/portraits/men/30.jpg',
        profileName: 'Mike Johnson',
        content: 'Same here, loved it!',
        likeCount: 2,
        createdAt: new Date('2025-08-12T11:05:00'),
      },
    ],
  },
  {
    _id: '2',
    profileName: 'Alice Brown',
    profilePhotoUrl: 'https://randomuser.me/api/portraits/women/19.jpg',
    content: 'Interesting perspective, but I have a different opinion.',
    likeCount: 7,
    createdAt: new Date('2025-08-13T09:20:00'),
    subComments: [
      {
        _id: '2a',
        profileName: 'Chris Lee',
        profilePhotoUrl: 'https://randomuser.me/api/portraits/men/23.jpg',
        content: 'I’m curious, what’s your point of view?',
        likeCount: 1,
        createdAt: new Date('2025-08-13T09:40:00'),
      },
    ],
  },
  {
    _id: '2b',
    profilePhotoUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
    profileName: 'Sara Connor',
    content: 'Loved the visuals in this!',
    likeCount: 15,
    createdAt: new Date('2025-08-14T08:30:00'),
    subComments: [],
  },
];
