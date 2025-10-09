import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchInput from '../../SearchInput.tsx';
import axios from 'axios';
import { useDebounce } from '../../../hooks/useDebounce.ts';
import { LOCATION } from './types.ts';

type Props = {
  visible: boolean;
  handleClose: () => void;
  value?: LOCATION;
  onChange: (value: LOCATION) => void;
  isCities?: boolean;
};

const LocationModal = ({
  value,
  onChange,
  visible,
  handleClose,
  isCities,
}: Props) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 2000);
  const [locations, setLocations] = useState<LOCATION[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!debouncedSearch.trim()) return;
    const fetchPlaces = async () => {
      try {
        setIsSearching(true);
        const { data } = await axios.post(
          'https://places.googleapis.com/v1/places:searchText',
          { textQuery: debouncedSearch },
        );
        const newLocations: LOCATION[] = isCities
          ? data.places.filter(
              (p: any) =>
                p.types.includes('locality') || p.types.includes('political'),
            )
          : data.places;
        setLocations(newLocations);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    };
    fetchPlaces();
  }, [isCities, debouncedSearch]);

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
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{
              width: '100%',
              justifyContent: 'flex-end',
              flex: 1,
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

              {/* Content */}
              <View style={{ paddingHorizontal: 16, gap: 8, flex: 1 }}>
                <SearchInput
                  value={searchText}
                  onChange={setSearchText}
                  placeholder={t('commons.search_location')}
                  autoFocus
                />

                <ScrollView
                  keyboardShouldPersistTaps="handled"
                  contentContainerStyle={{
                    gap: 8,
                    paddingBottom: 40,
                  }}
                >
                  {isSearching ? (
                    <ActivityIndicator />
                  ) : (
                    locations.map((location, i) => (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        key={i}
                        onPress={() => {
                          onChange(location);
                          handleClose();
                        }}
                        style={{
                          paddingVertical: 16,
                          paddingHorizontal: 8,
                          backgroundColor:
                            location.id === value?.id ? '#ddd' : '#f4f4f4',
                          borderRadius: 12,
                        }}
                      >
                        <Text>{location.displayName.text}</Text>
                        <Text style={{ color: '#6a6a6a', marginTop: 4 }}>
                          {location.formattedAddress}
                        </Text>
                      </TouchableOpacity>
                    ))
                  )}
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Pressable>
    </Modal>
  );
};

export default LocationModal;
