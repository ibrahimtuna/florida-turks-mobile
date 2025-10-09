import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../../components/Icon.tsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  REQUEST_GET_MESSAGES,
  REQUEST_SEND_MESSAGE,
} from '../../api/requests.ts';
import { addMessage, setInbox } from '../../store/reducers/inbox.ts';
import { useDispatch } from 'react-redux';

type Props = {
  receiverId: string;
  isChatExists: boolean;
};

const Input = ({ receiverId, isChatExists }: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = (content: string) => {
    if (!content) {
      return;
    }
    setIsSending(true);
    REQUEST_SEND_MESSAGE({
      receiverId,
      content,
    })
      .then(({ data }) => {
        if (!isChatExists) {
          REQUEST_GET_MESSAGES().then(res =>
            dispatch(setInbox(res.data.conversations)),
          );
          return;
        }
        dispatch(
          addMessage({
            userId: receiverId,
            message: {
              _id: data.message._id,
              content: data.message.content,
              createdAt: data.message.createdAt,
              receiverId: data.message.receiverId,
              senderId: data.message.senderId,
              status: 'sent',
            },
          }),
        );
        setMessage('');
      })
      .finally(() => setIsSending(false));
  };

  return (
    <View
      style={{
        paddingTop: 16,
        paddingBottom: bottom + 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#fff',
      }}
    >
      <TextInput
        style={{
          flex: 1,
          backgroundColor: 'white',
          color: '#1e1e1e',
          paddingHorizontal: 8,
          paddingVertical: 6,
          borderRadius: 8,
          textAlignVertical: 'top',
          minHeight: 52,
          maxHeight: 120,
          borderWidth: 1,
          borderColor: isFocused ? '#FF3B30' : '#8080808C',
        }}
        value={message}
        onChangeText={setMessage}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        multiline
        numberOfLines={3}
        placeholder={t('chat.input_placeholder')}
        placeholderTextColor="#8080808C"
      />
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={!message.length || isSending}
        onPress={() => handleSendMessage(message)}
        style={{
          backgroundColor: 'red',
          height: 32,
          width: 32,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isSending ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Icon name="send" fill="#fff" size="s" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Input;
