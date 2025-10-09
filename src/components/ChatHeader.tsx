import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from './Icon.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { cdnImage } from '../helpers.ts';

type Props = {
  name: string;
  profilePhotoUrl: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
};

const ChatHeader = ({
  name,
  profilePhotoUrl,
  isMenuOpen,
  setIsMenuOpen,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingTop: top + 8,
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 80,
        }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="chevronLeft" size="m" />
        <Text>{t('commons.back')}</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Image
          source={{
            uri: profilePhotoUrl ? cdnImage(profilePhotoUrl) : undefined,
          }}
          style={{ height: 32, width: 32, borderRadius: 16 }}
        />
        <Text style={{ fontSize: 14, color: '#000' }}>{name}</Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setIsMenuOpen(!isMenuOpen)}
        style={{
          width: 80,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Icon name="horizontalDots" size="m" />
      </TouchableOpacity>
      {isMenuOpen && (
        <View
          style={{
            position: 'absolute',
            top: top + 36,
            right: 20,
            zIndex: 99,
            gap: 12,
            paddingHorizontal: 12,
            paddingVertical: 24,
            backgroundColor: 'white',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#8080808C',
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 0.5,
              borderColor: '#FF3B30',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 12,
              minWidth: 150,
            }}
          >
            <Text>{t('chat.delete_chat')}</Text>
            <Icon name="trash" fill="#FF3B30" size="s" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderWidth: 0.5,
              borderColor: '#000000',
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 12,
              minWidth: 150,
            }}
          >
            <Text>{t('chat.report_chat')}</Text>
            <Icon name="flag" fill="#000000" size="s" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChatHeader;
