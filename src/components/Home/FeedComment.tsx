import { Image, Text, View } from 'react-native';
import CommentActionButtons from './CommentActionButtons.tsx';
import SubComment from './SubComment.tsx';
import ReplyComment from './ReplyComment.tsx';
import { useState } from 'react';
import { COMMENT } from '../../store/types.ts';
import { cdnImage, formatCommentDate } from '../../helpers.ts';

type Props = {
  item: COMMENT;
  hocId: string; // feed or company id
  type: 'feed' | 'company';
};

const FeedComment = ({ type, hocId, item }: Props) => {
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  return (
    <View
      style={{
        marginBottom: 16,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 16,
          gap: 8,
        }}
      >
        <Image
          source={{ uri: cdnImage(item.createdBy.photoKey) }}
          style={{ height: 32, width: 32, borderRadius: 16 }}
        />

        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                color: '#000',
              }}
            >
              {`${item.createdBy.name} ${item.createdBy.surname}`}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#808792',
              }}
            >
              {formatCommentDate(item.createdAt)}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: '#808792',
              marginTop: 12,
            }}
          >
            {item.context}
          </Text>
          <CommentActionButtons
            likeCount={item.likeCount}
            isLiked={item.isLiked}
            onPressReply={() => setIsReplyOpen(true)}
            hocId={hocId}
            type={type}
            commentId={item._id}
          />
        </View>
      </View>
      {isReplyOpen && (
        <ReplyComment
          hocId={hocId}
          type={type}
          commentId={item._id}
          onCancelPress={() => setIsReplyOpen(false)}
        />
      )}
      {item.subComments.map(subComment => (
        <SubComment
          key={subComment._id}
          item={subComment}
          hocId={hocId}
          type={type}
          commentId={item._id}
        />
      ))}
    </View>
  );
};

export default FeedComment;
