import axios from 'axios';
import {
  ENDPOINT_APPLE_LOGIN,
  ENDPOINT_DELETE_ACCOUNT,
  ENDPOINT_FORGOT_CHANGE_PASSWORD,
  ENDPOINT_FORGOT_CHECK_CODE,
  ENDPOINT_FORGOT_EMAIL,
  ENDPOINT_GET_ME,
  ENDPOINT_GOOGLE_LOGIN,
  ENDPOINT_LOGIN,
  ENDPOINT_ONBOARDING_COMPLETE,
  ENDPOINT_REGISTER,
  ENDPOINT_SEND_OTP,
  ENDPOINT_VERIFY_OTP,
} from './endpoints.ts';

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
  location: string;
  phoneNumber: string;
  otpCode: string;
  photo: string;
}) => {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('surname', surname);
  formData.append('bio', bio);
  formData.append('location', location);
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
