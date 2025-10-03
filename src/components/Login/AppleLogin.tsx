import Icon from '../Icon.tsx';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import appleAuth from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { REQUEST_APPLE_LOGIN } from '../../api/requests.ts';
import { login, socialLogin } from '../../store/reducers/user.ts';
import { useDispatch } from 'react-redux';

const AppleLogin = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleAppleLogin = async () => {
    try {
      setIsLoading(true);
      // Step 1: Request Apple credentials
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: 1, // LOGIN
        requestedScopes: [0, 1], // EMAIL & FULL_NAME
      });

      const { identityToken, nonce } = appleAuthRequestResponse;

      if (!identityToken) {
        throw new Error('Apple Sign-In failed - no identity token returned');
      }

      // Step 2: Create Firebase credential
      const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );

      // Step 3: Sign in with Firebase
      const userCredential = await auth().signInWithCredential(appleCredential);

      // Step 4: Get Firebase ID token (to send to your backend)
      const firebaseIdToken = await userCredential.user.getIdToken();

      const appleLoginRes = await REQUEST_APPLE_LOGIN(firebaseIdToken);
      console.log(appleLoginRes.data, '<-- firebase google login response');
      dispatch(login(appleLoginRes.data.accessToken));
      dispatch(
        socialLogin({
          email: appleLoginRes.data.email,
          name: appleLoginRes.data.name,
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
      onPress={handleAppleLogin}
      disabled={isLoading}
    >
      <Icon name="apple" size="s" />
      <Text>{t('login.login_apple')}</Text>
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

export default AppleLogin;
