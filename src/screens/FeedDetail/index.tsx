import { ScrollView, Text, View } from 'react-native';
import SubHeader from '../../components/SubHeader.tsx';
import { useTranslation } from 'react-i18next';
import HomeFeed from '../../components/Home/HomeFeed.tsx';
import { mockComments, mockFeedItems } from '../Home/constants.ts';
import { RouteProp, useRoute } from '@react-navigation/core';
import { HomeStackParamList } from '../../Navigation.tsx';
import FeedComment from '../../components/Home/FeedComment.tsx';
import FeedDetailFooter from '../../components/Home/FeedDetailFooter.tsx';

type FeedDetailRouteProp = RouteProp<HomeStackParamList, 'FeedDetail'>;

const FeedDetailScreen = () => {
  const { t } = useTranslation();
  const route = useRoute<FeedDetailRouteProp>();
  const { feedId } = route.params;
  const foundFeed = mockFeedItems.find(item => item._id === feedId);

  if (!foundFeed) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <SubHeader title={t('home.feed_detail.comments')} />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <HomeFeed item={foundFeed} />
        <Text
          style={{
            marginVertical: 16,
            fontSize: 14,
            color: '#000',
          }}
        >
          {t('home.feed_detail.comments')} (5)
        </Text>
        {mockComments.map(item => (
          <FeedComment key={item._id} item={item} />
        ))}
      </ScrollView>
      <FeedDetailFooter />
    </View>
  );
};

export default FeedDetailScreen;
