export type CATEGORY_ITEM = {
  _id: string;
  turkishTitle: string;
  englishTitle: string;
};

type LOCATION = {
  addressId: string;
  coords: {
    coordinates: number[];
  };
  displayName: string;
  formattedAddress: string;
};

export type COMPANY = {
  _id: string;
  categoryId: string;
  comments: COMMENT[];
  coverPhotoKey: string;
  desc: string;
  email: string;
  likeCount: number;
  location: LOCATION;
  logoKey: string;
  name: string;
  phoneNumber: string;
  website: string;
  createdAt: string;
  isLiked: boolean;
  createdBy: {
    _id: string;
    name: string;
    surname: string;
    photoKey: string;
  };
};

export type EVENT_PARTICIPANT = {
  _id: string;
  name: string;
  surname: string;
  photoKey: string;
};

export type EVENT = {
  _id: string;
  categoryId: string;
  createdAt: string;
  createdBy: { _id: string; name: string; photoKey: string; surname: string };
  date: string;
  desc: string;
  fee: number;
  location: LOCATION;
  maxParticipants: number;
  organizer: string;
  participants: EVENT_PARTICIPANT[];
  photoKey: string;
  showProfile: boolean;
  title: string;
  updatedAt: string;
  updatedBy: string;
};

export type SUB_COMMENT = {
  _id: string;
  context: string;
  isLiked: boolean;
  likeCount: number;
  createdBy: {
    _id: string;
    name: string;
    surname: string;
    photoKey: string;
  };
  createdAt: string;
};

export type COMMENT = {
  _id: string;
  context: string;
  isLiked: boolean;
  likeCount: number;
  createdBy: {
    _id: string;
    name: string;
    surname: string;
    photoKey: string;
  };
  createdAt: string;
  subComments: SUB_COMMENT[];
};

type BaseFeed = {
  _id: string;
  context: string;
  comments: COMMENT[];
  createdAt: string;
  createdBy: { _id: string; name: string; photoKey: string; surname: string };
  feedCategoryId: string;
  likeCount: number;
  isLiked: boolean;
  location: LOCATION;
  updatedAt: string;
  photoKey?: string;
};

export type FEED =
  | (BaseFeed & { kind: 'feed' })
  | (BaseFeed & { kind: 'ad'; ctaButtonText: string });

export type USER = {
  _id: string;
  email: string;
  name: string;
  surname: string;
  bio: string;
  phoneNumber: string;
  location: LOCATION;
  photoKey: string;
  rewards: number;
  shareContact: boolean;
  status: 0 | 1 | 2;
  createdAt: string;
};

export type GET_PROFILE = {
  __id: string;
  name: string;
  surname: string;
  createdAt: string;
  location: LOCATION;
  bio?: string;
  email?: string;
  phoneNumber?: string;
};

export type MESSAGE = {
  _id: string;
  content: string;
  createdAt: string;
  receiverId: string;
  senderId: string;
  status: 'sent' | 'read';
};

export type INBOX = {
  userId: string;
  user: {
    _id: string;
    name: string;
    surname: string;
    photoKey: string;
  };
  unreadCount: number;
  messages: MESSAGE[];
};
