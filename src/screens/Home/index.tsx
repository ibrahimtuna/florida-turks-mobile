import { ActivityIndicator, ScrollView, View } from 'react-native';
import Header from '../../components/Header.tsx';
import HomeWelcome from '../../components/Home/HomeWelcome.tsx';
import HorizontalFilter from '../../components/HorizontalFilter.tsx';
import HomeFeed from '../../components/Home/HomeFeed.tsx';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import i18n from '../../i18n.ts';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { REQUEST_GET_FEEDS } from '../../api/requests.ts';
import { useDispatch } from 'react-redux';
import { setFeed } from '../../store/reducers/feed.ts';
import LocationFilter from '../../components/LocationFilter.tsx';
import { FILTER_LOCATION } from '../../components/Inputs/LocationInput/types.ts';

const HomeScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { language } = i18n;
  const { feed, categories } = useAppSelector(state => state.feed);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [filterLocation, setFilterLocation] = useState<FILTER_LOCATION>();

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

  const fetchFeeds = useCallback(() => {
    setIsLoading(true);
    REQUEST_GET_FEEDS({
      page: 0,
      categoryId: selectedCategory !== 'all' ? selectedCategory : undefined,
      location: filterLocation
        ? {
            lat: filterLocation.location.latitude,
            lon: filterLocation.location.longitude,
            distance: filterLocation.distance,
          }
        : undefined,
    })
      .then(({ data }) => {
        console.log('FEEDS', data);
        dispatch(setFeed(data.items));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, selectedCategory, filterLocation]);

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <Header
        title={t('tabs.home')}
        showRewards
        showSearch
        showAddIcon
        onAddButtonPress={() => navigation.navigate('CreateFeed')}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 12,
        }}
      >
        <HomeWelcome />
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
          <LocationFilter
            defaultFilter={filterLocation}
            setDefaultFilter={setFilterLocation}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          [...feed]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map(item => <HomeFeed key={item._id} item={item} />)
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
