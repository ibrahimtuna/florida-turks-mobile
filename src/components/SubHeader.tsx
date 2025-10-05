import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from './Icon.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { useAppSelector } from '../store';

type Props = {
  title: string;
  hideBackButton?: boolean;
  hideRewards?: boolean;
};

const SubHeader = ({ title, hideBackButton, hideRewards }: Props) => {
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { user } = useAppSelector(state => state.user);
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingTop: top + 8,
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {!hideBackButton ? (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: 80,
          }}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevronLeft" size="m" />
          <Text>{t('commons.back')}</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 60 }} /> // placeholder
      )}
      <Text style={{ fontSize: 14, color: '#000' }}>{title}</Text>
      {hideRewards ? (
        <View
          style={{
            width: 80,
          }}
        ></View>
      ) : (
        <View
          style={{
            width: 80,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Icon name="diamond" size="s" />
          <Text
            style={{
              marginLeft: 4,
              fontSize: 14,
            }}
          >
            {user.rewards}
          </Text>
        </View>
      )}
    </View>
  );
};

export default SubHeader;
