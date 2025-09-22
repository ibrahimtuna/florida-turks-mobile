import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '../../components/Icon.tsx';
import { useTranslation } from 'react-i18next';
import OtpVerifyModal from './OtpVerifyModal.tsx';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/core';

const OnboardingScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [otpModal, setOtpModal] = useState(false);

  return (
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
        phoneNumber="'+1 777 666 55 44"
        onVerify={() => console.log('Login finalized')}
      />
      <ScrollView
        style={{
          padding: 16,
        }}
        contentContainerStyle={{
          gap: 16,
          paddingBottom: 32,
          flex: 1,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <ImageBackground
            source={{ uri: 'https://randomuser.me/api/portraits/menss/13.jpg' }}
            style={{
              height: 62,
              width: 62,
              backgroundColor: '#ccc',
              borderRadius: 36,
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
              style={{
                backgroundColor: '#7676801F',
                paddingVertical: 10,
                paddingHorizontal: 12,
                borderRadius: 12,
                marginTop: 4,
                fontSize: 16,
                letterSpacing: 0,
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
              style={{
                backgroundColor: '#7676801F',
                paddingVertical: 10,
                paddingHorizontal: 12,
                letterSpacing: 0,
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
            {t('profile_settings.phone_number')}
          </Text>
          <TextInput
            placeholder={t('profile_settings.phone_number')}
            placeholderTextColor="#9A9AA5"
            editable={false}
            style={{
              backgroundColor: '#7676801F',
              paddingVertical: 10,
              paddingHorizontal: 12,
              borderRadius: 12,
              marginTop: 4,
              fontSize: 16,
              letterSpacing: 0,
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
            onPress={() => setOtpModal(true)}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
