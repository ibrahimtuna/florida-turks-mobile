import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '../Icon.tsx';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useAppSelector } from '../../store';
import { cdnImage } from '../../helpers.ts';
import {
  REQUEST_CREATE_COMPANY_SUB_COMMENT,
  REQUEST_CREATE_FEED_SUB_COMMENT,
} from '../../api/requests.ts';
import { useDispatch } from 'react-redux';
import { addFeedSubComment } from '../../store/reducers/feed.ts';
import { addCompanySubComment } from '../../store/reducers/company.ts';

type Props = {
  hocId: string;
  type: 'feed' | 'company';
  commentId: string;
  onCancelPress: () => void;
};

const ReplyComment = ({ hocId, type, commentId, onCancelPress }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user } = useAppSelector(state => state.user);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateSubComment = () => {
    setIsLoading(true);
    if (type === 'feed') {
      REQUEST_CREATE_FEED_SUB_COMMENT({
        feedId: hocId,
        commentId,
        context: comment,
      })
        .then(({ data }) => {
          dispatch(
            addFeedSubComment({
              feedId: data.feedId,
              commentId: data.commentId,
              comment: {
                _id: data.subComment._id,
                isLiked: false,
                createdAt: data.subComment.createdAt,
                context: data.subComment.context,
                likeCount: 0,
                createdBy: {
                  _id: user._id,
                  name: user.name,
                  surname: user.surname,
                  photoKey: user.photoKey,
                },
              },
            }),
          );
          setComment('');
          onCancelPress();
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    } else {
      REQUEST_CREATE_COMPANY_SUB_COMMENT({
        companyId: hocId,
        commentId,
        context: comment,
      })
        .then(({ data }) => {
          dispatch(
            addCompanySubComment({
              companyId: data.companyId,
              commentId: data.commentId,
              comment: {
                _id: data.subComment._id,
                isLiked: false,
                createdAt: data.subComment.createdAt,
                context: data.subComment.context,
                likeCount: 0,
                createdBy: {
                  _id: user._id,
                  name: user.name,
                  surname: user.surname,
                  photoKey: user.photoKey,
                },
              },
            }),
          );
          setComment('');
          onCancelPress();
        })
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <View
      style={{
        paddingLeft: 40,
        marginBottom: 16,
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
          autoFocus
          onChangeText={setComment}
          placeholder={t('home.feed_detail.comment_placeholder')}
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: 'red',
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onCancelPress}
            disabled={isLoading}
            style={{
              backgroundColor: '#fff',
              padding: 8,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Text
              style={{
                fontWeight: '400',
                color: '#000',
                fontSize: 12,
              }}
            >
              {t('commons.cancel')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={isLoading}
            onPress={handleCreateSubComment}
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
                size={10}
                color="#fff"
                style={{ marginRight: 4, marginLeft: 4 }}
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
    </View>
  );
};

export default ReplyComment;
