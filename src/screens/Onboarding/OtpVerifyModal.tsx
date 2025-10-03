import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { REQUEST_VERIFY_OTP } from '../../api/requests.ts';
import Toast from 'react-native-toast-message';

type OtpVerifyModalProps = {
  visible: boolean;
  phoneNumber: string;
  onClose: () => void;
  onVerify: (code: string) => void;
};

const OtpVerifyModal: React.FC<OtpVerifyModalProps> = ({
  visible,
  phoneNumber,
  onClose,
  onVerify,
}) => {
  const { t } = useTranslation();
  const [otp, setOtp] = useState('');
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);

  const handleVerify = () => {
    setIsVerifyLoading(true);
    REQUEST_VERIFY_OTP({
      phoneNumber,
      code: otp,
    })
      .then(() => {
        setOtp('');
        onVerify(otp);
        onClose();
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: err.response?.data?.message || 'Server error',
        });
      })
      .finally(() => setIsVerifyLoading(false));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.keyboardAvoid}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <View style={styles.headerLine} />

              <Text style={styles.title}>{t('onboarding.otp_title')}</Text>
              <Text style={styles.subtitle}>
                {t('onboarding.otp_desc', {
                  phoneNumber,
                })}
              </Text>

              <TextInput
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                autoFocus
                placeholder="••••••"
                placeholderTextColor="#B0B0B0"
              />

              <TouchableOpacity
                style={[styles.button, otp.length < 6 && { opacity: 0.5 }]}
                disabled={otp.length < 6}
                onPress={handleVerify}
              >
                {isVerifyLoading && (
                  <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
                )}
                <Text style={styles.buttonText}>{t('commons.confirm')}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose}>
                <Text style={styles.closeText}>{t('commons.cancel')}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  headerLine: {
    width: 50,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#ccc',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: '#000',
    fontSize: 24,
    letterSpacing: 12,
    textAlign: 'center',
    width: '80%',
    marginBottom: 32,
    paddingVertical: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E40E1A',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  closeText: {
    color: '#666',
    fontSize: 14,
  },
});

export default OtpVerifyModal;
