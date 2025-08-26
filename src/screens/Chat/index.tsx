import { ScrollView, Text, View } from 'react-native';
import Header from '../../components/Header.tsx';
import { useTranslation } from 'react-i18next';
import SearchInput from '../../components/SearchInput.tsx';
import { MOCK_CHAT_ITEMS } from './constants.ts';
import ChatItem from './ChatItem.tsx';

const ChatScreen = () => {
  const { t } = useTranslation();

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
        <SearchInput placeholder={t('chat.search_placeholder')} />
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          gap: 8,
          paddingBottom: 32,
        }}
      >
        {MOCK_CHAT_ITEMS.map((item, index) => (
          <ChatItem key={index} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ChatScreen;
