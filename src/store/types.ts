export type CATEGORY_ITEM = {
  _id: string;
  turkishTitle: string;
  englishTitle: string;
};

export type COMPANY = {
  _id: string;
  categoryId: string;
  comments: [];
  coverPhotoKey: string;
  desc: string;
  email: string;
  likeCount: number;
  location: string;
  logoKey: string;
  name: string;
  phoneNumber: string;
  website: string;
  createdAt: string;
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
  location: string;
  maxParticipants: number;
  organizer: string;
  participants: EVENT_PARTICIPANT[];
  photoKey: string;
  showProfile: boolean;
  title: string;
  updatedAt: string;
  updatedBy: string;
};

export type FEED = {
  _id: string;
  context: string;
  comments: [];
  createdAt: string;
  createdBy: { _id: string; name: string; photoKey: string; surname: string };
  feedCategoryId: string;
  kind: 'feed' | 'ad';
  likeCount: number;
  updatedAt: string;
  photoKey?: string;
};
