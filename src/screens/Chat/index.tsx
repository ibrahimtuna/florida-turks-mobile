import { ScrollView, Text, View } from 'react-native';
import Header from '../../components/Header.tsx';
import { useTranslation } from 'react-i18next';
import SearchInput from '../../components/SearchInput.tsx';
import ChatItem from './ChatItem.tsx';
import { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce.ts';
import { useAppSelector } from '../../store';

const ChatScreen = () => {
  const { t } = useTranslation();
  const { inbox } = useAppSelector(state => state.inbox);
  const [searchText, setSearchText] = useState('');
  const debouncedSearch = useDebounce(searchText, 2000);

  return (
    <View
      style={{
        backgroundColor: '#F8F9FB',
        flex: 1,
      }}
    >
      <Header title={t('tabs.chat')} showRewards showAddWithText />
      <View
        style={{
          padding: 16,
        }}
      >
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          placeholder={t('chat.search_placeholder')}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 8,
          paddingBottom: 32,
        }}
      >
        {inbox.map(item => (
          <ChatItem key={item.userId} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatScreen;
