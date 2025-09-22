import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon.tsx';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GoogleLogin from '../../components/Login/GoogleLogin.tsx';
import AppleLogin from '../../components/Login/AppleLogin.tsx';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ padding: 16, gap: 16 }}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            height: 128,
            width: 128,
            borderRadius: 24,
          }}
        />
      </View>
      <Text
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 24,
        }}
      >
        {t('login.title')}
      </Text>
      <Text
        style={{
          fontWeight: '500',
          fontSize: 16,
          textAlign: 'center',
        }}
      >
        {t('login.desc')}
      </Text>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={t('commons.email')}
          placeholderTextColor="#8080808C"
          style={styles.textInput}
          keyboardType="email-address"
        />
      </View>
      <View style={styles.textInputContainer}>
        <TextInput
          placeholder={t('commons.password')}
          placeholderTextColor="#8080808C"
          style={styles.textInput}
          secureTextEntry={true}
        />
        <Icon name="eye" fill="#808792" size="s" />
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text>{t('login.forgot_password')}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Onboarding')}
      >
        <Text style={styles.buttonText}>{t('login.login')}</Text>
      </TouchableOpacity>
      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text>{t('commons.or')}</Text>
        <View style={styles.orLine} />
      </View>
      <AppleLogin />
      <GoogleLogin />
      <Text style={{ textAlign: 'center', marginTop: 16 }}>
        {t('login.dont_have_account')}{' '}
      </Text>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CreateAccount')}
      >
        <Text style={styles.buttonText}>{t('login.create_account')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: '#7676801F',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    fontSize: 16,
    height: 32,
  },
  button: {
    backgroundColor: '#E40E1A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  orLine: {
    height: 1,
    flex: 1,
    backgroundColor: '#ccc',
  },
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

export default LoginScreen;
