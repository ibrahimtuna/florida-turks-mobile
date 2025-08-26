import { Comment } from '../../screens/Home/constants.ts';
import { Image, Text, View } from 'react-native';
import CommentActionButtons from './CommentActionButtons.tsx';
import SubComment from './SubComment.tsx';
import ReplyComment from './ReplyComment.tsx';
import { useState } from 'react';

type Props = {
  item: Comment;
};

const FeedComment = ({ item }: Props) => {
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
          source={{ uri: item.profilePhotoUrl }}
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
              {item.profileName}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#808792',
              }}
            >
              {
                // new Date(item.createdAt).toLocaleDateString()
              }
              2.32 PM
            </Text>
          </View>
          <Text
            style={{
              fontSize: 12,
              color: '#808792',
              marginTop: 12,
            }}
          >
            {item.content}
          </Text>
          <CommentActionButtons onPressReply={() => setIsReplyOpen(true)} />
        </View>
      </View>
      {isReplyOpen && (
        <ReplyComment onCancelPress={() => setIsReplyOpen(false)} />
      )}
      {item.subComments.map(item => (
        <SubComment key={item._id} item={item} />
      ))}
    </View>
  );
};

export default FeedComment;
