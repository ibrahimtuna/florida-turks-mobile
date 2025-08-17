import { ISubComment } from '../../screens/Home/constants.ts';
import { Image, Text, View } from 'react-native';
import CommentActionButtons from './CommentActionButtons.tsx';

type Props = {
  item: ISubComment;
};

const SubComment = ({ item }: Props) => {
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
        <CommentActionButtons isSubComment />
      </View>
    </View>
  );
};

export default SubComment;
