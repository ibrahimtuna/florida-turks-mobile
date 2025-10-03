import {
  ActivityIndicator,
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
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../store';
import { REQUEST_GET_ME, REQUEST_LOGIN } from '../../api/requests.ts';
import { useDispatch } from 'react-redux';
import { login, setUser } from '../../store/reducers/user.ts';
import AllPageLoading from '../../components/AllPageLoading.tsx';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { accessToken } = useAppSelector(state => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const handleLogin = () => {
    setIsLoginLoading(true);
    REQUEST_LOGIN({
      email,
      password,
    })
      .then(({ data }) => {
        dispatch(login(data.accessToken));
      })
      .finally(() => setIsLoginLoading(false));
  };

  useEffect(() => {
    if (accessToken) {
      setIsLoading(true);
      REQUEST_GET_ME()
        .then(({ data }) => {
          if (!data.user?.photoKey) {
            navigation.navigate('Onboarding');
            return;
          }
          dispatch(setUser(data.user));
        })
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, navigation, accessToken]);

  return (
    <>
      {isLoading && <AllPageLoading />}
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
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            placeholder={t('commons.password')}
            placeholderTextColor="#8080808C"
            style={styles.textInput}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(p => !p)}>
            <Icon
              name={showPassword ? 'eyeOff' : 'eye'}
              fill="#808792"
              size="s"
            />
          </TouchableOpacity>
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
          style={[
            styles.button,
            {
              flexDirection: 'row',
              alignItems: 'center',
            },
          ]}
          activeOpacity={0.8}
          onPress={handleLogin}
        >
          {isLoginLoading && (
            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
          )}
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
    </>
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
    flex: 1,
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
