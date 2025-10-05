import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import SubHeader from '../../components/SubHeader.tsx';
import ProfilePhotoUpload from '../../components/ProfilePhotoUpload.tsx';
import { useEffect, useMemo, useState } from 'react';
import TextInput from '../../components/Inputs/TextInput.tsx';
import SelectInput from '../../components/Inputs/SelectInput';
import i18n from '../../i18n.ts';
import { useAppSelector } from '../../store';
import MultilineTextInput from '../../components/Inputs/MultilineTextInput.tsx';
import BannerPhotoUpload from '../../components/BannerPhotoUpload.tsx';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { REQUEST_CREATE_COMPANY } from '../../api/requests.ts';
import PhoneInput from '../../components/Inputs/PhoneInput.tsx';

const CreateCompanyScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { language } = i18n;
  const { categories } = useAppSelector(state => state.company);
  const navigation = useNavigation();

  const [logo, setLogo] = useState('');
  const [banner, setBanner] = useState('');
  const [companyCategory, setCompanyCategory] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyDesc, setCompanyDesc] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);

  const [logoError, setLogoError] = useState(false);
  const [bannerError, setBannerError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [websiteError, setWebsiteError] = useState(false);
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const CATEGORIES = useMemo(() => {
    return categories.map(category => ({
      value: category._id,
      label: language === 'tr' ? category.turkishTitle : category.englishTitle,
    }));
  }, [categories, language]);

  useEffect(() => {
    if (logoError) {
      setLogoError(!logo);
    }
    if (bannerError) {
      setBannerError(!banner);
    }
    if (categoryError) {
      setCategoryError(!companyCategory);
    }
    if (nameError) {
      setNameError(!companyName);
    }
    if (emailError) {
      setEmailError(!companyEmail);
    }
    if (addressError) {
      setAddressError(!companyAddress);
    }
    if (websiteError) {
      setWebsiteError(!companyWebsite);
    }
    if (phoneNumberError) {
      setPhoneNumberError(!isPhoneNumberValid);
    }
  }, [
    logo,
    logoError,
    banner,
    bannerError,
    companyCategory,
    categoryError,
    companyName,
    nameError,
    companyEmail,
    emailError,
    companyAddress,
    addressError,
    companyWebsite,
    websiteError,
    isPhoneNumberValid,
    phoneNumberError,
  ]);

  const handleSave = () => {
    let isError = false;
    if (!logo) {
      isError = true;
      setLogoError(true);
    }
    if (!banner) {
      isError = true;
      setBannerError(true);
    }
    if (!companyCategory) {
      isError = true;
      setCategoryError(true);
    }
    if (!companyName) {
      isError = true;
      setNameError(true);
    }
    if (!companyEmail) {
      isError = true;
      setEmailError(true);
    }
    if (!companyAddress) {
      isError = true;
      setAddressError(true);
    }
    if (!companyWebsite) {
      isError = true;
      setWebsiteError(true);
    }
    if (!isPhoneNumberValid) {
      isError = true;
      setPhoneNumberError(true);
    }
    if (isError) {
      return;
    }
    setSaveLoading(true);
    REQUEST_CREATE_COMPANY({
      categoryId: companyCategory,
      name: companyName,
      desc: companyDesc,
      logo,
      banner,
      website: companyWebsite,
      location: companyAddress,
      email: companyEmail,
      phoneNumber: formattedPhoneNumber,
    })
      .then(({ data }) => console.log(data, '<-- data'))
      .finally(() => setSaveLoading(false));
  };

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <SubHeader title={t('companies.create_company.title')} hideRewards />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 16,
          paddingBottom: bottom + 16,
        }}
      >
        <View style={{ alignItems: 'center', gap: 16 }}>
          <Text>{t('companies.create_company.logo')}</Text>
          <ProfilePhotoUpload
            photo={logo}
            setPhoto={setLogo}
            error={logoError}
          />
          <View style={{ width: '100%', height: 1, backgroundColor: '#ccc' }} />
        </View>
        <View style={{ alignItems: 'center', gap: 16 }}>
          <Text>{t('companies.create_company.banner')}</Text>
          <BannerPhotoUpload
            photo={banner}
            setPhoto={setBanner}
            error={bannerError}
          />
          <View style={{ width: '100%', height: 1, backgroundColor: '#ccc' }} />
        </View>
        <SelectInput
          value={companyCategory}
          onChange={setCompanyCategory}
          label={t('companies.create_company.category')}
          placeholder={t('companies.create_company.category')}
          options={CATEGORIES}
          error={categoryError}
        />
        <TextInput
          value={companyName}
          onChange={setCompanyName}
          label={t('companies.create_company.name')}
          placeholder={t('companies.create_company.name')}
          error={nameError}
        />
        <MultilineTextInput
          value={companyDesc}
          onChange={setCompanyDesc}
          placeholder={t('companies.create_company.desc')}
        />
        <TextInput
          value={companyEmail}
          onChange={setCompanyEmail}
          label={t('companies.create_company.email')}
          placeholder={t('companies.create_company.email')}
          error={emailError}
          autoCapitalize="none"
        />
        <PhoneInput
          value={phoneNumber}
          onChange={setPhoneNumber}
          onFormattedValueChange={setFormattedPhoneNumber}
          setIsValid={setIsPhoneNumberValid}
          error={phoneNumberError}
        />
        <TextInput
          value={companyAddress}
          onChange={setCompanyAddress}
          label={t('companies.create_company.address')}
          placeholder={t('companies.create_company.address')}
          icon="locationPoint"
          error={addressError}
        />
        <TextInput
          value={companyWebsite}
          onChange={setCompanyWebsite}
          label={t('companies.create_company.website')}
          placeholder={t('companies.create_company.website')}
          icon="web"
          error={websiteError}
          autoCapitalize="none"
        />
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
            disabled={saveLoading}
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
            disabled={saveLoading}
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
            {saveLoading && (
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

export default CreateCompanyScreen;
