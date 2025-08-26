import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from './Icon.tsx';
import { useTranslation } from 'react-i18next';

type Props = {
  title: string;
  showRewards?: boolean;
  showSearch?: boolean;
  showAddIcon?: boolean;
  showAddWithText?: boolean;
  centered?: boolean;
};

const Header = ({
  title,
  showRewards,
  showSearch,
  showAddIcon,
  showAddWithText,
  centered,
}: Props) => {
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();
  return (
    <View
      style={{
        paddingTop: top + 4,
        paddingHorizontal: 16,
        height: top + 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: centered ? 'center' : 'space-between',
        alignItems: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 14,
          color: '#000',
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          gap: 14,
        }}
      >
        {showRewards && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon name="diamond" size="s" />
            <Text
              style={{
                marginLeft: 4,
                fontSize: 14,
              }}
            >
              18
            </Text>
          </View>
        )}
        {showSearch && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon name="search" size="s" />
          </View>
        )}
        {showAddIcon && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon name="addCircle" size="s" />
          </View>
        )}
        {showAddWithText && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#E40E1A',
              gap: 10,
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
            }}
          >
            <Icon name="addCircle" size="s" fill="#fff" />
            <Text
              style={{
                fontWeight: '500',
                fontSize: 12,
                color: '#fff',
              }}
            >
              {t('commons.create')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
