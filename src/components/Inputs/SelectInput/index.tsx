import {
  Text,
  View,
  TextInput as RNTextInput,
  TouchableOpacity,
} from 'react-native';
import { IconName } from '../../../assets/icons/icons.ts';
import Icon from '../../Icon.tsx';
import { useState } from 'react';
import OptionModal from './OptionModal.tsx';
import { OPTION_ITEM } from './types.ts';

type Props = {
  value: string;
  onChange: (value: string) => void;
  options: OPTION_ITEM[];
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  helperText?: string;
  icon?: IconName;
  error?: boolean;
};

const SelectInput = ({
  label,
  options,
  placeholder,
  value,
  onChange,
  disabled,
  helperText,
  icon,
  error,
}: Props) => {
  const [optionsModal, setOptionsModal] = useState(false);
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
      }}
    >
      <OptionModal
        visible={optionsModal}
        handleClose={() => setOptionsModal(false)}
        options={options}
        handleSelect={o => {
          onChange(o.value);
          setOptionsModal(false);
        }}
        selected={value}
      />
      {label && (
        <Text
          style={{
            color: '#8080808C',
          }}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOptionsModal(true)}
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
        <Text
          style={{
            fontSize: 16,
            color: options.find(o => o.value === value)?.label
              ? '#1a1a1a'
              : '#9A9AA5',
            flex: 1,
          }}
        >
          {options.find(o => o.value === value)?.label || placeholder}
        </Text>
        <Icon name="chevronDown" size="xs" fill="#808792" />
      </TouchableOpacity>
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

export default SelectInput;
