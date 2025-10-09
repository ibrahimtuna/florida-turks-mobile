import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SubHeader from '../../components/SubHeader.tsx';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/core';
import { EventStackParamList } from '../../Navigation.tsx';
import Icon from '../../components/Icon.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import ParticipantsModal from '../../components/Events/ParticipantsModal.tsx';
import { useMemo, useState } from 'react';
import { useAppSelector } from '../../store';
import { cdnImage } from '../../helpers.ts';
import i18n from '../../i18n.ts';
import {
  REQUEST_JOIN_EVENT,
  REQUEST_WITHDRAW_EVENT,
} from '../../api/requests.ts';
import { joinEvent, withdrawEvent } from '../../store/reducers/event.ts';
import { useDispatch } from 'react-redux';

type EventDetailRouteProp = RouteProp<EventStackParamList, 'EventDetail'>;

const EventDetailScreen = () => {
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { language } = i18n;
  const { events, categories } = useAppSelector(state => state.event);
  const { user } = useAppSelector(state => state.user);
  const route = useRoute<EventDetailRouteProp>();
  const { eventId } = route.params;
  const event = events.find(item => item._id === eventId);
  const [showParticipants, setShowParticipants] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isJoined = useMemo(() => {
    if (!event) return false;
    return event.participants.find(i => i._id === user._id);
  }, [event, user._id]);

  const categoryName = useMemo(() => {
    if (!event) {
      return '';
    }
    const foundCategory = categories.find(c => c._id === event.categoryId);
    if (!foundCategory) {
      return '';
    }
    return foundCategory[language === 'tr' ? 'turkishTitle' : 'englishTitle'];
  }, [language, categories, event]);

  if (!event) {
    return null;
  }
  const openMap = () => {
    const scheme = Platform.select({
      ios: `maps:0,0?q=${event.title}@{event.location.lat},{event.location.lng}`,
      android: `geo:0,0?q={event.location.lat},{event.location.lng}(${event.title})`,
    });

    if (scheme) {
      Linking.openURL(scheme).catch(err =>
        console.error('Error opening map:', err),
      );
    }
  };

  const handleJoin = () => {
    Alert.alert(t('events.join_alert_title'), t('events.join_alert_desc'), [
      {
        text: t('commons.cancel'),
      },
      {
        text: t('commons.confirm'),
        onPress: async () => {
          try {
            setIsLoading(true);
            await REQUEST_JOIN_EVENT({ eventId: event._id });
            dispatch(
              joinEvent({
                eventId: event._id,
                participant: {
                  _id: user._id,
                  name: user.name,
                  surname: user.surname,
                  photoKey: user.photoKey,
                },
              }),
            );
          } catch (error) {
            console.error('Withdraw error:', error);
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const handleWithdraw = () => {
    Alert.alert(
      t('events.withdraw_event_title'),
      t('events.withdraw_event_desc'),
      [
        {
          text: t('commons.cancel'),
          style: 'cancel',
        },
        {
          text: t('events.withdraw_accept'),
          style: 'destructive',
          onPress: async () => {
            try {
              setIsLoading(true);
              await REQUEST_WITHDRAW_EVENT({ eventId: event._id });
              dispatch(withdrawEvent({ eventId: event._id, userId: user._id }));
            } catch (error) {
              console.error('Withdraw error:', error);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <ParticipantsModal
        visible={showParticipants}
        handleClose={() => setShowParticipants(false)}
        participants={event.participants}
      />
      <SubHeader title={t('events.event_detail.title')} />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 12,
          paddingBottom: bottom + 36,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 28,
            right: 28,
            backgroundColor: '#F1F2F5',
            paddingVertical: 8,
            paddingHorizontal: 10,
            zIndex: 99,
            borderRadius: 24,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#000000',
            }}
          >
            {categoryName}
          </Text>
        </View>
        <Image
          source={{ uri: cdnImage(event.photoKey) }}
          style={{ width: '100%', height: 200, borderRadius: 12 }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 24,
              flex: 1,
            }}
          >
            {event.title}
          </Text>
          <View
            style={{
              gap: 8,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={openMap}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: '#fff',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#8080808C',
                height: 42,
              }}
            >
              <Icon name="arrowSquare" size="s" fill="#626262" />
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 12,
                  color: '#626262',
                }}
              >
                {t('events.event_detail.directions')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={isJoined ? handleWithdraw : handleJoin}
              disabled={isLoading}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: isJoined ? '#34C759' : '#E40E1A',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: isJoined ? '#34C759' : '#E40E1A',
                height: 42,
              }}
            >
              {isLoading && <ActivityIndicator color="#fff" />}
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 12,
                  color: '#FFF',
                }}
              >
                {t(isJoined ? 'commons.joined' : 'commons.join')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Icon name="locationPoint" size="xs" fill="#808792" />
          <Text
            style={{
              fontSize: 12,
              color: '#808792',
            }}
          >
            {event.location.displayName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Icon name="calendarDots" size="xs" fill="#808792" />
          <Text
            style={{
              fontSize: 12,
              color: '#808792',
            }}
          >
            {new Date(event.date).toLocaleDateString()}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Icon name="usersGroup" size="xs" fill="#808792" />
          <Text
            style={{
              fontSize: 12,
              color: '#808792',
            }}
          >
            {t('events.participants', {
              total: event.participants.length,
              max: event.maxParticipants,
            })}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Icon name="moneyBag" size="xs" fill="#808792" />
          <Text
            style={{
              fontSize: 12,
              color: '#808792',
            }}
          >
            {!event.fee ? t('events.event_detail.free') : `$${event.fee}`}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: 1,
              width: '85%',
              backgroundColor: '#F1F2F5',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 16,
            color: '#000',
          }}
        >
          {t('events.organizer')}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Image
              source={{ uri: cdnImage(event.createdBy.photoKey) }}
              style={{
                height: 32,
                width: 32,
                borderRadius: 16,
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#000',
                }}
              >
                {event.createdBy.name}
              </Text>
              {event.organizer && (
                <Text
                  style={{
                    fontSize: 12,
                    color: '#808792',
                  }}
                >
                  {event.organizer}
                </Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: '#fff',
              borderWidth: 1,
              borderColor: '#8080808C',
              padding: 8,
              borderRadius: 12,
            }}
          >
            <Icon name="message" size="s" fill="#626262" />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            marginTop: 24,
          }}
        >
          {t('events.event_detail.event_details')}
        </Text>
        <Text
          style={{
            color: '#000',
            fontSize: 12,
          }}
        >
          {event.desc}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 24,
          }}
        >
          <Text
            style={{
              color: '#000',
              fontSize: 16,
            }}
          >
            {`${t('events.event_detail.participants')} ${t(
              'events.event_detail.person',
              { count: event.participants.length },
            )}`}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowParticipants(true)}
          >
            <Text
              style={{
                fontSize: 12,
                color: '#808792',
                textDecorationLine: 'underline',
              }}
            >
              {t('commons.see_all')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {event.participants.slice(0, 6).map(item => (
              <Image
                key={item._id}
                source={{ uri: cdnImage(item.photoKey) }}
                style={{
                  height: 32,
                  width: 32,
                  borderRadius: 16,
                }}
              />
            ))}
          </View>
          {event.participants.length > 6 ? (
            <Text
              style={{
                fontSize: 12,
                color: '#808792',
              }}
            >
              {t('events.event_detail.and_more', {
                count: event.participants.length - 6,
              })}
            </Text>
          ) : null}
        </View>
        <Text
          style={{
            color: '#000',
            fontSize: 16,
            marginTop: 24,
          }}
        >
          {t('events.event_detail.location')}
        </Text>
        <Text
          style={{
            color: '#1a1a1a',
            fontSize: 14,
          }}
        >
          {event.location.displayName}
        </Text>
        <Text
          style={{
            color: '#808792',
            fontSize: 12,
          }}
        >
          {event.location.formattedAddress}
        </Text>
        {event.location?.coords?.coordinates?.length === 2 && (
          <MapView
            initialRegion={{
              latitude: event.location.coords.coordinates[1],
              longitude: event.location.coords.coordinates[0],
              latitudeDelta: 0.0122,
              longitudeDelta: 0.0121,
            }}
            style={{
              width: '100%',
              height: 300,
              borderRadius: 12,
              overflow: 'hidden',
            }}
          >
            <Marker
              coordinate={{
                latitude: event.location.coords.coordinates[1],
                longitude: event.location.coords.coordinates[0],
              }}
            />
          </MapView>
        )}
      </ScrollView>
    </View>
  );
};

export default EventDetailScreen;
