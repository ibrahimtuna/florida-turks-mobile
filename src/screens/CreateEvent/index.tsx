import {
  ActivityIndicator,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import SubHeader from '../../components/SubHeader.tsx';
import { useEffect, useMemo, useState } from 'react';
import TextInput from '../../components/Inputs/TextInput.tsx';
import SelectInput from '../../components/Inputs/SelectInput';
import i18n from '../../i18n.ts';
import { useAppSelector } from '../../store';
import MultilineTextInput from '../../components/Inputs/MultilineTextInput.tsx';
import { useNavigation } from '@react-navigation/core';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BannerPhotoUpload from '../../components/BannerPhotoUpload.tsx';
import { REQUEST_CREATE_EVENT } from '../../api/requests.ts';
import LocationInput from '../../components/Inputs/LocationInput';
import { LOCATION } from '../../components/Inputs/LocationInput/types.ts';
import { useDispatch } from 'react-redux';
import { addEvent } from '../../store/reducers/event.ts';

const CreateEventScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { language } = i18n;
  const { categories } = useAppSelector(state => state.event);
  const { user } = useAppSelector(state => state.user);

  const [banner, setBanner] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [eventAddress, setEventAddress] = useState<LOCATION>();
  const [maxParticipants, setMaxParticipants] = useState('');
  const [joinFee, setJoinFee] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [shareProfile, setShareProfile] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [bannerError, setBannerError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  const CATEGORIES = useMemo(() => {
    return categories.map(category => ({
      value: category._id,
      label: language === 'tr' ? category.turkishTitle : category.englishTitle,
    }));
  }, [categories, language]);

  useEffect(() => {
    if (bannerError) {
      setBannerError(!banner);
    }
    if (categoryError) {
      setCategoryError(!eventCategory);
    }
    if (titleError) {
      setTitleError(!eventTitle);
    }
    if (addressError) {
      setAddressError(!eventAddress);
    }
  }, [
    banner,
    bannerError,
    eventCategory,
    categoryError,
    eventTitle,
    titleError,
    eventAddress,
    addressError,
  ]);

  const handleSave = () => {
    let isError = false;
    if (!banner) {
      isError = true;
      setBannerError(true);
    }
    if (!eventCategory) {
      isError = true;
      setCategoryError(true);
    }
    if (!eventTitle) {
      isError = true;
      setTitleError(true);
    }
    if (!eventAddress) {
      isError = true;
      setAddressError(true);
    }
    if (isError) {
      return;
    }
    setSaveLoading(true);
    REQUEST_CREATE_EVENT({
      categoryId: eventCategory,
      title: eventTitle,
      desc: eventDesc,
      fee: Number(joinFee) || 0,
      maxParticipants: Number(maxParticipants) || 0,
      organizerName: organizerName,
      showProfile: shareProfile,
      location: eventAddress!,
      date: new Date().toISOString(),
      banner,
    })
      .then(({ data }) => {
        console.log('data response ', data);
        dispatch(
          addEvent({
            _id: data.event._id,
            title: data.event.title,
            desc: data.event.desc,
            date: data.event.date,
            fee: data.event.fee,
            participants: [],
            showProfile: data.event.showProfile,
            location: data.event.location,
            organizer: data.event.organizer,
            maxParticipants: data.event.maxParticipants,
            createdAt: data.event.createdAt,
            updatedAt: data.event.createdAt,
            photoKey: data.event.photoKey,
            categoryId: data.event.categoryId,
            updatedBy: user._id,
            createdBy: {
              _id: user._id,
              name: user.name,
              surname: user.surname,
              photoKey: user.photoKey,
            },
          }),
        );
        navigation.goBack();
      })
      .finally(() => setSaveLoading(false));
  };

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <SubHeader title={t('events.create_event.title')} hideRewards />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 16,
          paddingBottom: bottom + 16,
        }}
      >
        <View style={{ alignItems: 'center', gap: 16 }}>
          <Text>{t('events.create_event.banner')}</Text>
          <BannerPhotoUpload
            photo={banner}
            setPhoto={setBanner}
            error={bannerError}
          />
          <View style={{ width: '100%', height: 1, backgroundColor: '#ccc' }} />
        </View>
        <SelectInput
          value={eventCategory}
          onChange={setEventCategory}
          label={t('events.create_event.category')}
          placeholder={t('events.create_event.category')}
          options={CATEGORIES}
          error={categoryError}
        />
        <TextInput
          value={eventTitle}
          onChange={setEventTitle}
          label={t('events.create_event.event_name')}
          placeholder={t('events.create_event.event_name')}
          error={titleError}
        />
        <MultilineTextInput
          value={eventDesc}
          onChange={setEventDesc}
          placeholder={t('events.create_event.desc')}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <TextInput
            value={''}
            onChange={() => null}
            placeholder={t('events.create_event.date')}
            icon="calendarDots"
            error={addressError}
          />
          <TextInput
            value={''}
            onChange={() => null}
            placeholder={'__:__'}
            icon="clock"
            error={addressError}
          />
        </View>
        <LocationInput
          value={eventAddress}
          onChange={setEventAddress}
          label={t('events.create_event.address')}
          placeholder={t('events.create_event.address')}
          icon="locationPoint"
        />
        <TextInput
          value={maxParticipants}
          onChange={setMaxParticipants}
          label={t('events.create_event.max_participants')}
          placeholder={t('events.create_event.max_participants')}
          icon="usersGroup"
          error={addressError}
          keyboardType="numeric"
        />
        <TextInput
          value={joinFee}
          onChange={setJoinFee}
          label={t('events.create_event.join_fee')}
          placeholder={t('events.create_event.join_fee')}
          icon="handMoney"
          error={addressError}
        />
        <TextInput
          value={organizerName}
          onChange={setOrganizerName}
          label={t('events.create_event.organizer')}
          placeholder={t('events.create_event.organizer')}
          icon="peopleCircle"
          error={addressError}
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
            {t('events.create_event.share_my_profile')}
          </Text>
          <Switch
            value={shareProfile}
            onChange={() => setShareProfile(!shareProfile)}
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

export default CreateEventScreen;
