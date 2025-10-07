import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '../Icon.tsx';
import { REQUEST_LIKE_FEED } from '../../api/requests.ts';
import { useDispatch } from 'react-redux';
import { toggleLike } from '../../store/reducers/feed.ts';

type Props = {
  feedId: string;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
};

const FeedActionButtons = ({
  feedId,
  likeCount,
  commentCount,
  isLiked,
}: Props) => {
  const dispatch = useDispatch();

  const handleLike = () => {
    dispatch(toggleLike({ feedId }));
    REQUEST_LIKE_FEED({
      feedId,
    }).then(({ data }) => {
      console.log(data, '<-- feed like response');
    });
  };

  return (
    <View
      style={{
        borderTopWidth: 1,
        borderColor: '#F1F2F5',
        marginHorizontal: 24,
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleLike}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Icon
          name={isLiked ? 'heartFilled' : 'heartOutline'}
          size="s"
          fill={isLiked ? '#ff0000' : '#000'}
        />
        <Text
          style={{
            fontSize: 12,
          }}
        >
          {likeCount}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Icon name="chat" size="s" />
        <Text
          style={{
            fontSize: 12,
          }}
        >
          {commentCount}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Icon name="share" size="s" />
      </TouchableOpacity>
    </View>
  );
};

export default FeedActionButtons;
