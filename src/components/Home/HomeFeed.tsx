import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../Icon.tsx';
import { useTranslation } from 'react-i18next';
import FeedActionButtons from './FeedActionButtons.tsx';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FEED } from '../../store/types.ts';
import { cdnImage } from '../../helpers.ts';
import { useMemo } from 'react';
import { useAppSelector } from '../../store';
import i18n from '../../i18n.ts';

type Props = {
  item: FEED;
};

const HomeFeed = ({ item }: Props) => {
  const { t } = useTranslation();
  const { language } = i18n;
  const { categories } = useAppSelector(state => state.feed);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleNavigateFeed = (feedId: string) => {
    navigation.navigate('FeedDetail', {
      feedId,
    });
  };

  const categoryName = useMemo(() => {
    const foundCategory = categories.find(c => c._id === item.feedCategoryId);
    if (!foundCategory) {
      return '';
    }
    return foundCategory[language === 'tr' ? 'turkishTitle' : 'englishTitle'];
  }, [language, categories, item]);

  if (item.kind === 'ad') {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: '#E1E2E4',
          padding: 12,
          borderRadius: 12,
          gap: 16,
        }}
        onPress={() => handleNavigateFeed(item._id)}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#808792',
              marginBottom: 2,
            }}
          >
            {t('home.feed.sponsored')}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 12,
          }}
        >
          {item.context}
        </Text>
        {item.photoKey && (
          <Image
            source={{ uri: cdnImage(item.photoKey) }}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 12,
            }}
          />
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: item.location ? 'space-between' : 'flex-end',
          }}
        >
          {item.location && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Icon name="locationPoint" size="xs" fill="#808792" />
              <Text
                style={{
                  fontSize: 12,
                  color: '#808792',
                }}
              >
                {item.location}
              </Text>
            </View>
          )}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={{
              backgroundColor: '#E40E1A',
              paddingVertical: 8,
              paddingHorizontal: 16,
              borderRadius: 24,
            }}
          >
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 14,
              }}
            >
              {item.ctaButtonText}
            </Text>
          </TouchableOpacity>
        </View>
        <FeedActionButtons
          commentCount={item.comments.length}
          likeCount={item.likeCount}
        />
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#E1E2E4',
        padding: 12,
        borderRadius: 12,
        gap: 16,
      }}
      onPress={() => handleNavigateFeed(item._id)}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Image
            source={{ uri: cdnImage(item.createdBy.photoKey) }}
            style={{ height: 32, width: 32, borderRadius: 16 }}
          />
          <View>
            <Text
              style={{
                fontSize: 12,
                color: '#000000',
                marginBottom: 2,
              }}
            >
              {`${item.createdBy.name} ${item.createdBy.surname}`}
            </Text>
            {item.location && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Icon name="locationPoint" size="xs" fill="#808792" />
                <Text
                  style={{
                    fontSize: 12,
                    color: '#808792',
                  }}
                >
                  {item.location}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: '#808792',
              marginBottom: 2,
            }}
          >
            {categoryName}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#808792',
            }}
          >
            2 saat önce
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontSize: 12,
        }}
      >
        {item.context}
      </Text>
      {item.photoKey && (
        <Image
          source={{ uri: cdnImage(item.photoKey) }}
          style={{
            width: '100%',
            height: 200,
            borderRadius: 12,
          }}
        />
      )}
      <FeedActionButtons
        commentCount={item.comments.length}
        likeCount={item.likeCount}
      />
    </TouchableOpacity>
  );
};

export default HomeFeed;
