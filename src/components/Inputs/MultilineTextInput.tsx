import { Text, View, TextInput as RNTextInput } from 'react-native';
import { useTranslation } from 'react-i18next';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const MultilineTextInput = ({ value, onChange, placeholder }: Props) => {
  const { t } = useTranslation();
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: '#8080808C',
        borderRadius: 12,
        height: 150,
      }}
    >
      <RNTextInput
        placeholder={placeholder}
        multiline
        numberOfLines={5}
        value={value}
        onChangeText={onChange}
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
            char: value.length || 0,
            total: 2500,
          })}
        </Text>
      </View>
    </View>
  );
};

export default MultilineTextInput;
