import { Text, View, TouchableOpacity } from 'react-native';
import { IconName } from '../../../assets/icons/icons.ts';
import Icon from '../../Icon.tsx';
import { useState } from 'react';
import LocationModal from './LocationModal.tsx';
import { LOCATION } from './types.ts';

type Props = {
  value?: LOCATION;
  onChange: (value: LOCATION) => void;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  helperText?: string;
  icon?: IconName;
  error?: boolean;
  isCities?: boolean;
};

const LocationInput = ({
  value,
  onChange,
  disabled,
  label,
  placeholder,
  helperText,
  icon,
  error,
  isCities,
}: Props) => {
  const [locationModal, setLocationModal] = useState(false);
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <LocationModal
        visible={locationModal}
        handleClose={() => setLocationModal(false)}
        value={value}
        onChange={onChange}
        isCities={isCities}
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
        onPress={() => setLocationModal(true)}
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
            color: value ? '#1a1a1a' : '#9A9AA5',
            flex: 1,
          }}
        >
          {value?.displayName?.text || placeholder}
        </Text>
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

export default LocationInput;
