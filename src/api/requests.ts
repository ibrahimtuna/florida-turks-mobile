import axios from 'axios';
import {
  ENDPOINT_APPLE_LOGIN,
  ENDPOINT_COMPANY_CATEGORIES,
  ENDPOINT_CREATE_COMPANY,
  ENDPOINT_CREATE_COMPANY_COMMENT,
  ENDPOINT_CREATE_COMPANY_SUB_COMMENT,
  ENDPOINT_CREATE_EVENT,
  ENDPOINT_CREATE_FEED,
  ENDPOINT_CREATE_FEED_COMMENT,
  ENDPOINT_CREATE_FEED_SUB_COMMENT,
  ENDPOINT_DELETE_ACCOUNT,
  ENDPOINT_EVENT_CATEGORIES,
  ENDPOINT_FEED_CATEGORIES,
  ENDPOINT_FORGOT_CHANGE_PASSWORD,
  ENDPOINT_FORGOT_CHECK_CODE,
  ENDPOINT_FORGOT_EMAIL,
  ENDPOINT_GET_COMPANIES,
  ENDPOINT_GET_EVENTS,
  ENDPOINT_GET_FEEDS,
  ENDPOINT_GET_ME,
  ENDPOINT_GET_MESSAGES,
  ENDPOINT_GET_PROFILE,
  ENDPOINT_GET_PROFILE_POSTS,
  ENDPOINT_GOOGLE_LOGIN,
  ENDPOINT_JOIN_EVENT,
  ENDPOINT_LIKE_COMPANY,
  ENDPOINT_LIKE_FEED,
  ENDPOINT_LIKE_FEED_COMMENT,
  ENDPOINT_LIKE_FEED_SUB_COMMENT,
  ENDPOINT_LOGIN,
  ENDPOINT_ONBOARDING_COMPLETE,
  ENDPOINT_REGISTER,
  ENDPOINT_SEND_MESSAGE,
  ENDPOINT_SEND_OTP,
  ENDPOINT_UPDATE_ME,
  ENDPOINT_VERIFY_OTP,
  ENDPOINT_WITHDRAW_EVENT,
} from './endpoints.ts';
import { LOCATION } from '../components/Inputs/LocationInput/types.ts';

export const REQUEST_LOGIN = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) =>
  axios.post(ENDPOINT_LOGIN, {
    email,
    password,
  });

export const REQUEST_APPLE_LOGIN = (idToken: string) =>
  axios.post(ENDPOINT_APPLE_LOGIN, {
    idToken,
  });

export const REQUEST_GOOGLE_LOGIN = (idToken: string) =>
  axios.post(ENDPOINT_GOOGLE_LOGIN, {
    idToken,
  });

export const REQUEST_REGISTER = ({
  email,
  password,
  confirmPassword,
}: {
  email: string;
  password: string;
  confirmPassword: string;
}) =>
  axios.post(ENDPOINT_REGISTER, {
    email,
    password,
    confirmPassword,
  });

export const REQUEST_SEND_OTP = ({ phoneNumber }: { phoneNumber: string }) =>
  axios.post(ENDPOINT_SEND_OTP, { phoneNumber });

export const REQUEST_VERIFY_OTP = ({
  phoneNumber,
  code,
}: {
  phoneNumber: string;
  code: string;
}) => axios.post(ENDPOINT_VERIFY_OTP, { phoneNumber, code });

export const REQUEST_FORGOT_EMAIL = ({ email }: { email: string }) =>
  axios.post(ENDPOINT_FORGOT_EMAIL, {
    email,
  });

export const REQUEST_FORGOT_CHECK_CODE = ({
  email,
  code,
}: {
  email: string;
  code: string;
}) =>
  axios.post(ENDPOINT_FORGOT_CHECK_CODE, {
    email,
    code,
  });

export const REQUEST_FORGOT_CHANGE_PASSWORD = ({
  email,
  code,
  newPassword,
  newPasswordConfirm,
}: {
  email: string;
  code: string;
  newPassword: string;
  newPasswordConfirm: string;
}) =>
  axios.post(ENDPOINT_FORGOT_CHANGE_PASSWORD, {
    email,
    code,
    newPassword,
    newPasswordConfirm,
  });

export const REQUEST_ONBOARDING_COMPLETE = ({
  name,
  surname,
  bio,
  location,
  phoneNumber,
  otpCode,
  photo,
}: {
  name: string;
  surname: string;
  bio: string;
  location: LOCATION;
  phoneNumber: string;
  otpCode: string;
  photo: string;
}) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('surname', surname);
  formData.append('bio', bio);
  formData.append('location', JSON.stringify(location));
  formData.append('phoneNumber', phoneNumber);
  formData.append('otpCode', otpCode);

  const cleanedUri = photo.startsWith('file://')
    ? photo.replace('file://', '')
    : photo;
  let file = {
    uri: cleanedUri,
    type: 'image/jpg',
    name: cleanedUri.split('/').pop() || 'photo.jpg',
  };

  formData.append('file', file);
  return axios.post(ENDPOINT_ONBOARDING_COMPLETE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const REQUEST_DELETE_ACCOUNT = () =>
  axios.delete(ENDPOINT_DELETE_ACCOUNT);

export const REQUEST_GET_ME = () => axios.get(ENDPOINT_GET_ME);

export const REQUEST_GET_FEED_CATEGORIES = () =>
  axios.get(ENDPOINT_FEED_CATEGORIES);

export const REQUEST_GET_EVENT_CATEGORIES = () =>
  axios.get(ENDPOINT_EVENT_CATEGORIES);

export const REQUEST_GET_COMPANY_CATEGORIES = () =>
  axios.get(ENDPOINT_COMPANY_CATEGORIES);

export const REQUEST_UPDATE_ME = ({
  name,
  surname,
  bio,
  phoneNumber,
  location,
  shareContact,
  photo,
}: {
  name?: string;
  surname?: string;
  bio?: string;
  phoneNumber?: string;
  location?: string;
  shareContact?: boolean;
  photo?: string;
}) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('surname', surname);
  formData.append('bio', bio);
  formData.append('phoneNumber', phoneNumber);
  formData.append('location', location);
  formData.append('shareContact', shareContact);
  if (photo) {
    const cleanedUri = photo.startsWith('file://')
      ? photo.replace('file://', '')
      : photo;
    let file = {
      uri: cleanedUri,
      type: 'image/jpg',
      name: cleanedUri.split('/').pop() || 'photo.jpg',
    };

    formData.append('file', file);
  }
  return axios.post(ENDPOINT_UPDATE_ME, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const REQUEST_CREATE_COMPANY = ({
  categoryId,
  name,
  desc,
  location,
  email,
  phoneNumber,
  website,
  logo,
  banner,
}: {
  categoryId: string;
  name: string;
  desc: string;
  location: LOCATION;
  email: string;
  phoneNumber: string;
  website: string;
  logo: string;
  banner: string;
}) => {
  const formData = new FormData();
  formData.append('categoryId', categoryId);
  formData.append('name', name);
  formData.append('desc', desc);
  formData.append('email', email);
  formData.append('location', JSON.stringify(location));
  formData.append('phoneNumber', phoneNumber);
  formData.append('website', website);
  if (logo) {
    const cleanedUri = logo.startsWith('file://')
      ? logo.replace('file://', '')
      : logo;
    let file = {
      uri: cleanedUri,
      type: 'image/jpg',
      name: cleanedUri.split('/').pop() || 'photo.jpg',
    };

    formData.append('logo', file);
  }
  if (banner) {
    const cleanedUri = banner.startsWith('file://')
      ? banner.replace('file://', '')
      : banner;
    let file = {
      uri: cleanedUri,
      type: 'image/jpg',
      name: cleanedUri.split('/').pop() || 'photo.jpg',
    };

    formData.append('coverPhoto', file);
  }
  return axios.post(ENDPOINT_CREATE_COMPANY, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const REQUEST_GET_COMPANIES = ({
  page,
  categoryId,
  location,
}: {
  page?: number;
  categoryId?: string;
  location?: { lat: number; lon: number; distance: number };
}) =>
  axios.get(ENDPOINT_GET_COMPANIES, {
    params: {
      page,
      categoryId,
      lat: location?.lat,
      lon: location?.lon,
      distance: location?.distance,
    },
  });

export const REQUEST_GET_EVENTS = ({
  page,
  categoryId,
  location,
}: {
  page?: number;
  categoryId?: string;
  location?: { lat: number; lon: number; distance: number };
}) =>
  axios.get(ENDPOINT_GET_EVENTS, {
    params: {
      page,
      categoryId,
      lat: location?.lat,
      lon: location?.lon,
      distance: location?.distance,
    },
  });

export const REQUEST_CREATE_EVENT = ({
  categoryId,
  title,
  desc,
  location,
  date,
  fee,
  showProfile,
  maxParticipants,
  organizerName,
  banner,
}: {
  categoryId: string;
  title: string;
  desc: string;
  location: LOCATION;
  date: string;
  fee: number;
  showProfile: boolean;
  maxParticipants: number;
  organizerName: string;
  banner: string;
}) => {
  const formData = new FormData();
  formData.append('categoryId', categoryId);
  formData.append('title', title);
  formData.append('desc', desc);
  formData.append('location', JSON.stringify(location));
  formData.append('date', date);
  formData.append('fee', fee);
  formData.append('showProfile', showProfile);
  formData.append('maxParticipants', maxParticipants);
  formData.append('organizerName', organizerName);

  const cleanedUri = banner.startsWith('file://')
    ? banner.replace('file://', '')
    : banner;
  let file = {
    uri: cleanedUri,
    type: 'image/jpg',
    name: cleanedUri.split('/').pop() || 'photo.jpg',
  };

  formData.append('photo', file);

  return axios.post(ENDPOINT_CREATE_EVENT, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const REQUEST_CREATE_FEED = ({
  categoryId,
  context,
  location,
  photo,
}: {
  categoryId: string;
  context: string;
  location: LOCATION;
  photo?: string;
}) => {
  const formData = new FormData();
  formData.append('feedCategoryId', categoryId);
  formData.append('context', context);
  formData.append('location', JSON.stringify(location));

  if (photo) {
    const cleanedUri = photo.startsWith('file://')
      ? photo.replace('file://', '')
      : photo;
    let file = {
      uri: cleanedUri,
      type: 'image/jpg',
      name: cleanedUri.split('/').pop() || 'photo.jpg',
    };

    formData.append('photo', file);
  }

  return axios.post(ENDPOINT_CREATE_FEED, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const REQUEST_GET_FEEDS = ({
  page,
  categoryId,
  location,
}: {
  page?: number;
  categoryId?: string;
  location?: { lat: number; lon: number; distance: number };
}) =>
  axios.get(ENDPOINT_GET_FEEDS, {
    params: {
      page,
      categoryId,
      lat: location?.lat,
      lon: location?.lon,
      distance: location?.distance,
    },
  });

export const REQUEST_CREATE_COMMENT = ({
  hocId,
  type,
  context,
}: {
  hocId: string;
  type: 'feed' | 'company';
  context: string;
}) => {
  if (type === 'feed') {
    return axios.post(ENDPOINT_CREATE_FEED_COMMENT, {
      feedId: hocId,
      context,
    });
  } else {
    return axios.post(ENDPOINT_CREATE_COMPANY_COMMENT, {
      companyId: hocId,
      context,
    });
  }
};

export const REQUEST_CREATE_FEED_SUB_COMMENT = ({
  feedId,
  commentId,
  context,
}: {
  feedId: string;
  commentId: string;
  context: string;
}) =>
  axios.post(ENDPOINT_CREATE_FEED_SUB_COMMENT, {
    feedId,
    commentId,
    context,
  });

export const REQUEST_LIKE_FEED = ({ feedId }: { feedId: string }) =>
  axios.post(ENDPOINT_LIKE_FEED, {
    feedId,
  });

export const REQUEST_LIKE_COMMENT = ({
  id,
  commentId,
  type,
}: {
  id: string;
  commentId: string;
  type: 'feed' | 'company';
}) =>
  axios.post(ENDPOINT_LIKE_FEED_COMMENT, {
    id,
    commentId,
    type,
  });

export const REQUEST_LIKE_SUB_COMMENT = ({
  id,
  commentId,
  subCommentId,
  type,
}: {
  id: string;
  commentId: string;
  subCommentId: string;
  type: 'feed' | 'company';
}) =>
  axios.post(ENDPOINT_LIKE_FEED_SUB_COMMENT, {
    id,
    commentId,
    subCommentId,
    type,
  });

export const REQUEST_LIKE_COMPANY = ({ companyId }: { companyId: string }) =>
  axios.post(ENDPOINT_LIKE_COMPANY, {
    companyId,
  });

export const REQUEST_CREATE_COMPANY_SUB_COMMENT = ({
  companyId,
  commentId,
  context,
}: {
  companyId: string;
  commentId: string;
  context: string;
}) =>
  axios.post(ENDPOINT_CREATE_COMPANY_SUB_COMMENT, {
    companyId,
    commentId,
    context,
  });

export const REQUEST_JOIN_EVENT = ({ eventId }: { eventId: string }) =>
  axios.post(ENDPOINT_JOIN_EVENT, {
    eventId,
  });

export const REQUEST_WITHDRAW_EVENT = ({ eventId }: { eventId: string }) =>
  axios.post(ENDPOINT_WITHDRAW_EVENT, {
    eventId,
  });

export const REQUEST_GET_MESSAGES = () => axios.get(ENDPOINT_GET_MESSAGES);

export const REQUEST_GET_PROFILE = ({ userId }: { userId: string }) =>
  axios.get(ENDPOINT_GET_PROFILE, {
    params: {
      userId,
    },
  });

export const REQUEST_GET_PROFILE_POSTS = ({
  userId,
  page,
}: {
  userId: string;
  page?: number;
}) =>
  axios.get(ENDPOINT_GET_PROFILE_POSTS, {
    params: {
      userId,
      page,
    },
  });

export const REQUEST_SEND_MESSAGE = ({
  receiverId,
  content,
}: {
  receiverId: string;
  content: string;
}) => {
  const formData = new FormData();
  formData.append('receiverId', receiverId);
  formData.append('content', content);

  return axios.post(ENDPOINT_SEND_MESSAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
