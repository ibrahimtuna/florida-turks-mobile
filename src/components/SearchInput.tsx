import { TextInput, View } from 'react-native';
import Icon from './Icon.tsx';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
};

const SearchInput = ({ value, onChange, placeholder, autoFocus }: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#F1F1F3',
        padding: 10,
        borderRadius: 12,
        gap: 16,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Icon name="search" size="s" fill="#9A9AA5" />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#9A9AA5"
        autoFocus={autoFocus}
        style={{
          flex: 1,
        }}
      />
    </View>
  );
};

export default SearchInput;
