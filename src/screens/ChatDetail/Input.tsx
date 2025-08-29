import { TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../../components/Icon.tsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Input = () => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={{
        paddingTop: 16,
        paddingBottom: bottom + 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        gap: 8,
        backgroundColor: '#fff',
      }}
    >
      <TextInput
        style={{
          flex: 1, // 👈 let flexbox manage width
          backgroundColor: 'white',
          color: '#1e1e1e',
          paddingHorizontal: 8,
          paddingVertical: 6,
          borderRadius: 8,
          textAlignVertical: 'top',
          minHeight: 32,
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
        style={{
          backgroundColor: 'red',
          height: 32,
          width: 32,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon name="send" fill="#fff" size="s" />
      </TouchableOpacity>
    </View>
  );
};

export default Input;
