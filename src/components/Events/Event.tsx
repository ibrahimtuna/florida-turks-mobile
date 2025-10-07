import {
  ActivityIndicator,
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '../Icon.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EVENT } from '../../store/types.ts';
import { cdnImage } from '../../helpers.ts';
import { useMemo, useState } from 'react';
import i18n from '../../i18n.ts';
import { useAppSelector } from '../../store';
import {
  REQUEST_JOIN_EVENT,
  REQUEST_WITHDRAW_EVENT,
} from '../../api/requests.ts';
import { useDispatch } from 'react-redux';
import { joinEvent, withdrawEvent } from '../../store/reducers/event.ts';

type Props = {
  item: EVENT;
};

const Event = ({ item }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { language } = i18n;
  const { categories } = useAppSelector(state => state.event);
  const { user } = useAppSelector(state => state.user);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isLoading, setIsLoading] = useState(false);

  const isJoined = useMemo(() => {
    return item.participants.find(i => i._id === user._id);
  }, [item.participants, user._id]);

  const categoryName = useMemo(() => {
    const foundCategory = categories.find(c => c._id === item.categoryId);
    if (!foundCategory) {
      return '';
    }
    return foundCategory[language === 'tr' ? 'turkishTitle' : 'englishTitle'];
  }, [language, categories, item.categoryId]);

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
            await REQUEST_JOIN_EVENT({ eventId: item._id });
            dispatch(
              joinEvent({
                eventId: item._id,
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
              await REQUEST_WITHDRAW_EVENT({ eventId: item._id });
              dispatch(withdrawEvent({ eventId: item._id, userId: user._id }));
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
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('EventDetail', {
          eventId: item._id,
        })
      }
      style={{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E1E2E4',
        borderRadius: 12,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
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
        source={{ uri: cdnImage(item.photoKey) }}
        style={{
          width: '100%',
          height: 200,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 12,
          gap: 12,
        }}
      >
        <Text
          style={{
            fontWeight: '400',
            fontSize: 12,
          }}
        >
          {item.title}
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
              gap: 4,
            }}
          >
            <Icon name="locationPoint" size="xs" fill="#808792" />
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                color: '#808792',
              }}
            >
              {item.location.displayName}
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
                fontWeight: '400',
                fontSize: 12,
                color: '#808792',
              }}
            >
              {t('events.participants', {
                total: item.participants?.length || 0,
                max: item.maxParticipants,
              })}
            </Text>
          </View>
        </View>
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
              gap: 4,
            }}
          >
            <Icon name="calendarDots" size="xs" fill="#808792" />
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                color: '#808792',
              }}
            >
              {new Date(item.date).toLocaleDateString()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Icon name="clock" size="xs" fill="#808792" />
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                color: '#808792',
              }}
            >
              {new Date(item.date).toLocaleTimeString()}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 12,
          }}
        >
          {item.desc}
        </Text>
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: '#000',
              }}
            >
              {t('events.organizer')}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: '#808792',
              }}
            >
              {item.organizer}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={isLoading}
            onPress={isJoined ? handleWithdraw : handleJoin}
            style={{
              backgroundColor: isJoined ? '#34C759' : '#E40E1A',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {isLoading && <ActivityIndicator color="#fff" />}
            <Text
              style={{
                fontWeight: '500',
                color: '#fff',
              }}
            >
              {t(isJoined ? 'commons.joined' : 'commons.join')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Event;
