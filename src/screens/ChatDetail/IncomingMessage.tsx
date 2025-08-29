import { Text, View } from 'react-native';
import { MESSAGE } from '../Chat/constants.ts';

type Props = {
  item: MESSAGE;
};

const IncomingMessage = ({ item }: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#DDDDDD',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderTopLeftRadius: 18,
        borderTopRightRadius: 18,
        borderBottomRightRadius: 18,
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

export default IncomingMessage;
