import { ImageBackground, Text } from 'react-native';

const HomeWelcome = () => {
  return (
    <ImageBackground
      source={require('../../assets/images/home_welcome_bg.png')}
      style={{
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: 'red',
        borderRadius: 12,
      }}
      imageStyle={{
        borderRadius: 12,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: 'white',
        }}
      >
        Merhaba Mehmet👋
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: 'white',
          marginTop: 16,
        }}
      >
        Topluluk akışlarınızda bugün 12 güncelleme var
      </Text>
    </ImageBackground>
  );
};

export default HomeWelcome;
