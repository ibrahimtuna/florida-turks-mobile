import { Text, TouchableOpacity, View } from 'react-native';
import Icon from '../Icon.tsx';

const FeedActionButtons = () => {
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
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Icon name="heartOutline" size="s" />
        <Text
          style={{
            fontSize: 12,
          }}
        >
          16
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
          16
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
