import {
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
  TextInput as RNTextInput,
  ActivityIndicator,
} from 'react-native';
import SubHeader from '../../components/SubHeader.tsx';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store';
import { cdnImage } from '../../helpers.ts';
import ProfilePhotoUpload from '../../components/ProfilePhotoUpload.tsx';
import { useEffect, useState } from 'react';
import PhoneInput from '../../components/Inputs/PhoneInput.tsx';
import TextInput from '../../components/Inputs/TextInput.tsx';
import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile';
import { REQUEST_UPDATE_ME } from '../../api/requests.ts';
import { useNavigation } from '@react-navigation/core';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/reducers/user.ts';
import MultilineTextInput from '../../components/Inputs/MultilineTextInput.tsx';

const ProfileSettingsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useAppSelector(state => state.user);
  const { t } = useTranslation();

  const [photo, setPhoto] = useState(cdnImage(user.photoKey) || '');
  const [name, setName] = useState(user.name || '');
  const [surname, setSurname] = useState(user.surname || '');
  const [bio, setBio] = useState(user.bio || '');
  const [phoneCountry, setPhoneCountry] = useState('US');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber || '');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState(
    user.phoneNumber || '',
  );
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [location, setLocation] = useState(user.location || '');
  const [shareContact, setShareContact] = useState(!!user.shareContact);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [surnameError, setSurnameError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  useEffect(() => {
    const parsed = parsePhoneNumberFromString(user.phoneNumber);
    setPhoneCountry(parsed?.country || 'US');
    if (parsed?.nationalNumber) {
      setPhoneNumber(parsed?.nationalNumber);
    }
    setFormattedPhoneNumber(user.phoneNumber);
  }, [user.phoneNumber]);

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
    if (phoneNumberError) {
      setPhoneNumberError(!isNumberValid);
    }
  }, [
    name,
    nameError,
    surname,
    surnameError,
    location,
    locationError,
    isNumberValid,
    phoneNumberError,
  ]);

  const handleSave = () => {
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
    if (!isNumberValid) {
      isError = true;
      setPhoneNumberError(true);
    }
    if (isError) {
      return;
    }
    setUpdateLoading(true);
    REQUEST_UPDATE_ME({
      name,
      surname,
      bio,
      phoneNumber: formattedPhoneNumber,
      location,
      shareContact,
      photo: photo !== user.photoKey ? photo : undefined,
    })
      .then(({ data }) => {
        dispatch(setUser(data.user));
      })
      .finally(() => setUpdateLoading(false));
  };

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <SubHeader title={t('profile_settings.title')} />
      <ScrollView
        style={{
          padding: 16,
        }}
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 32,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <ProfilePhotoUpload photo={photo} setPhoto={setPhoto} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 16,
            marginTop: 16,
          }}
        >
          <TextInput
            value={name}
            onChange={setName}
            placeholder={t('profile_settings.name')}
            label={t('profile_settings.name')}
            error={nameError}
          />
          <TextInput
            value={surname}
            onChange={setSurname}
            placeholder={t('profile_settings.surname')}
            label={t('profile_settings.surname')}
            error={surnameError}
          />
        </View>

        <MultilineTextInput
          value={bio}
          onChange={setBio}
          placeholder={t('profile_settings.bio')}
        />

        <TextInput
          label={t('profile_settings.email')}
          placeholder={t('profile_settings.email')}
          value={user.email}
          onChange={() => null}
          disabled
          helperText={t('profile_settings.email_cannot_change')}
        />

        <PhoneInput
          countryCode={phoneCountry}
          value={phoneNumber}
          onChange={setPhoneNumber}
          onFormattedValueChange={setFormattedPhoneNumber}
          setIsValid={setIsNumberValid}
          error={phoneNumberError}
        />

        <TextInput
          label={t('profile_settings.location')}
          placeholder={t('profile_settings.location')}
          value={location}
          onChange={setLocation}
          icon="locationPoint"
          error={locationError}
        />

        <View
          style={{
            justifyContent: 'space-between',
            backgroundColor: '#7676801F',
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 12,
            marginTop: 4,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {t('profile_settings.share_contact_data')}
          </Text>
          <Switch
            value={shareContact}
            onChange={() => setShareContact(!shareContact)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            marginTop: 16,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={updateLoading}
            onPress={() => navigation.goBack()}
            style={{
              borderWidth: 1,
              borderColor: '#8080808C',
              flex: 1,
              alignItems: 'center',
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
              {t('commons.cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSave}
            disabled={updateLoading}
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
            {updateLoading && (
              <ActivityIndicator style={{ marginRight: 8 }} color="#fff" />
            )}
            <Text
              style={{
                fontWeight: '500',
                color: '#FFFFFF',
                fontSize: 16,
              }}
            >
              {t('commons.save')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileSettingsScreen;
