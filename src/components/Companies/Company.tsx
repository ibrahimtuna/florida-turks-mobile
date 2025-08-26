import { Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../Icon.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { COMPANY } from '../../screens/Companies/constants.ts';

type Props = {
  item: COMPANY;
};

const Company = ({ item }: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('CompanyDetail', {
          companyId: item.id,
        })
      }
      style={{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E1E2E4',
        borderRadius: 12,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          backgroundColor: '#F1F2F5',
          paddingVertical: 8,
          paddingHorizontal: 10,
          zIndex: 99,
          borderRadius: 24,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: '#000000',
          }}
        >
          {t(`companies.categories.${item.category}`)}
        </Text>
      </View>
      <Image
        source={{ uri: item.coverPhotoUrl }}
        style={{
          width: '100%',
          height: 200,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <View
        style={{
          paddingVertical: 8,
          paddingHorizontal: 12,
          gap: 12,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Image
            source={{ uri: item.logoPhotoUrl }}
            style={{
              height: 44,
              width: 44,
              borderRadius: 22,
            }}
          />
          <Text
            style={{
              fontWeight: '400',
              fontSize: 12,
            }}
          >
            {item.title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Icon name="locationPoint" size="xs" fill="#808792" />
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                color: '#808792',
              }}
            >
              {item.location.name}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Icon name="message" size="xs" fill="#808792" />
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                color: '#808792',
              }}
            >
              {item.email}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Icon name="phone" size="xs" fill="#808792" />
            <Text
              style={{
                fontWeight: '400',
                fontSize: 12,
                color: '#808792',
              }}
            >
              {item.phoneNumber}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontWeight: '400',
            fontSize: 12,
          }}
        >
          {item.desc}
        </Text>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <View
            style={{
              height: 1,
              width: '85%',
              backgroundColor: '#F1F2F5',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: '400',
              color: '#808792',
            }}
          >
            {item.website}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: '#E40E1A',
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 12,
            }}
            onPress={() =>
              navigation.navigate('CompanyDetail', {
                companyId: item.id,
              })
            }
          >
            <Text
              style={{
                fontWeight: '500',
                color: '#fff',
              }}
            >
              {t('companies.details')}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            paddingVertical: 4,
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
            <Text style={{ color: '#000' }}>16</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={()=>navigation.navigate('CompanyComments', {
              companyId: item.id,
            })}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Icon name="chat" size="s" />
            <Text style={{ color: '#000' }}>24</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Company;
