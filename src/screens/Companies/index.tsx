import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from '../../components/Icon.tsx';
import { useTranslation } from 'react-i18next';
import Header from '../../components/Header.tsx';
import SearchInput from '../../components/SearchInput.tsx';
import HorizontalFilter from '../../components/HorizontalFilter.tsx';
import Company from '../../components/Companies/Company.tsx';
import i18n from '../../i18n.ts';
import { useAppSelector } from '../../store';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { REQUEST_GET_COMPANIES } from '../../api/requests.ts';
import { useDispatch } from 'react-redux';
import { setCompanies } from '../../store/reducers/company.ts';
import { useDebounce } from '../../hooks/useDebounce.ts';
import LocationFilter from '../../components/LocationFilter.tsx';
import { FILTER_LOCATION } from '../../components/Inputs/LocationInput/types.ts';

const CompaniesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { language } = i18n;
  const { categories, companies } = useAppSelector(state => state.company);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [filterLocation, setFilterLocation] = useState<FILTER_LOCATION>();
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 2000);

  useEffect(() => {
    console.log(debouncedSearch);
  }, [debouncedSearch]);

  const CATEGORIES = useMemo(() => {
    return [
      {
        key: 'all',
        label: t('commons.all'),
      },
      ...categories.map(category => ({
        key: category._id,
        label:
          language === 'tr' ? category.turkishTitle : category.englishTitle,
      })),
    ];
  }, [t, categories, language]);

  const fetchCompanies = useCallback(() => {
    setIsLoading(true);
    REQUEST_GET_COMPANIES({
      page: 0,
      categoryId: selectedCategory !== 'all' ? selectedCategory : undefined,
      location: filterLocation
        ? {
            lat: filterLocation.location.latitude,
            lon: filterLocation.location.longitude,
            distance: filterLocation.distance,
          }
        : undefined,
    })
      .then(({ data }) => {
        console.log(data, '<-- data');
        dispatch(setCompanies(data.items));
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, selectedCategory, filterLocation]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <Header
        title={t('tabs.companies')}
        showRewards
        showAddWithText
        onAddButtonPress={() => navigation.navigate('CreateCompany')}
      />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 12,
        }}
      >
        <SearchInput
          placeholder={t('companies.search_placeholder')}
          value={searchText}
          onChange={setSearchText}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 18,
          }}
        >
          <HorizontalFilter
            categories={CATEGORIES}
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <LocationFilter
            defaultFilter={filterLocation}
            setDefaultFilter={setFilterLocation}
          />
        </View>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          [...companies]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map(company => <Company key={company._id} item={company} />)
        )}
      </ScrollView>
    </View>
  );
};

export default CompaniesScreen;
