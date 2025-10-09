import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';
import Icon from './Icon.tsx';
import LocationInput from './Inputs/LocationInput';
import { FILTER_LOCATION, LOCATION } from './Inputs/LocationInput/types.ts';
import { useTranslation } from 'react-i18next';
import Slider from '@react-native-community/slider';

type Props = {
  defaultFilter: FILTER_LOCATION | undefined;
  setDefaultFilter: (filter: FILTER_LOCATION | undefined) => void;
};

const LocationFilter = ({ defaultFilter, setDefaultFilter }: Props) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  let defaultLocationData: LOCATION | undefined;
  let defaultDistance = 10;

  if (defaultFilter) {
    const { distance, ...rest } = defaultFilter;
    defaultLocationData = rest;
    defaultDistance = distance;
  }

  const [location, setLocation] = useState<LOCATION | undefined>(
    defaultLocationData,
  );
  const [distance, setDistance] = useState(defaultDistance);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    if (locationError) {
      setLocationError(!location);
    }
  }, [location, locationError]);

  const handleReset = () => {
    setLocation(undefined);
    setDistance(10);
    setDefaultFilter(undefined);
    setVisible(false);
  };

  const handleApply = () => {
    if (!location) {
      setLocationError(true);
      return;
    }
    setDefaultFilter({
      ...location,
      distance,
    });
    setVisible(false);
  };

  return (
    <>
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        presentationStyle="formSheet"
        animationType="slide"
      >
        <View style={styles.container}>
          <View style={styles.buttonRow}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleReset}>
              <Text style={styles.resetButtonText}>{t('commons.reset')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleApply}
              style={styles.applyButton}
            >
              <Text style={styles.applyButtonText}>{t('commons.apply')}</Text>
            </TouchableOpacity>
          </View>
          <LocationInput
            value={location}
            onChange={setLocation}
            isCities
            icon="locationPoint"
            placeholder={t('profile_settings.location')}
            label={t('profile_settings.location')}
            error={locationError}
          />

          <View>
            <View style={styles.sliderLabelContainer}>
              <Text
                style={{
                  color: '#8080808C',
                }}
              >
                {t('commons.distance')}
              </Text>
              <Text>
                {t('commons.miles', {
                  distance,
                })}
              </Text>
            </View>
            <Slider
              style={{ width: '100%', height: 40, marginTop: 4 }}
              minimumValue={1}
              maximumValue={100}
              value={distance}
              onValueChange={val => setDistance(Math.round(val))}
              minimumTrackTintColor="#FF0000"
              maximumTrackTintColor="#FF000060"
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setVisible(true)}>
        <Icon
          name="map"
          size="m"
          fill={defaultFilter ? '#E40E1A' : '#808792'}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16,
    gap: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resetButtonText: {
    color: '#5b5b5b',
    fontWeight: '500',
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#E40E1A',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  sliderLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default LocationFilter;
