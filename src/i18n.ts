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
      companies: {
        search_placeholder: 'Search company',
        categories: {
          all: 'All',
          construction: 'Construction',
          restaurant: 'Restaurant',
          software: 'Software',
          healthcare: 'Healthcare',
          hospitality: 'Hospitality',
        },
        details: 'Details',
        company_detail: {
          created_by: 'Created by',
          claim_company: 'Claim Company',
        },
      },
      profile: {
        contact_information: 'Contact information',
        member_since: 'Member since {{date}}',
        lives_in: 'Lives in {{location}}',
        rewards: 'Rewards',
        profile_settings: 'Profile settings',
        logout: 'Logout',
        delete_account: 'Delete account',
      },
      profile_settings: {
        title: 'Edit Profile',
        name: 'Name',
        surname: 'Surname',
        bio: 'Biography',
        chars: '{{char}}/{{total}} characters',
        email: 'E-Mail',
        email_cannot_change: '💡E-mail address cannot be changed.',
        phone_number: 'Phone number',
        location: 'Location',
        share_contact_data: 'Share contact information',
      },
      chat: {
        search_placeholder: 'Search chat',
        input_placeholder: 'Write a message',
        delete_chat: 'Delete chat',
        report_chat: 'Report chat',
      },
      login: {
        title: 'Welcome!',
        desc: 'Log in to access our community',
        forgot_password: 'Forgot password',
        login: 'Login',
        login_google: 'Login with Google',
        login_apple: 'Login with Apple',
        dont_have_account: 'Dont have account?',
        create_account: 'Create account',
      },
      register: {
        desc: 'Register to join our community',
      },
      forgot_password: {
        title: 'Enter your email address to recover your password',
        verify_code_title: 'Please enter the code we sent to {{email}}',
        recover_code: 'Recover code',
        new_pass_title: 'Please enter your new password',
      },
      onboarding: {
        otp_title: 'OTP Verification',
        otp_desc: 'Enter the code sent to {{phoneNumber}}',
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
        call: 'Call',
        comments: 'Comments',
        save: 'Save',
        email: 'E-Mail',
        password: 'Password',
        confirm_password: 'Confirm password',
        or: 'Or',
        continue: 'Continue',
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
      companies: {
        search_placeholder: 'Search company',
        categories: {
          all: 'All',
          construction: 'İnşaat',
          restaurant: 'Restaurant',
          software: 'Yazılım',
          healthcare: 'Sağlık',
          hospitality: 'Turizm',
        },
        details: 'Detaylar',
        company_detail: {
          created_by: 'Oluşturan',
          claim_company: 'Claim Company',
        },
      },
      profile: {
        contact_information: 'İletişim bilgileri',
        member_since: '{{date}} tarihinden beri üye',
        lives_in: '{{location}} konumunda yaşıyor',
        rewards: 'Ödüller',
        profile_settings: 'Profile ayarları',
        logout: 'Çıkış yap',
        delete_account: 'Hesabı Sil',
      },
      profile_settings: {
        title: 'Profil Düzenle',
        name: 'Ad',
        surname: 'Soyad',
        bio: 'Biyografi',
        chars: '{{char}}/{{total}} karakter',
        email: 'E-Mail',
        email_cannot_change: '💡E-mail adresi değiştirilemez.',
        phone_number: 'Telefon numarası',
        location: 'Konum',
        share_contact_data: 'İletişim Bilgilerini Paylaş',
      },
      chat: {
        search_placeholder: 'Konuşma ara',
        input_placeholder: 'Mesaj yazın',
        delete_chat: 'Sohbeti sil',
        report_chat: 'Sohbeti raporla',
      },
      login: {
        title: 'Hoş Geldiniz!',
        desc: 'Topluluğumuza Katılmak İçin\nGiriş Yapın!',
        forgot_password: 'Şifremi unuttum',
        login: 'Giriş Yap',
        login_google: 'Google ile giriş yap',
        login_apple: 'Apple ile giriş yap',
        dont_have_account: 'Hesabınız yok mu?',
        create_account: 'Hesap oluştur',
      },
      register: {
        desc: 'Topluluğumuza Katılmak İçin\nKayıt Olun!',
      },
      forgot_password: {
        title: 'Şifre yenilemek için email adresinizi giriniz',
        verify_code_title: '{{email}} adresine gönderdiğimiz kodu giriniz',
        recover_code: 'Yenileme kodu',
        new_pass_title: 'Lütfen yeni şifrenizi belirleyiniz',
      },
      onboarding: {
        otp_title: 'SMS Doğrulama',
        otp_desc: '{{phoneNumber}} numarasına gönderilen kodu giriniz.',
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
        call: 'Ara',
        comments: 'Yorumlar',
        save: 'Kaydet',
        email: 'E-Mail',
        password: 'Şifre',
        confirm_password: 'Şifre (Tekrar)',
        or: 'yada',
        continue: 'İlerle',
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
