import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Icon from '../Icon.tsx';
import { useState } from 'react';
import { useAppSelector } from '../../store';
import { cdnImage } from '../../helpers.ts';
import { REQUEST_CREATE_COMMENT } from '../../api/requests.ts';
import { useDispatch } from 'react-redux';
import { addFeedComment } from '../../store/reducers/feed.ts';
import { addCompanyComment } from '../../store/reducers/company.ts';

type Props = {
  hocId: string;
  type: 'feed' | 'company';
};

const FeedDetailFooter = ({ hocId, type }: Props) => {
  const dispatch = useDispatch();
  const { user } = useAppSelector(state => state.user);
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateComment = () => {
    if (!hocId) {
      return;
    }
    setIsLoading(true);
    REQUEST_CREATE_COMMENT({
      hocId,
      type,
      context: comment,
    })
      .then(({ data }) => {
        console.log('data ', data);
        if (type === 'feed') {
          dispatch(
            addFeedComment({
              feedId: data.feedId,
              comment: {
                createdAt: data.comment.createdAt,
                context: data.comment.context,
                _id: data.comment._id,
                likeCount: 0,
                isLiked: false,
                subComments: [],
                createdBy: {
                  _id: user._id,
                  name: user.name,
                  surname: user.surname,
                  photoKey: user.photoKey,
                },
              },
            }),
          );
        } else {
          dispatch(
            addCompanyComment({
              companyId: data.companyId,
              comment: {
                createdAt: data.comment.createdAt,
                context: data.comment.context,
                _id: data.comment._id,
                likeCount: 0,
                isLiked: false,
                subComments: [],
                createdBy: {
                  _id: user._id,
                  name: user.name,
                  surname: user.surname,
                  photoKey: user.photoKey,
                },
              },
            }),
          );
        }
        setComment('');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <View
      style={{
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: bottom + 8,
        backgroundColor: '#fff',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          gap: 8,
        }}
      >
        <Image
          source={{ uri: cdnImage(user.photoKey) }}
          style={{
            height: 32,
            width: 32,
            borderRadius: 16,
          }}
        />
        <TextInput
          multiline
          numberOfLines={3}
          maxLength={500}
          value={comment}
          onChangeText={setComment}
          placeholder={t('home.feed_detail.comment_placeholder')}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: '#8080808C',
            height: 75,
            borderRadius: 12,
            padding: 8,
            paddingTop: 10,
            textAlignVertical: 'top',
          }}
          placeholderTextColor="#8080808C"
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 40,
          marginTop: 8,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: '#000',
          }}
        >
          {comment.length}/500
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleCreateComment}
          disabled={isLoading}
          style={{
            backgroundColor: '#E40E1A',
            padding: 8,
            borderRadius: 12,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {isLoading && (
            <ActivityIndicator
              color="#fff"
              style={{ marginRight: 8 }}
              size="small"
            />
          )}
          <Icon name="send" fill="#fff" size="xs" />
          <Text
            style={{
              fontWeight: '600',
              color: '#fff',
              fontSize: 12,
            }}
          >
            {t('commons.send')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FeedDetailFooter;
