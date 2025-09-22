import Icon from '../Icon.tsx';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import appleAuth from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';

const AppleLogin = () => {
  const { t } = useTranslation();

  const handleAppleLogin = async () => {
    try {
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

      return firebaseIdToken; // send this to Lambda
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <TouchableOpacity
      style={styles.socialButton}
      activeOpacity={0.8}
      onPress={handleAppleLogin}
    >
      <Icon name="apple" size="s" />
      <Text>{t('login.login_apple')}</Text>
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
