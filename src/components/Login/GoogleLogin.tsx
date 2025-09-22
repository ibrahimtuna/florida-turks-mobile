import Icon from '../Icon.tsx';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '937322921758-17muhdb7o8i0l4f70h0lv1em9ne25m0s.apps.googleusercontent.com',
});

const GoogleLogin = () => {
  const { t } = useTranslation();
  const handleGoogleLogin = async () => {
    try {
      // Step 1: Google sign-in
      const { data } = await GoogleSignin.signIn();
      const idToken = data?.idToken;
      if (!idToken) {
        throw new Error('No idToken provided');
      }
      console.log(idToken, '<-- id token');

      // Step 2: Create Firebase credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Step 3: Sign in with Firebase
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );

      // Step 4: Get Firebase ID token (JWT)
      const firebaseIdToken = await userCredential.user.getIdToken();

      // Send this token to your backend Lambda
      return firebaseIdToken;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableOpacity
      style={styles.socialButton}
      activeOpacity={0.8}
      onPress={handleGoogleLogin}
    >
      <Icon name="google" size="s" />
      <Text>{t('login.login_google')}</Text>
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
