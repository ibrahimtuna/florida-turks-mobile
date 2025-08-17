import { TextInput, View } from 'react-native';
import Icon from './Icon.tsx';

type Props = {
  placeholder?: string;
};

const SearchInput = ({ placeholder }: Props) => {
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
      <TextInput placeholder={placeholder} placeholderTextColor="#9A9AA5" />
    </View>
  );
};

export default SearchInput;
