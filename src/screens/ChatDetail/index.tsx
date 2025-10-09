import {
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/core';
import { ChatStackParamList } from '../../Navigation.tsx';
import ChatHeader from '../../components/ChatHeader.tsx';
import Input from './Input.tsx';
import Message from './Message.tsx';
import { useState } from 'react';
import { useAppSelector } from '../../store';

type ChatDetailRouteProp = RouteProp<ChatStackParamList, 'ChatDetail'>;
const ChatDetailScreen = () => {
  const route = useRoute<ChatDetailRouteProp>();
  const { _id, name, surname, photoKey } = route.params;
  const { inbox } = useAppSelector(state => state.inbox);
  const [isHeaderMenuOpen, setIsHeaderMenuOpen] = useState(false);

  const foundChat = inbox.find(chat => chat.userId === _id);

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
          name={`${name} ${surname}`}
          profilePhotoUrl={photoKey}
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
          {foundChat?.messages.map(message => (
            <Message key={message._id} item={message} />
          ))}
        </ScrollView>
        <Input receiverId={_id} isChatExists={!!foundChat} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChatDetailScreen;
