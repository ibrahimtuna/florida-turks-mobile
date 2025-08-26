import { ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from '../../components/Icon.tsx';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header.tsx';
import SearchInput from '../../components/SearchInput.tsx';
import HorizontalFilter from '../../components/HorizontalFilter.tsx';
import { MOCK_COMPANIES } from './constants.ts';
import Company from '../../components/Companies/Company.tsx';

const CompaniesScreen = () => {
  const { t } = useTranslation();

  const MOCK_CATEGORIES = [
    {
      key: 'all',
      label: t('companies.categories.all'),
    },
    {
      key: 'construction',
      label: t('companies.categories.construction'),
    },
    {
      key: 'restaurants',
      label: t('companies.categories.restaurants'),
    },
    {
      key: 'software',
      label: t('companies.categories.software'),
    },
  ];

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <Header title={t('tabs.companies')} showRewards showAddWithText />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 12,
        }}
      >
        <SearchInput placeholder={t('companies.search_placeholder')} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <HorizontalFilter categories={MOCK_CATEGORIES} />
          <TouchableOpacity activeOpacity={0.8}>
            <Icon name="map" size="m" fill="#808792" />
          </TouchableOpacity>
        </View>
        {MOCK_COMPANIES.map(company => (
          <Company key={company.id} item={company} />
        ))}
      </ScrollView>
    </View>
  );
};

export default CompaniesScreen;
