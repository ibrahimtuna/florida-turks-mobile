import { CHAT_ITEM } from './constants.ts';
import { Image, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  item: CHAT_ITEM;
};

const ChatItem = ({ item }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
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
        source={{ uri: item.profilePhotoUrl }}
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
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#808792',
              marginTop: 12,
            }}
          >
            {item.lastMessage}
          </Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text
            style={{
              fontSize: 12,
              color: '#808792',
            }}
          >
            {new Date(item.lastMessageDate).toLocaleDateString()}
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
