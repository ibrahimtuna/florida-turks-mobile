import { Text, View } from 'react-native';
import { MESSAGE } from '../Chat/constants.ts';

type Props = {
  item: MESSAGE;
};

const OutgoingMessage = ({ item }: Props) => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        borderBottomLeftRadius: 18,
      }}
    >
      <Text
        style={{
          color: '#000000',
          fontSize: 18,
          lineHeight: 22,
        }}
      >
        {item.message}
      </Text>
    </View>
  );
};

export default OutgoingMessage;
