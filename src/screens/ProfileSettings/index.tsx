import {
  ImageBackground,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SubHeader from '../../components/SubHeader.tsx';
import { useTranslation } from 'react-i18next';
import Icon from '../../components/Icon.tsx';

const ProfileSettingsScreen = () => {
  const { t } = useTranslation();
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
          <ImageBackground
            source={{ uri: 'https://randomuser.me/api/portraits/men/13.jpg' }}
            style={{
              height: 62,
              width: 62,
            }}
            imageStyle={{
              borderRadius: 31,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                height: 32,
                width: 32,
                borderRadius: 16,
                backgroundColor: '#E40E1A',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: -8,
                right: -8,
              }}
            >
              <Icon name="camera" fill="#fff" size="xs" />
            </TouchableOpacity>
          </ImageBackground>
        </View>

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
              value="Mehmet"
              style={{
                backgroundColor: '#7676801F',
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 12,
                marginTop: 4,
                fontSize: 16,
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
              value="Yılmaz"
              style={{
                backgroundColor: '#7676801F',
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 12,
                marginTop: 4,
                fontSize: 16,
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
            value="Merhabalar, ben Mehmet. 5 yıldır amerikada avukat olarak
            çalışmaktayım. Özellikle iş için yapılacak event’lerde sizlerle
            tanışmak isterim."
            placeholderTextColor="#8080808C"
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

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              color: '#8080808C',
            }}
          >
            {t('profile_settings.email')}
          </Text>
          <TextInput
            placeholder={t('profile_settings.email')}
            placeholderTextColor="#9A9AA5"
            editable={false}
            value="mehmet@gmail.com"
            style={{
              backgroundColor: '#7676801F',
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 12,
              marginTop: 4,
              fontSize: 16,
              opacity: 0.6,
            }}
          />
          <Text
            style={{
              fontSize: 12,
              color: '#8080808C',
              marginTop: 4,
            }}
          >
            {t('profile_settings.email_cannot_change')}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              color: '#8080808C',
            }}
          >
            {t('profile_settings.phone_number')}
          </Text>
          <TextInput
            placeholder={t('profile_settings.phone_number')}
            placeholderTextColor="#9A9AA5"
            editable={false}
            value="+1 543 733 8392"
            style={{
              backgroundColor: '#7676801F',
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 12,
              marginTop: 4,
              fontSize: 16,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              color: '#8080808C',
            }}
          >
            {t('profile_settings.location')}
          </Text>
          <View
            style={{
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
            <Icon name="locationPoint" fill="#808792" size="xs" />
            <TextInput
              placeholder={t('profile_settings.location')}
              placeholderTextColor="#9A9AA5"
              editable={false}
              value="Boston, MA"
              style={{
                fontSize: 16,
              }}
            />
          </View>
        </View>

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
          <Switch />
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
            style={{
              borderWidth: 1,
              borderColor: '#E40E1A',
              backgroundColor: '#E40E1A',
              flex: 1,
              alignItems: 'center',
              paddingVertical: 12,
              borderRadius: 12,
            }}
          >
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
