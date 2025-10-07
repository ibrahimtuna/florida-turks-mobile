import { SUB_COMMENT } from '../../store/types.ts';
import { Image, Text, View } from 'react-native';
import CommentActionButtons from './CommentActionButtons.tsx';
import { cdnImage, formatCommentDate } from '../../helpers.ts';

type Props = {
  item: SUB_COMMENT;
  type: 'feed' | 'company';
  hocId: string;
  commentId: string;
};

const SubComment = ({ hocId, type, item, commentId }: Props) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8,
        marginLeft: 32,
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
          isSubComment
          hocId={hocId}
          type={type}
          commentId={commentId}
          subCommentId={item._id}
        />
      </View>
    </View>
  );
};

export default SubComment;
