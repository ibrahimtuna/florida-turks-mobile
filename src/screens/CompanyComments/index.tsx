import { ScrollView, Text, View } from 'react-native';
import SubHeader from '../../components/SubHeader.tsx';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/core';
import { CompanyStackParamList } from '../../Navigation.tsx';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Company from '../../components/Companies/Company.tsx';
import FeedComment from '../../components/Home/FeedComment.tsx';
import FeedDetailFooter from '../../components/Home/FeedDetailFooter.tsx';
import { useAppSelector } from '../../store';
import { useMemo } from 'react';
import i18n from '../../i18n.ts';

type CompanyDetailRouteProp = RouteProp<
  CompanyStackParamList,
  'CompanyComments'
>;

const CompanyCommentsScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { t } = useTranslation();
  const { companies } = useAppSelector(state => state.company);
  const route = useRoute<CompanyDetailRouteProp>();
  const { companyId } = route.params;
  const company = companies.find(item => item._id === companyId);

  if (!company) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <SubHeader title={t('commons.comments')} />
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 12,
          paddingBottom: bottom + 36,
        }}
      >
        <Company item={company} />
        <Text
          style={{
            marginVertical: 16,
            fontSize: 14,
            color: '#000',
          }}
        >
          {t('home.feed_detail.comments')} ({company.comments.length})
        </Text>
        {company.comments.map(comment => (
          <FeedComment item={comment} />
        ))}
      </ScrollView>
      <FeedDetailFooter />
    </View>
  );
};

export default CompanyCommentsScreen;
