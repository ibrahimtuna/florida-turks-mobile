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
}

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

export type FEED = {
  _id: string;
  context: string;
  comments: COMMENT[];
  createdAt: string;
  createdBy: { _id: string; name: string; photoKey: string; surname: string };
  feedCategoryId: string;
  kind: 'feed' | 'ad';
  likeCount: number;
  isLiked: boolean;
  updatedAt: string;
  photoKey?: string;
};
