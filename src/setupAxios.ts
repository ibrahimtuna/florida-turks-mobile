import axios from 'axios';
import { EnhancedStore } from '@reduxjs/toolkit';
import { logout } from './store/reducers/user';
import { persistor } from './store';
import Toast from 'react-native-toast-message';

function setupAxios(store: EnhancedStore) {
  // REQUEST
  axios.interceptors.request.use(config => {
    const { accessToken } = store.getState().user;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  // RESPONSE
  axios.interceptors.response.use(
    response => {
      // Check if the status code is outside the range of 200–299
      if (response.status < 200 || response.status >= 300) {
        return Promise.reject(response); // Explicitly reject non-2xx responses
      }
      return response;
    },
    err => {
      console.log('AXIOS ERROR --> ', err?.response);
      Toast.show({
        type: 'error',
        text1: 'Hata',
        text2: err?.response?.data?.errors?.length
          ? err?.response?.data?.errors[0]
          : err?.response?.data?.message,
      });
      if ([401, 403].includes(err?.response?.status)) {
        // Token could not be verified, log out the user
        try {
          console.log('403 received');
          /*
          persistor
            .purge()
            .then(purgeResult => {
              console.log('PERSISTOR PURGED:', purgeResult);
              // Optionally verify storage here if needed
              store.dispatch(logout());
            })
            .catch(purgeError => {
              console.error('Error during persistor purge:', purgeError);
              store.dispatch(logout());
            });
           */
        } catch (e) {
          console.log('Error occurred during logout');
        }
      }

      return Promise.reject(err); // Ensure the error propagates correctly
    },
  );
}

export default setupAxios;
