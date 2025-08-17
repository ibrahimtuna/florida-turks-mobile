import { ScrollView, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header.tsx';
import { useTranslation } from 'react-i18next';
import SearchInput from '../../components/SearchInput.tsx';
import HorizontalFilter from '../../components/HorizontalFilter.tsx';
import Icon from '../../components/Icon.tsx';
import { MOCK_EVENTS } from './constants.ts';
import Event from '../../components/Events/Event.tsx';

const EventsScreen = () => {
  const { t } = useTranslation();

  const MOCK_CATEGORIES = [
    {
      key: 'all',
      label: t('events.categories.all'),
    },
    {
      key: 'cultural',
      label: t('events.categories.cultural'),
    },
    {
      key: 'business',
      label: t('events.categories.business'),
    },
    {
      key: 'social',
      label: t('events.categories.social'),
    },
  ];

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <Header title={t('tabs.events')} showRewards showAddWithText />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 12,
        }}
      >
        <SearchInput placeholder={t('events.search_placeholder')} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <HorizontalFilter categories={MOCK_CATEGORIES} />
          <TouchableOpacity activeOpacity={0.8}>
            <Icon name="map" size="m" fill="#808792" />
          </TouchableOpacity>
        </View>
        {MOCK_EVENTS.map(event => (
          <Event key={event.id} item={event} />
        ))}
      </ScrollView>
    </View>
  );
};

export default EventsScreen;
