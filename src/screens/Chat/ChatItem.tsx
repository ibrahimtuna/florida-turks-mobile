import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { INBOX } from '../../store/types.ts';
import { cdnImage } from '../../helpers.ts';

type Props = {
  item: INBOX;
};

const ChatItem = ({ item }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const lastMessage = [...item.messages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )?.[0];

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('ChatDetail', {
          _id: item.user._id,
          name: item.user.name,
          surname: item.user.surname,
          photoKey: item.user.photoKey,
        });
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#fff',
        padding: 12,
        borderWidth: 1,
        borderColor: '#E1E2E4',
        borderRadius: 12,
      }}
    >
      <Image
        source={{ uri: cdnImage(item.user.photoKey) }}
        style={{ height: 42, width: 42, borderRadius: 21 }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 12,
              color: '#000',
            }}
          >
            {`${item.user.name} ${item.user.surname}`}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#808792',
              marginTop: 12,
            }}
          >
            {lastMessage?.content}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={{
              fontSize: 12,
              color: '#808792',
            }}
          >
            {new Date(lastMessage?.createdAt).toLocaleDateString()}
          </Text>
          <View
            style={{
              marginTop: 12,
              height: 18,
              width: 27,
              backgroundColor: item.unreadCount ? '#E40E1A' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
            }}
          >
            {item.unreadCount && (
              <Text
                style={{
                  fontSize: 12,
                  color: '#fff',
                }}
              >
                {item.unreadCount}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatItem;
