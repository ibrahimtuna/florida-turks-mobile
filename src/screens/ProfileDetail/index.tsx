import { SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import { cdnImage, navigationRef } from '../../helpers.ts';
import Icon from '../../components/Icon.tsx';
import { useCallback, useState } from 'react';
import {
  REQUEST_GET_PROFILE,
  REQUEST_GET_PROFILE_POSTS,
} from '../../api/requests.ts';
import { FEED, GET_PROFILE } from '../../store/types.ts';
import HomeFeed from '../../components/Home/HomeFeed.tsx';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../Navigation.tsx';
import { CommonActions } from '@react-navigation/native';

type ProfileDetailRouteProp = RouteProp<HomeStackParamList, 'ProfileDetail'>;
const ProfileDetailScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<ProfileDetailRouteProp>();
  const { t } = useTranslation();
  const { _id, name, surname, photoKey } = route.params;

  const [activeTab, setActiveTab] = useState<'posts' | 'about'>('posts');
  const [profile, setProfile] = useState<GET_PROFILE>();
  const [posts, setPosts] = useState<FEED[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const [profileRes, postsRes] = await Promise.all([
            REQUEST_GET_PROFILE({ userId: _id }),
            REQUEST_GET_PROFILE_POSTS({ userId: _id, page: 1 }),
          ]);

          setProfile(profileRes.data.profile);
          setPosts(postsRes.data.items);
          setPage(1);
          setTotalPages(postsRes.data.totalPages);
        } catch (err) {
          console.error('Failed to fetch profile or posts:', err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }, [_id]),
  );

  const loadMorePosts = async () => {
    if (isFetchingMore || page >= totalPages) return;
    setIsFetchingMore(true);

    try {
      const nextPage = page + 1;
      const res = await REQUEST_GET_PROFILE_POSTS({
        userId: _id,
        page: nextPage,
      });
      setPosts(prev => [...prev, ...res.data.items]);
      setPage(nextPage);
    } catch (err) {
      console.error('Error loading more posts:', err);
    } finally {
      setIsFetchingMore(false);
    }
  };

  const renderFooter = () =>
    isFetchingMore ? (
      <ActivityIndicator style={{ marginVertical: 20 }} />
    ) : null;

  const openChatDetail = () => {
    // 1️⃣ Reset Tab to Chat root
    navigationRef.current?.dispatch(
      CommonActions.reset({
        index: 0, // <-- root stack (Main)
        routes: [
          {
            name: 'Chat',
          },
        ],
      }),
    );

    // 2️⃣ Then navigate to ChatDetail after a small delay
    setTimeout(() => {
      navigation.navigate('Chat', {
        screen: 'ChatDetail',
        params: {
          _id,
          name,
          surname,
          photoKey,
        },
      });
    }, 300);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.imgTextContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.goBack()}
          >
            <Icon name="chevronLeft" size="m" />
          </TouchableOpacity>
          <Image
            source={{ uri: cdnImage(photoKey) }}
            style={styles.profileImg}
          />
          <Text
            style={styles.profileName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {`${name} ${surname}`}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.messageButton}
          onPress={openChatDetail}
        >
          <Icon name="message" size="s" fill="#626262" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabButtonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab('posts')}
          style={[
            styles.tabButton,
            { borderBottomColor: activeTab === 'posts' ? '#000' : '#ccc' },
          ]}
        >
          <Text>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveTab('about')}
          style={[
            styles.tabButton,
            { borderBottomColor: activeTab === 'about' ? '#000' : '#ccc' },
          ]}
        >
          <Text>Detail</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} />
      ) : activeTab === 'posts' ? (
        <FlatList
          data={[...posts].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )}
          keyExtractor={item => item._id}
          renderItem={({ item }) => <HomeFeed item={item} />}
          contentContainerStyle={{ padding: 16, gap: 16 }}
          onEndReached={loadMorePosts}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
        />
      ) : (
        <FlatList
          data={[{ key: 'about' }]}
          renderItem={() => (
            <View style={{ padding: 16, gap: 16 }}>
              <Text style={styles.headerText}>{t('profile_settings.bio')}</Text>
              <Text>{profile?.bio || '-'}</Text>
              <Text style={styles.headerText}>
                {t('profile_settings.location')}
              </Text>
              <Text>{profile?.location?.displayName || '-'}</Text>
              {profile?.email && (
                <>
                  <Text style={styles.headerText}>{t('commons.email')}</Text>
                  <Text>{profile.email}</Text>
                </>
              )}
              {profile?.phoneNumber && (
                <>
                  <Text style={styles.headerText}>
                    {t('profile_settings.phone_number')}
                  </Text>
                  <Text>{profile.phoneNumber}</Text>
                </>
              )}
              {profile?.createdAt && (
                <Text style={styles.headerText}>
                  {t('profile.member_since', {
                    date: moment(profile.createdAt).format('MM/DD/YYYY'),
                  })}
                </Text>
              )}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  imgTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  profileImg: {
    height: 48,
    width: 48,
    borderRadius: 24,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    maxWidth: 180,
  },
  messageButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#8080808C',
    padding: 8,
    borderRadius: 12,
  },
  tabButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
  },
  headerText: {
    fontWeight: '500',
    fontSize: 16,
  },
});

export default ProfileDetailScreen;
