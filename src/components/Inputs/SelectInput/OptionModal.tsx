import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import SearchInput from '../../SearchInput.tsx';
import { OPTION_ITEM } from './types.ts';

type Props = {
  visible: boolean;
  handleClose: () => void;
  options: OPTION_ITEM[];
  handleSelect: (item: OPTION_ITEM) => void;
  selected?: string;
};

const OptionModal = ({
  visible,
  handleClose,
  options,
  handleSelect,
  selected,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
      presentationStyle="overFullScreen"
    >
      {/* Backdrop */}
      <Pressable
        onPress={handleClose}
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'flex-end',
        }}
      >
        {/* Stop backdrop presses from bubbling when touching the sheet */}
        <Pressable
          onPress={() => {}}
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
          }}
        >
          {/* Bottom sheet */}
          <View
            style={{
              height: '50%',
              width: '100%',
              backgroundColor: '#fff',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
                marginBottom: 8,
                padding: 16,
              }}
            >
              <TouchableOpacity
                onPress={handleClose}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Text style={{ fontSize: 16 }}>{t('commons.close')}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 16, gap: 8 }}>
              <SearchInput />
              <ScrollView
                contentContainerStyle={{
                  gap: 8,
                  minHeight: 300,
                }}
              >
                {options.map(option => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleSelect(option)}
                    style={{
                      paddingVertical: 16,
                      paddingHorizontal: 8,
                      backgroundColor:
                        option.value === selected ? '#ddd' : '#f4f4f4',
                      borderRadius: 12,
                    }}
                  >
                    <Text>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default OptionModal;
