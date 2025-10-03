import { ActivityIndicator, View } from 'react-native';

const AllPageLoading = () => (
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundColor: '#FFFFFF80',
      zIndex: 9999,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <ActivityIndicator />
  </View>
);

export default AllPageLoading;
