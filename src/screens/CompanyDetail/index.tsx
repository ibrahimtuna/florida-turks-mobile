import {
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SubHeader from '../../components/SubHeader.tsx';
import { useTranslation } from 'react-i18next';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import { CompanyStackParamList } from '../../Navigation.tsx';
import Icon from '../../components/Icon.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from '../../store';
import { useMemo } from 'react';
import i18n from '../../i18n.ts';
import { cdnImage } from '../../helpers.ts';
import { toggleCompanyLike } from '../../store/reducers/company.ts';
import { REQUEST_LIKE_COMPANY } from '../../api/requests.ts';
import { useDispatch } from 'react-redux';

type CompanyDetailRouteProp = RouteProp<CompanyStackParamList, 'CompanyDetail'>;

const CompanyDetailScreen = () => {
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { language } = i18n;
  const { categories, companies } = useAppSelector(state => state.company);
  const route = useRoute<CompanyDetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { companyId } = route.params;
  const company = companies.find(item => item._id === companyId);

  const categoryName = useMemo(() => {
    if (!company) {
      return '';
    }
    const foundCategory = categories.find(c => c._id === company.categoryId);
    if (!foundCategory) {
      return '';
    }
    return foundCategory[language === 'tr' ? 'turkishTitle' : 'englishTitle'];
  }, [language, categories, company]);

  const handleLike = () => {
    if (!company) {
      return;
    }
    dispatch(
      toggleCompanyLike({
        companyId: company._id,
      }),
    );
    REQUEST_LIKE_COMPANY({
      companyId: company._id,
    });
  };

  if (!company) {
    return null;
  }
  const openMap = () => {
    if (company?.location?.coords?.coordinates?.length !== 2) {
      return;
    }
    const scheme = Platform.select({
      ios: `maps:0,0?q=${company.name}@${company.location.coords.coordinates[1]},${company.location.coords.coordinates[0]}`,
      android: `geo:0,0?q=${company.location.coords.coordinates[1]},${company.location.coords.coordinates[0]}(${company.name})`,
    });

    if (scheme) {
      Linking.openURL(scheme).catch(err =>
        console.error('Error opening map:', err),
      );
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <SubHeader title={company.name} />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 12,
          paddingBottom: bottom + 36,
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 28,
            right: 28,
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
            {categoryName}
          </Text>
        </View>
        <Image
          source={{ uri: cdnImage(company.coverPhotoKey) }}
          style={{ width: '100%', height: 200, borderRadius: 12 }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              flex: 1,
            }}
          >
            <Image
              source={{ uri: cdnImage(company.logoKey) }}
              style={{
                height: 44,
                width: 44,
                borderRadius: 22,
              }}
            />
            <Text
              style={{
                fontSize: 24,
                flex: 1,
              }}
            >
              {company.name}
            </Text>
          </View>

          <View
            style={{
              gap: 8,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={openMap}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: '#fff',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#8080808C',
                height: 42,
              }}
            >
              <Icon name="arrowSquare" size="s" fill="#626262" />
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 12,
                  color: '#626262',
                }}
              >
                {t('events.event_detail.directions')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Linking.openURL(`tel:${company.phoneNumber}`)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: '#E40E1A',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#E40E1A',
                height: 42,
              }}
            >
              <Icon name="phone" size="s" fill="#FFF" />
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 12,
                  color: '#FFF',
                }}
              >
                {t('commons.call')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Text
            style={{
              fontSize: 12,
              color: '#000',
            }}
          >
            {company.desc}
          </Text>
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
            onPress={handleLike}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Icon
              name={company.isLiked ? 'heartFilled' : 'heartOutline'}
              size="s"
              fill={company.isLiked ? '#ff0000' : '#000'}
            />
            <Text style={{ color: '#000' }}>{company.likeCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate('CompanyComments', {
                companyId: company._id,
              })
            }
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Icon name="chat" size="s" />
            <Text style={{ color: '#000' }}>{company.comments.length}</Text>
          </TouchableOpacity>
        </View>
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
              fontSize: 12,
              color: '#808792',
            }}
          >
            {company.location.displayName}
          </Text>
        </View>
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
              fontSize: 12,
              color: '#808792',
            }}
          >
            {company.email}
          </Text>
        </View>
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
              fontSize: 12,
              color: '#808792',
            }}
          >
            {company.website}
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
              fontSize: 12,
              color: '#808792',
            }}
          >
            {company.phoneNumber}
          </Text>
        </View>
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
        <Text
          style={{
            fontSize: 12,
            color: '#000',
          }}
        >
          {t('companies.company_detail.created_by')}
        </Text>
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
              gap: 8,
            }}
          >
            <Image
              source={{ uri: cdnImage(company.createdBy?.photoKey) }}
              style={{
                height: 32,
                width: 32,
                borderRadius: 16,
                backgroundColor: '#C6C6C6',
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: '#000',
              }}
            >
              {company.createdBy?.name || '"Community Admin"'}
            </Text>
          </View>
          {!company.createdBy && (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Linking.openURL(`tel:${company.phoneNumber}`)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: '#E40E1A',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: '#E40E1A',
                height: 42,
              }}
            >
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: 12,
                  color: '#FFF',
                }}
              >
                {t('companies.company_detail.claim_company')}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default CompanyDetailScreen;
