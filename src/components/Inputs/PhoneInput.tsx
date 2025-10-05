import { useMemo, useRef } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import PhoneInputComponent, {
  PhoneInputRefType,
} from '@linhnguyen96114/react-native-phone-input';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onFormattedValueChange: (value: string) => void;
  setIsValid: (value: boolean) => void;
  error: boolean;
  countryCode?: string;
};

const PhoneInput = ({
  value,
  onChange,
  onFormattedValueChange,
  setIsValid,
  error,
  countryCode,
}: Props) => {
  const { t } = useTranslation();
  const phoneInput = useRef<PhoneInputRefType>(null);

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
      <Text style={{ color: '#8080808C' }}>
        {t('profile_settings.phone_number')}
      </Text>

      <PhoneInputComponent
        key={countryCode}
        ref={phoneInput}
        defaultValue={value}
        defaultCode={countryCode || 'US'}
        layout="first"
        onChangeText={text => {
          onChange(text);
          const checkValid = phoneInput.current?.isValidNumber(text);
          setIsValid(!!checkValid);
        }}
        onChangeFormattedText={onFormattedValueChange}
        containerStyle={{
          width: '100%',
          height: 48,
          backgroundColor: '#7676801F',
          borderRadius: 12,
          marginTop: 4,
          borderWidth: 1,
          borderColor: error ? '#ff0000' : '#7676801F',
        }}
      />
    </View>
  );
};

export default PhoneInput;
