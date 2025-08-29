import {
  Keyboard,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/core';
import { ChatStackParamList } from '../../Navigation.tsx';
import { MOCK_CHAT_ITEMS } from '../Chat/constants.ts';
import ChatHeader from '../../components/ChatHeader.tsx';
import Input from './Input.tsx';
import Message from './Message.tsx';
import { useState } from 'react';

type ChatDetailRouteProp = RouteProp<ChatStackParamList, 'ChatDetail'>;
const ChatDetailScreen = () => {
  const route = useRoute<ChatDetailRouteProp>();
  const { chatId } = route.params;
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  const foundChat = MOCK_CHAT_ITEMS.find(chat => chat.id === chatId);
  if (!foundChat) {
    return null;
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsHeaderMenuOpen(false);
        Keyboard.dismiss();
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <ChatHeader
          name={foundChat.name}
          profilePhotoUrl={foundChat.profilePhotoUrl}
          isMenuOpen={isHeaderMenuOpen}
          setIsMenuOpen={setIsHeaderMenuOpen}
        />
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            gap: 12,
            paddingTop: 12,
            paddingHorizontal: 16,
          }}
        >
          <Text
            style={{
              color: '#00000099',
              textAlign: 'center',
              paddingTop: 12,
            }}
          >
            Yesterday 9:41
          </Text>
          {foundChat.messages.map(message => (
            <Message key={message.id} item={message} />
          ))}
        </ScrollView>
        <Input />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatDetailScreen;
