import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../Icon.tsx';
import { useTranslation } from 'react-i18next';
import {
  REQUEST_LIKE_COMMENT,
  REQUEST_LIKE_SUB_COMMENT,
} from '../../api/requests.ts';
import { useDispatch } from 'react-redux';
import {
  toggleFeedCommentLike,
  toggleFeedSubCommentLike,
} from '../../store/reducers/feed.ts';
import {
  toggleCompanyCommentLike,
  toggleCompanySubCommentLike,
} from '../../store/reducers/company.ts';

type BaseProps = {
  hocId: string;
  type: 'feed' | 'company';
  commentId: string;
  isLiked: boolean;
  likeCount: number;
  onPressReply?: () => void;
};

// When not a subcomment
type CommentProps = BaseProps & {
  isSubComment?: false;
  subCommentId?: never;
};

// When a subcomment
type SubCommentProps = BaseProps & {
  isSubComment: true;
  subCommentId: string;
};

export type Props = CommentProps | SubCommentProps;

const CommentActionButtons = ({
  isSubComment,
  onPressReply,
  likeCount,
  isLiked,
  hocId,
  type,
  commentId,
  subCommentId,
}: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLike = () => {
    if (isSubComment) {
      if (type === 'feed') {
        dispatch(
          toggleFeedSubCommentLike({
            feedId: hocId,
            commentId,
            subCommentId,
          }),
        );
      } else {
        dispatch(
          toggleCompanySubCommentLike({
            companyId: hocId,
            commentId,
            subCommentId,
          }),
        );
      }
      REQUEST_LIKE_SUB_COMMENT({
        type,
        id: hocId,
        commentId,
        subCommentId,
      });
    } else {
      if (type === 'feed') {
        dispatch(
          toggleFeedCommentLike({
            feedId: hocId,
            commentId,
          }),
        );
      } else {
        dispatch(
          toggleCompanyCommentLike({
            companyId: hocId,
            commentId,
          }),
        );
      }

      REQUEST_LIKE_COMMENT({
        id: hocId,
        type,
        commentId,
      });
    }
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={handleLike}
      >
        <Icon
          name={isLiked ? 'heartFilled' : 'heartOutline'}
          size="s"
          fill={isLiked ? '#ff0000' : '#000'}
        />
        <Text style={{ color: '#000' }}>{likeCount}</Text>
      </TouchableOpacity>
      {!isSubComment && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={onPressReply}
        >
          <Icon name="reply" size="s" />
          <Text style={{ color: '#000' }}>{t('commons.reply')}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity activeOpacity={0.8} style={styles.button}>
        <Icon name="flag" size="xs" />
        <Text style={{ color: '#000' }}>{t('commons.report')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default CommentActionButtons;
