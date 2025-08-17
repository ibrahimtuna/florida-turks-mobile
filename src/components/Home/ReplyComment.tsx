import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from '../Icon.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const ReplyComment = () => {
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const [comment, setComment] = useState('');

  return (
    <View
      style={{
        paddingLeft: 40,
        marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          gap: 8,
        }}
      >
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/94.jpg' }}
          style={{
            height: 32,
            width: 32,
            borderRadius: 16,
          }}
        />
        <TextInput
          multiline
          numberOfLines={3}
          maxLength={500}
          value={comment}
          onChangeText={setComment}
          placeholder={t('home.feed_detail.comment_placeholder')}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: 'red',
            height: 75,
            borderRadius: 12,
            padding: 8,
            paddingTop: 10,
            textAlignVertical: 'top',
          }}
          placeholderTextColor="#8080808C"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 40,
          marginTop: 8,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: '#000',
          }}
        >
          {comment.length}/500
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => null}
            style={{
              backgroundColor: '#fff',
              padding: 8,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Text
              style={{
                fontWeight: '400',
                color: '#000',
                fontSize: 12,
              }}
            >
              {t('commons.cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => null}
            style={{
              backgroundColor: '#E40E1A',
              padding: 8,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Icon name="send" fill="#fff" size="xs" />
            <Text
              style={{
                fontWeight: '600',
                color: '#fff',
                fontSize: 12,
              }}
            >
              {t('commons.send')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ReplyComment;
