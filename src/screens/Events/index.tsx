import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header.tsx';
import { useTranslation } from 'react-i18next';
import SearchInput from '../../components/SearchInput.tsx';
import HorizontalFilter from '../../components/HorizontalFilter.tsx';
import Icon from '../../components/Icon.tsx';
import Event from '../../components/Events/Event.tsx';
import i18n from '../../i18n.ts';
import { useAppSelector } from '../../store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { REQUEST_GET_EVENTS } from '../../api/requests.ts';
import { useDispatch } from 'react-redux';
import { setEvents } from '../../store/reducers/event.ts';
import { useDebounce } from '../../hooks/useDebounce.ts';

const EventsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { t } = useTranslation();
  const { language } = i18n;
  const { events, categories } = useAppSelector(state => state.event);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 2000);

  const CATEGORIES = useMemo(() => {
    return [
      {
        key: 'all',
        label: t('commons.all'),
      },
      ...categories.map(category => ({
        key: category._id,
        label:
          language === 'tr' ? category.turkishTitle : category.englishTitle,
      })),
    ];
  }, [t, categories, language]);

  useEffect(() => {
    console.log(debouncedSearch);
  }, [debouncedSearch]);

  const fetchEvents = useCallback(() => {
    setIsLoading(true);
    REQUEST_GET_EVENTS({
      page: 0,
      categoryId: selectedCategory !== 'all' ? selectedCategory : undefined,
    })
      .then(({ data }) => {
        console.log(data, '<-- data');
        dispatch(setEvents(data.items));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <Header
        title={t('tabs.events')}
        showRewards
        showAddWithText
        onAddButtonPress={() => navigation.navigate('CreateEvent')}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 12,
        }}
      >
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          placeholder={t('events.search_placeholder')}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <HorizontalFilter
            selected={selectedCategory}
            setSelected={setSelectedCategory}
            categories={CATEGORIES}
          />
          <TouchableOpacity activeOpacity={0.8}>
            <Icon name="map" size="m" fill="#808792" />
          </TouchableOpacity>
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          events?.map(event => <Event key={event._id} item={event} />)
        )}
      </ScrollView>
    </View>
  );
};

export default EventsScreen;
