import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '../../components/Icon.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <SafeAreaView
      style={{
        padding: 16,
        gap: 16,
        flex: 1,
      }}
    >
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
          <Image
            source={require('../../assets/images/logo.png')}
            style={{
              height: 128,
              width: 128,
              borderRadius: 24,
            }}
          />
        </View>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 16,
            textAlign: 'center',
          }}
        >
          {t('forgot_password.title')}
        </Text>
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
            onPress={() => navigation.navigate('ForgotPasswordVerifyCode')}
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

export default ForgotPasswordScreen;
