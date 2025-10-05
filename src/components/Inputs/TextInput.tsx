import { Text, View, TextInput as RNTextInput } from 'react-native';
import { IconName } from '../../assets/icons/icons.ts';
import Icon from '../Icon.tsx';

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  helperText?: string;
  icon?: IconName;
  error?: boolean;
  autoCapitalize?: RNTextInput['props']['autoCapitalize'];
  keyboardType?: RNTextInput['props']['keyboardType'];
};

const TextInput = ({
  label,
  placeholder,
  value,
  onChange,
  disabled,
  helperText,
  icon,
  error,
  autoCapitalize,
  keyboardType,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
      }}
    >
      {label && (
        <Text
          style={{
            color: '#8080808C',
          }}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          backgroundColor: '#7676801F',
          borderWidth: 1,
          borderColor: error ? '#ff0000' : '#7676801F',
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 12,
          marginTop: 4,
          opacity: disabled ? 0.6 : 1,
          height: 48,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {icon && <Icon name={icon} size="xs" fill="#808792" />}
        <RNTextInput
          placeholder={placeholder}
          placeholderTextColor="#9A9AA5"
          editable={!disabled}
          value={value}
          onChangeText={onChange}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          style={{
            fontSize: 16,
            color: '#1a1a1a',
            flex: 1,
          }}
        />
      </View>
      {helperText && (
        <Text
          style={{
            fontSize: 12,
            color: '#8080808C',
            marginTop: 4,
          }}
        >
          {helperText}
        </Text>
      )}
    </View>
  );
};

export default TextInput;
