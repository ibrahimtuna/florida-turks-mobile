import { ScrollView, TouchableOpacity, View } from 'react-native';
import Header from '../../components/Header.tsx';
import HomeWelcome from '../../components/Home/HomeWelcome.tsx';
import HorizontalFilter from '../../components/HorizontalFilter.tsx';
import Icon from '../../components/Icon.tsx';
import HomeFeed from '../../components/Home/HomeFeed.tsx';
import { mockFeedItems } from './constants.ts';
import { useTranslation } from 'react-i18next';

const HomeScreen = () => {
  const { t } = useTranslation();

  const MOCK_CATEGORIES = [
    {
      key: 'all',
      label: t('home.categories.all'),
    },
    {
      key: 'greenCard',
      label: t('home.categories.greenCard'),
    },
    {
      key: 'jobPosts',
      label: t('home.categories.jobPosts'),
    },
    {
      key: 'celebrations',
      label: t('home.categories.celebrations'),
    },
  ];

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <Header title={t('tabs.home')} showRewards showSearch showAddIcon />
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
          <HorizontalFilter categories={MOCK_CATEGORIES} />
          <TouchableOpacity activeOpacity={0.8}>
            <Icon name="map" size="m" fill="#808792" />
          </TouchableOpacity>
        </View>
        {mockFeedItems.map(item => (
          <HomeFeed key={item._id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
