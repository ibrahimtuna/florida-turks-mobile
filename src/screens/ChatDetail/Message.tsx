import { View } from 'react-native';
import { MESSAGE } from '../Chat/constants.ts';
import OutgoingMessage from './OutgoingMessage.tsx';
import IncomingMessage from './IncomingMessage.tsx';

type Props = {
  item: MESSAGE;
};

const Message = ({ item }: Props) => {
  return (
    <View
      style={{
        width: '100%',
      }}
    >
      {item.receiverId === 'me' ? (
        <IncomingMessage item={item} />
      ) : (
        <OutgoingMessage item={item} />
      )}
    </View>
  );
};

export default Message;
