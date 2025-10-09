import { View } from 'react-native';
import OutgoingMessage from './OutgoingMessage.tsx';
import IncomingMessage from './IncomingMessage.tsx';
import { MESSAGE } from '../../store/types.ts';
import { useAppSelector } from '../../store';

type Props = {
  item: MESSAGE;
};

const Message = ({ item }: Props) => {
  const { user } = useAppSelector(state => state.user);

  return (
    <View
      style={{
        width: '100%',
      }}
    >
      {item.receiverId === user._id ? (
        <IncomingMessage item={item} />
      ) : (
        <OutgoingMessage item={item} />
      )}
    </View>
  );
};

export default Message;
