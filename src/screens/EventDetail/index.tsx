import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SubHeader from '../../components/SubHeader.tsx';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/core';
import { EventStackParamList } from '../../Navigation.tsx';
import { MOCK_EVENTS } from '../Events/constants.ts';
import Icon from '../../components/Icon.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import ParticipantsModal from '../../components/Events/ParticipantsModal.tsx';
import { useState } from 'react';

type EventDetailRouteProp = RouteProp<EventStackParamList, 'EventDetail'>;

const EventDetailScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const route = useRoute<EventDetailRouteProp>();
  const { eventId } = route.params;
  const event = MOCK_EVENTS.find(item => item.id === eventId);
  const [showParticipants, setShowParticipants] = useState(false);

  if (!event) {
    return null;
  }

  const handlePromptJoinEvent = () => {
    Alert.alert(t('events.join_alert_title'), t('events.join_alert_desc'), [
      {
        text: t('commons.cancel'),
      },
      {
        text: t('commons.confirm'),
      },
    ]);
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
            {t(`events.categories.${event.category}`)}
          </Text>
        </View>
        <Image
          source={{ uri: event.coverPhotoUrl }}
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
              onPress={handlePromptJoinEvent}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: '#E40E1A',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#E40E1A',
                height: 42,
              }}
            >
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 12,
                  color: '#FFF',
                }}
              >
                {t('commons.join')}
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
            {event.location.name}
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
              total: event.totalParticipants,
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
              source={{ uri: event.organizer.profile.profileUrl }}
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
                {event.organizer.profile.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#808792',
                }}
              >
                {event.organizer.name}
              </Text>
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
              { count: event.totalParticipants },
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
                key={item.id}
                source={{ uri: item.photoUrl }}
                style={{
                  height: 32,
                  width: 32,
                  borderRadius: 16,
                }}
              />
            ))}
          </View>
          <Text
            style={{
              fontSize: 12,
              color: '#808792',
            }}
          >
            {t('events.event_detail.and_more', { count: 18 })}
          </Text>
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
            color: '#808792',
            fontSize: 12,
          }}
        >
          {event.location.name}
        </Text>
        <MapView
          initialRegion={{
            latitude: event.location.lat,
            longitude: event.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
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
              latitude: event.location.lat,
              longitude: event.location.lng,
            }}
          />
        </MapView>
      </ScrollView>
    </View>
  );
};

export default EventDetailScreen;
