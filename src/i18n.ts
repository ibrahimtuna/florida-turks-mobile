import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const resources = {
  en: {
    translation: {
      tabs: {
        home: 'Home',
        events: 'Events',
        companies: 'Companies',
        chat: 'Chat',
        profile: 'Profile',
      },
      home: {
        categories: {
          all: 'All',
          greenCard: 'Green card',
          jobPosts: 'Job Posts',
          celebrations: 'Celebrations',
        },
        feed: {
          sponsored: 'Sponsored',
        },
        feed_detail: {
          comments: 'Comments',
          comment_placeholder: 'Write a comment',
        },
      },
      events: {
        categories: {
          all: 'All',
          cultural: 'Cultural',
          business: 'Business',
          social: 'Social',
        },
        search_placeholder: 'Search events',
        participants: '{{total}}/{{max}} Participants',
        organizer: 'Organizer',
        event_detail: {
          title: 'Event',
          directions: 'Directions',
          free: 'Free',
          event_details: 'Event Details',
          participants: 'Participants',
          person: '({{count}} Persons)',
          and_more: 'and {{count}} more people',
          location: 'Location',
        },
        join_alert_title: 'Do you confirm to join?',
        join_alert_desc:
          'You are about to register for the event. Do you confirm?',
      },
      commons: {
        back: 'Back',
        reply: 'Reply',
        report: 'Report',
        send: 'Send',
        cancel: 'Cancel',
        create: 'Create',
        join: 'Join',
        see_all: 'See all',
        confirm: 'Confirm',
        close: 'Close',
      },
    },
  },
  tr: {
    translation: {
      tabs: {
        home: 'Ana Sayfa',
        events: 'Etkinlikler',
        companies: 'Şirketler',
        chat: 'Sohbet',
        profile: 'Profil',
      },
      home: {
        categories: {
          all: 'Tümü',
          greenCard: 'Green card',
          jobPosts: 'İş ilanları',
          celebrations: 'Kutlamalar',
        },
        feed: {
          sponsored: 'Öne çıkan',
        },
        feed_detail: {
          comments: 'Yorumlar',
          comment_placeholder: 'Yorumunuzu yazın',
        },
      },
      events: {
        categories: {
          all: 'Tümü',
          cultural: 'Kültürel',
          business: 'İş',
          social: 'Sosyal',
        },
        search_placeholder: 'Etkinlik ara',
        participants: '{{total}}/{{max}} Katımlımcı',
        organizer: 'Organizatör',
        event_detail: {
          title: 'Etkinlik',
          directions: 'Yol Tarifi',
          free: 'Ücretsiz',
          event_details: 'Etkinlik Detayları',
          participants: 'Katılımcılar',
          person: '({{count}} Kişi)',
          and_more: 've {{count}} kişi daha',
          location: 'Konum',
        },
        join_alert_title: 'Kayıt yapılsın mı?',
        join_alert_desc:
          'Etkinliğe katılım kaydınız oluşturmak üzeresiniz. Onaylıyor musunuz?',
      },
      commons: {
        back: 'Geri',
        reply: 'Yanıtla',
        report: 'Şikayet Et',
        send: 'Gönder',
        cancel: 'Vazgeç',
        create: 'Oluştur',
        join: 'Katıl',
        see_all: 'Tümünü gör',
        confirm: 'Onayla',
        close: 'Kapat',
      },
    },
  },
};

const locales = RNLocalize.getLocales();
const deviceLang =
  Array.isArray(locales) && locales.length ? locales[0].languageCode : 'en';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: deviceLang, // initial language
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
