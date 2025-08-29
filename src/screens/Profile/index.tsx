import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header.tsx';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon.tsx';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <Header title={t('tabs.profile')} centered />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 12,
          paddingBottom: 32,
        }}
      >
        <View
          style={{
            borderColor: 'red',
            borderWidth: 1,
            backgroundColor: '#fff',
            paddingVertical: 32,
            paddingHorizontal: 24,
            borderRadius: 12,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Image
              source={{ uri: 'https://randomuser.me/api/portraits/men/13.jpg' }}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
                borderWidth: 1,
                borderColor: '#fff',
              }}
            />
          </View>
          <Text
            style={{
              color: '#1e1e1e',
              marginTop: 24,
              fontWeight: '600',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            Mehmet Yılmaz
          </Text>
          <Text
            style={{
              color: '#1e1e1e',
              marginTop: 24,
              fontWeight: '500',
              fontSize: 14,
              textAlign: 'center',
            }}
          >
            Merhabalar, ben Mehmet. 5 yıldır amerikada avukat olarak
            çalışmaktayım. Özellikle iş için yapılacak event’lerde sizlerle
            tanışmak isterim.
          </Text>
          <Text
            style={{
              color: '#1e1e1e',
              marginTop: 24,
              fontWeight: '400',
              fontSize: 20,
              marginBottom: 16,
            }}
          >
            {t('profile.contact_information')}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Icon name="calendar" fill="#1e1e1e" size="xs" />
            <Text
              style={{
                color: '#1e1e1e',
                fontSize: 16,
              }}
            >
              {t('profile.member_since', {
                date: '09/11/2020',
              })}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginTop: 16,
            }}
          >
            <Icon name="message" fill="#1e1e1e" size="xs" />
            <Text
              style={{
                color: '#1e1e1e',
                fontSize: 16,
              }}
            >
              mehmet@gmail.com
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginTop: 16,
            }}
          >
            <Icon name="locationPoint" fill="#1e1e1e" size="xs" />
            <Text
              style={{
                color: '#1e1e1e',
                fontSize: 16,
              }}
            >
              {t('profile.lives_in', {
                location: 'Boston, MA',
              })}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              marginTop: 16,
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: '#1e1e1e',
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 4,
                paddingHorizontal: 8,
                borderRadius: 12,
              }}
            >
              <Icon name="diamond" fill="#1e1e1e" size="s" />
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 14,
                  marginLeft: 8,
                }}
              >
                18
              </Text>
            </View>
            <Text
              style={{
                color: '#1e1e1e',
                fontSize: 16,
              }}
            >
              {t('profile.rewards')}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            marginTop: 12,
            borderWidth: 1,
            borderColor: '#8080808C',
            paddingHorizontal: 22,
            paddingVertical: 12,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
          onPress={() => navigation.navigate('ProfileSettings')}
        >
          <Icon name="settings" fill="#000" />
          <Text
            style={{
              fontSize: 12,
            }}
          >
            {t('profile.profile_settings')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            marginTop: 12,
            borderWidth: 1,
            borderColor: '#8080808C',
            paddingHorizontal: 22,
            paddingVertical: 12,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Icon name="logout" fill="#FF3B30" />
          <Text
            style={{
              fontSize: 12,
              color: '#FF3B30',
            }}
          >
            {t('profile.logout')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            marginTop: 24,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: '#FF3B30',
            }}
          >
            {t('profile.delete_account')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
