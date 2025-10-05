import { ImageBackground, Text } from 'react-native';
import { useAppSelector } from '../../store';
import { useTranslation } from 'react-i18next';

const HomeWelcome = () => {
  const { t } = useTranslation();
  const { user } = useAppSelector(state => state.user);
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
        {t('home.greeting.title', {
          name: user.name,
        })}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: 'white',
          marginTop: 16,
        }}
      >
        {t('home.greeting.desc', {
          count: 12,
        })}
      </Text>
    </ImageBackground>
  );
};

export default HomeWelcome;
