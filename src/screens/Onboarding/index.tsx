import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import OtpVerifyModal from './OtpVerifyModal.tsx';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { useAppSelector } from '../../store';
import ProfilePhotoUpload from '../../components/ProfilePhotoUpload.tsx';
import {
  REQUEST_GET_ME,
  REQUEST_ONBOARDING_COMPLETE,
  REQUEST_SEND_OTP,
} from '../../api/requests.ts';
import AllPageLoading from '../../components/AllPageLoading.tsx';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/user.ts';
import PhoneInput from '../../components/Inputs/PhoneInput.tsx';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LocationInput from '../../components/Inputs/LocationInput';
import { LOCATION } from '../../components/Inputs/LocationInput/types.ts';

const OnboardingScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector(state => state.user);
  const navigation = useNavigation();
  const [otpModal, setOtpModal] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [photo, setPhoto] = useState(user.photoKey || '');
  const [surname, setSurname] = useState(user.surname || '');
  const [bio, setBio] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [location, setLocation] = useState<LOCATION>();
  const [isContinueLoading, setIsContinueLoading] = useState(false);
  const [onboardingFinalizeLoading, setOnboardingFinalizeLoading] =
    useState(false);
  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  useEffect(() => {
    if (nameError) {
      setNameError(name.length < 3);
    }
    if (surnameError) {
      setSurnameError(surname.length < 3);
    }
    if (locationError) {
      setLocationError(!location);
    }
    if (photoError) {
      setPhotoError(!photo);
    }
    if (phoneNumberError) {
      setPhoneNumberError(!isNumberValid);
    }
  }, [
    name,
    surname,
    location,
    photo,
    isNumberValid,
    nameError,
    surnameError,
    locationError,
    photoError,
    phoneNumberError,
  ]);

  const handleContinue = () => {
    let isError = false;
    if (name.length < 3) {
      isError = true;
      setNameError(true);
    }
    if (surname.length < 3) {
      isError = true;
      setSurnameError(true);
    }
    if (!location) {
      isError = true;
      setLocationError(true);
    }
    if (!photo) {
      isError = true;
      setPhotoError(true);
    }
    if (!isNumberValid) {
      isError = true;
      setPhoneNumberError(true);
    }
    if (isError) {
      return;
    }
    setIsContinueLoading(true);
    REQUEST_SEND_OTP({
      phoneNumber: formattedPhoneNumber,
    })
      .then(() => setOtpModal(true))
      .finally(() => setIsContinueLoading(false));
  };

  const handleFinalizeOnboarding = (code: string) => {
    setOnboardingFinalizeLoading(true);
    REQUEST_ONBOARDING_COMPLETE({
      name,
      surname,
      bio,
      photo,
      location: location!,
      phoneNumber: formattedPhoneNumber,
      otpCode: code,
    })
      .then(() => {
        REQUEST_GET_ME()
          .then(({ data }) => {
            dispatch(setUser(data.user));
          })
          .finally(() => setOnboardingFinalizeLoading(false));
      })
      .catch(err => {
        console.log(err, '<-- error here');
        setOnboardingFinalizeLoading(false);
      });
  };

  return (
    <>
      {onboardingFinalizeLoading && <AllPageLoading />}
      <SafeAreaView
        style={{
          padding: 16,
          gap: 16,
          flex: 1,
        }}
      >
        <OtpVerifyModal
          visible={otpModal}
          onClose={() => setOtpModal(false)}
          phoneNumber={formattedPhoneNumber}
          onVerify={code => handleFinalizeOnboarding(code)}
        />
        <KeyboardAwareScrollView
          style={{
            padding: 16,
          }}
          contentContainerStyle={{
            gap: 16,
            paddingBottom: 32,
            flex: 1,
          }}
        >
          <ProfilePhotoUpload
            photo={photo}
            setPhoto={setPhoto}
            error={photoError}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 16,
              marginTop: 16,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: '#8080808C',
                }}
              >
                {t('profile_settings.name')}
              </Text>
              <TextInput
                placeholder={t('profile_settings.name')}
                placeholderTextColor="#9A9AA5"
                value={name}
                onChangeText={setName}
                style={{
                  backgroundColor: '#7676801F',
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  borderRadius: 12,
                  marginTop: 4,
                  fontSize: 16,
                  letterSpacing: 0,
                  height: 48,
                  borderWidth: 1,
                  borderColor: !nameError ? '#7676801F' : '#ff0000',
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: '#8080808C',
                }}
              >
                {t('profile_settings.surname')}
              </Text>
              <TextInput
                placeholder={t('profile_settings.surname')}
                placeholderTextColor="#9A9AA5"
                value={surname}
                onChangeText={setSurname}
                style={{
                  backgroundColor: '#7676801F',
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  letterSpacing: 0,
                  borderRadius: 12,
                  marginTop: 4,
                  fontSize: 16,
                  height: 48,
                  borderWidth: 1,
                  borderColor: !surnameError ? '#7676801F' : '#ff0000',
                }}
              />
            </View>
          </View>

          <View
            style={{
              borderWidth: 1,
              borderColor: '#8080808C',
              borderRadius: 12,
              height: 150,
            }}
          >
            <TextInput
              placeholder={t('profile_settings.bio')}
              multiline
              numberOfLines={5}
              placeholderTextColor="#8080808C"
              value={bio}
              onChangeText={setBio}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 12,
                fontSize: 16,
              }}
            />
            <View
              style={{
                position: 'absolute',
                bottom: 6,
                right: 8,
              }}
            >
              <Text
                style={{
                  color: '#8080808C',
                  fontSize: 16,
                }}
              >
                {t('profile_settings.chars', {
                  char: 30,
                  total: 2500,
                })}
              </Text>
            </View>
          </View>

          <PhoneInput
            value={phoneNumber}
            onChange={setPhoneNumber}
            onFormattedValueChange={setFormattedPhoneNumber}
            setIsValid={setIsNumberValid}
            error={phoneNumberError}
          />

          <LocationInput
            value={location}
            onChange={setLocation}
            error={locationError}
            isCities
            icon="locationPoint"
            placeholder={t('profile_settings.location')}
            label={t('profile_settings.location')}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
              marginTop: 16,
              position: 'absolute',
              bottom: 0,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
              disabled={isContinueLoading}
              style={{
                borderWidth: 1,
                borderColor: '#8080808C',
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 12,
                borderRadius: 12,
              }}
            >
              <Text
                style={{
                  fontWeight: '500',
                  color: '#808792',
                  fontSize: 16,
                }}
              >
                {t('commons.back')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleContinue}
              disabled={isContinueLoading}
              style={{
                borderWidth: 1,
                borderColor: '#E40E1A',
                backgroundColor: '#E40E1A',
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 12,
                borderRadius: 12,
              }}
            >
              {isContinueLoading && (
                <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
              )}
              <Text
                style={{
                  fontWeight: '500',
                  color: '#FFFFFF',
                  fontSize: 16,
                }}
              >
                {t('commons.continue')}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
};

export default OnboardingScreen;
