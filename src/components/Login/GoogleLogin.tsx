import Icon from '../Icon.tsx';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { REQUEST_GOOGLE_LOGIN } from '../../api/requests.ts';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, socialLogin } from '../../store/reducers/user.ts';

GoogleSignin.configure({
  webClientId:
    '937322921758-17muhdb7o8i0l4f70h0lv1em9ne25m0s.apps.googleusercontent.com',
});

const GoogleLogin = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Step 1: Google sign-in
      const { data } = await GoogleSignin.signIn();
      const idToken = data?.idToken;
      if (!idToken) {
        throw new Error('No idToken provided');
      }
      // Step 2: Create Firebase credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Step 3: Sign in with Firebase
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      // Step 4: Get Firebase ID token (JWT)
      const firebaseIdToken = await userCredential.user.getIdToken();

      const googleLoginRes = await REQUEST_GOOGLE_LOGIN(firebaseIdToken);
      console.log(googleLoginRes.data, '<-- firebase google login response');
      dispatch(login(googleLoginRes.data.accessToken));
      dispatch(
        socialLogin({
          email: googleLoginRes.data.email,
          name: googleLoginRes.data.name,
        }),
      );
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.socialButton}
      activeOpacity={0.8}
      onPress={handleGoogleLogin}
      disabled={isLoading}
    >
      <Icon name="google" size="s" />
      <Text>{t('login.login_google')}</Text>
      {isLoading && <ActivityIndicator />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});

export default GoogleLogin;
