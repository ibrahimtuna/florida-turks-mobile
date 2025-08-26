export type MESSAGE = {
  id: string;
  message: string;
  photoUrl?: string;
  senderId: string;
  receiverId: string;
};

export type CHAT_ITEM = {
  profilePhotoUrl: string;
  name: string;
  lastMessage: string;
  lastMessageDate: Date;
  unreadCount: number;
  messages: MESSAGE[];
};

export const MOCK_CHAT_ITEMS: CHAT_ITEM[] = [
  {
    profilePhotoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
    lastMessage: 'Hey, are we still on for tomorrow?',
    lastMessageDate: new Date('2025-08-20T14:12:00'),
    unreadCount: 2,
    messages: [
      {
        id: 'm1',
        message: 'Hey, are we still on for tomorrow?',
        senderId: 'u1',
        receiverId: 'me',
      },
      {
        id: 'm2',
        message: 'Yes, see you at 10am!',
        senderId: 'me',
        receiverId: 'u1',
      },
    ],
  },
  {
    profilePhotoUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Emily Johnson',
    lastMessage: 'Can you send me the report?',
    lastMessageDate: new Date('2025-08-21T09:45:00'),
    unreadCount: 0,
    messages: [
      {
        id: 'm3',
        message: 'Can you send me the report?',
        senderId: 'u2',
        receiverId: 'me',
      },
    ],
  },
  {
    profilePhotoUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'Michael Brown',
    lastMessage: 'Got it, thanks!',
    lastMessageDate: new Date('2025-08-22T18:30:00'),
    unreadCount: 1,
    messages: [
      {
        id: 'm4',
        message: 'Here is the file you asked for.',
        senderId: 'me',
        receiverId: 'u3',
      },
      {
        id: 'm5',
        message: 'Got it, thanks!',
        senderId: 'u3',
        receiverId: 'me',
      },
    ],
  },
  {
    profilePhotoUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    name: 'Sophia Miller',
    lastMessage: 'Where are you now?',
    lastMessageDate: new Date('2025-08-24T12:15:00'),
    unreadCount: 3,
    messages: [
      {
        id: 'm6',
        message: 'Where are you now?',
        senderId: 'u4',
        receiverId: 'me',
      },
    ],
  },
  {
    profilePhotoUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    name: 'David Wilson',
    lastMessage: 'See you soon!',
    lastMessageDate: new Date('2025-08-24T20:10:00'),
    unreadCount: 0,
    messages: [
      {
        id: 'm7',
        message: 'On my way.',
        senderId: 'u5',
        receiverId: 'me',
      },
      {
        id: 'm8',
        message: 'See you soon!',
        senderId: 'me',
        receiverId: 'u5',
      },
    ],
  },
  {
    profilePhotoUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
    name: 'Olivia Davis',
    lastMessage: 'Let’s grab coffee sometime ☕',
    lastMessageDate: new Date('2025-08-25T11:00:00'),
    unreadCount: 4,
    messages: [
      {
        id: 'm9',
        message: 'Let’s grab coffee sometime ☕',
        senderId: 'u6',
        receiverId: 'me',
      },
    ],
  },
  {
    profilePhotoUrl: 'https://randomuser.me/api/portraits/men/7.jpg',
    name: 'James Taylor',
    lastMessage: 'That’s awesome!',
    lastMessageDate: new Date('2025-08-25T15:22:00'),
    unreadCount: 0,
    messages: [
      {
        id: 'm10',
        message: 'Just finished my project 🎉',
        senderId: 'me',
        receiverId: 'u7',
      },
      {
        id: 'm11',
        message: 'That’s awesome!',
        senderId: 'u7',
        receiverId: 'me',
      },
    ],
  },
  {
    profilePhotoUrl: 'https://randomuser.me/api/portraits/women/8.jpg',
    name: 'Isabella Martinez',
    lastMessage: 'Sure, no problem.',
    lastMessageDate: new Date('2025-08-26T08:30:00'),
    unreadCount: 1,
    messages: [
      {
        id: 'm12',
        message: 'Can you help me with this task?',
        senderId: 'me',
        receiverId: 'u8',
      },
      {
        id: 'm13',
        message: 'Sure, no problem.',
        senderId: 'u8',
        receiverId: 'me',
      },
    ],
  },
  {
    profilePhotoUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
    name: 'William Anderson',
    lastMessage: 'Talk later 👍',
    lastMessageDate: new Date('2025-08-26T10:50:00'),
    unreadCount: 0,
    messages: [
      {
        id: 'm14',
        message: 'Talk later 👍',
        senderId: 'u9',
        receiverId: 'me',
      },
    ],
  },
  {
    profilePhotoUrl: 'https://randomuser.me/api/portraits/women/10.jpg',
    name: 'Mia Thompson',
    lastMessage: 'Goodnight 🌙',
    lastMessageDate: new Date('2025-08-26T23:00:00'),
    unreadCount: 5,
    messages: [
      {
        id: 'm15',
        message: 'Goodnight 🌙',
        senderId: 'u10',
        receiverId: 'me',
      },
    ],
  },
];
