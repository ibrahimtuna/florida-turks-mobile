import { ScrollView, Text, View } from 'react-native';
import SubHeader from '../../components/SubHeader.tsx';
import { useTranslation } from 'react-i18next';
import HomeFeed from '../../components/Home/HomeFeed.tsx';
import { RouteProp, useRoute } from '@react-navigation/core';
import { HomeStackParamList } from '../../Navigation.tsx';
import FeedComment from '../../components/Home/FeedComment.tsx';
import FeedDetailFooter from '../../components/Home/FeedDetailFooter.tsx';
import { useAppSelector } from '../../store';

type FeedDetailRouteProp = RouteProp<HomeStackParamList, 'FeedDetail'>;

const FeedDetailScreen = () => {
  const { t } = useTranslation();
  const route = useRoute<FeedDetailRouteProp>();
  const { feedId } = route.params;
  const { feed } = useAppSelector(state => state.feed);
  const foundFeed = feed.find(item => item._id === feedId);

  console.log('found feed', foundFeed);

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
          {t('home.feed_detail.comments')} ({foundFeed.comments.length})
        </Text>
        {[...foundFeed.comments]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map(item => (
            <FeedComment
              key={item._id}
              item={item}
              type="feed"
              hocId={feedId}
            />
          ))}
      </ScrollView>
      <FeedDetailFooter type="feed" hocId={feedId} />
    </View>
  );
};

export default FeedDetailScreen;
