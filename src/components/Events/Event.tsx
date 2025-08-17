import { Image, Text, TouchableOpacity, View } from 'react-native';
import { EVENT } from '../../screens/Events/constants.ts';
import Icon from '../Icon.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  item: EVENT;
};

const Event = ({ item }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('EventDetail', {
          eventId: item.id,
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
          {t(`events.categories.${item.category}`)}
        </Text>
      </View>
      <Image
        source={{ uri: item.coverPhotoUrl }}
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
              {item.location.name}
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
                total: item.totalParticipants,
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
              {item.organizer.name}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: '#E40E1A',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontWeight: '500',
                color: '#fff',
              }}
            >
              {t('commons.join')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Event;
