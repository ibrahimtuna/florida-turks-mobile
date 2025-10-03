import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useState } from 'react';
import Icon from '../../components/Icon.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { REQUEST_REGISTER } from '../../api/requests.ts';
import { useDispatch } from 'react-redux';
import { login } from '../../store/reducers/user.ts';

const CreateAccountScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    setIsLoading(true);
    REQUEST_REGISTER({
      email,
      password,
      confirmPassword,
    })
      .then(({ data }) => {
        dispatch(login(data.accessToken));
        navigation.navigate('Onboarding');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAwareScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoWrapper}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>{t('login.title')}</Text>
        <Text style={styles.subtitle}>{t('register.desc')}</Text>

        {/* Email */}
        <View style={styles.field}>
          <Text style={styles.label}>{t('profile_settings.email')}</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder={t('commons.email')}
              placeholderTextColor="#8080808C"
              style={styles.textInput}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.field}>
          <Text style={styles.label}>{t('commons.password')}</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder={t('commons.password')}
              placeholderTextColor="#8080808C"
              style={styles.textInput}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              returnKeyType="next"
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
        </View>

        {/* Confirm Password */}
        <View style={styles.field}>
          <Text style={styles.label}>{t('commons.confirm_password')}</Text>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder={t('commons.confirm_password')}
              placeholderTextColor="#8080808C"
              style={styles.textInput}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              returnKeyType="done"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(p => !p)}>
              <Icon
                name={showConfirmPassword ? 'eyeOff' : 'eye'}
                fill="#808792"
                size="s"
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          disabled={isLoading}
        >
          <Text style={styles.backButtonText}>{t('commons.back')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleRegister}
          style={styles.continueButton}
          disabled={isLoading}
        >
          {isLoading && (
            <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
          )}
          <Text style={styles.continueButtonText}>{t('commons.continue')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 16,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    gap: 16,
    paddingBottom: 120,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    height: 128,
    width: 128,
    borderRadius: 24,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
  },
  field: {
    gap: 8,
  },
  label: {
    color: '#8080808C',
  },
  textInputContainer: {
    backgroundColor: '#7676801F',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 16,
    flex: 1,
    height: 32,
  },
  bottomActions: {
    flexDirection: 'row',
    gap: 16,
    padding: 16,
  },
  backButton: {
    borderWidth: 1,
    borderColor: '#8080808C',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    fontWeight: '500',
    color: '#808792',
    fontSize: 16,
  },
  continueButton: {
    borderWidth: 1,
    borderColor: '#E40E1A',
    backgroundColor: '#E40E1A',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  continueButtonText: {
    fontWeight: '500',
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default CreateAccountScreen;
