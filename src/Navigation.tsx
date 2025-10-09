import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CustomTabBar from './components/Home/CustomTabBar.tsx';

import HomeScreen from './screens/Home';
import EventsScreen from './screens/Events';
import CompaniesScreen from './screens/Companies';
import ChatScreen from './screens/Chat';
import ProfileScreen from './screens/Profile';
import FeedDetailScreen from './screens/FeedDetail';
import { getLeafRouteName, navigationRef } from './helpers.ts';
import EventDetailScreen from './screens/EventDetail';
import CompanyDetailScreen from './screens/CompanyDetail';
import CompanyCommentsScreen from './screens/CompanyComments';
import ProfileSettingsScreen from './screens/ProfileSettings';
import ChatDetailScreen from './screens/ChatDetail';
import LoginScreen from './screens/Login';
import OnboardingScreen from './screens/Onboarding';
import CreateAccountScreen from './screens/CreateAccount';
import ForgotPasswordScreen from './screens/ForgotPassword';
import ForgotPasswordVerifyCodeScreen from './screens/ForgotPassword/VerifyCode.tsx';
import ForgotPasswordNewPassScreen from './screens/ForgotPassword/NewPass.tsx';
import { useAppSelector } from './store';
import Toast from 'react-native-toast-message';
import {
  REQUEST_GET_COMPANY_CATEGORIES,
  REQUEST_GET_EVENT_CATEGORIES,
  REQUEST_GET_FEED_CATEGORIES,
  REQUEST_GET_ME,
  REQUEST_GET_MESSAGES,
} from './api/requests.ts';
import { setUser } from './store/reducers/user.ts';
import { useDispatch } from 'react-redux';
import { setFeedCategories } from './store/reducers/feed.ts';
import { setEventCategories } from './store/reducers/event.ts';
import { setCompanyCategories } from './store/reducers/company.ts';
import CreateCompanyScreen from './screens/CreateCompany';
import CreateEventScreen from './screens/CreateEvent';
import CreateFeed from './screens/CreateFeed';
import ProfileDetailScreen from './screens/ProfileDetail';
import { setInbox } from './store/reducers/inbox.ts';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export type HomeStackParamList = {
  Home: undefined;
  FeedDetail: { feedId: string };
  CreateFeed: undefined;
  ProfileDetail: {
    _id: string;
    name: string;
    surname: string;
    photoKey: string;
  };
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="FeedDetail" component={FeedDetailScreen} />
      <HomeStack.Screen name="CreateFeed" component={CreateFeed} />
      <HomeStack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
    </HomeStack.Navigator>
  );
}

export type EventStackParamList = {
  Events: undefined;
  EventDetail: { eventId: string };
  CreateEvent: undefined;
  ProfileDetail: {
    _id: string;
    name: string;
    surname: string;
    photoKey: string;
  };
};

const EventStack = createNativeStackNavigator<EventStackParamList>();

function EventStackNavigator() {
  return (
    <EventStack.Navigator screenOptions={{ headerShown: false }}>
      <EventStack.Screen name="Events" component={EventsScreen} />
      <EventStack.Screen name="EventDetail" component={EventDetailScreen} />
      <EventStack.Screen name="CreateEvent" component={CreateEventScreen} />
      <EventStack.Screen name="ProfileDetail" component={ProfileDetailScreen} />
    </EventStack.Navigator>
  );
}

export type CompanyStackParamList = {
  Companies: undefined;
  CompanyDetail: { companyId: string };
  CompanyComments: { companyId: string };
  CreateCompany: undefined;
  ProfileDetail: {
    _id: string;
    name: string;
    surname: string;
    photoKey: string;
  };
};

const CompanyStack = createNativeStackNavigator<CompanyStackParamList>();

function CompanyStackNavigator() {
  return (
    <CompanyStack.Navigator screenOptions={{ headerShown: false }}>
      <CompanyStack.Screen name="Companies" component={CompaniesScreen} />
      <CompanyStack.Screen
        name="CompanyDetail"
        component={CompanyDetailScreen}
      />
      <CompanyStack.Screen
        name="CompanyComments"
        component={CompanyCommentsScreen}
      />
      <CompanyStack.Screen
        name="CreateCompany"
        component={CreateCompanyScreen}
      />
      <CompanyStack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
      />
    </CompanyStack.Navigator>
  );
}

export type ChatStackParamList = {
  Chat: undefined;
  ChatDetail: {
    _id: string;
    name: string;
    surname: string;
    photoKey: string;
  };
  ProfileDetail: {
    _id: string;
    name: string;
    surname: string;
    photoKey: string;
  };
};

const ChatStack = createNativeStackNavigator<ChatStackParamList>();

function ChatStackNavigator() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="Chat" component={ChatScreen} />
      <ChatStack.Screen name="ChatDetail" component={ChatDetailScreen} />
      <CompanyStack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
      />
    </ChatStack.Navigator>
  );
}

export type ProfileStackParamList = {
  Profile: undefined;
  ProfileSettings: undefined;
  ProfileDetail: {
    _id: string;
    name: string;
    surname: string;
    photoKey: string;
  };
};

const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen
        name="ProfileSettings"
        component={ProfileSettingsScreen}
      />
      <ProfileStack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
      />
    </ProfileStack.Navigator>
  );
}

const HIDE_TABBAR_ROUTES = [
  'FeedDetail',
  'EventDetail',
  'CompanyDetail',
  'CompanyComments',
  'ProfileSettings',
  'ProfileDetail',
  'ChatDetail',
  'CreateCompany',
  'CreateEvent',
  'CreateFeed',
];

function TabNavigation() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const promises = [
      REQUEST_GET_ME(),
      REQUEST_GET_FEED_CATEGORIES(),
      REQUEST_GET_EVENT_CATEGORIES(),
      REQUEST_GET_COMPANY_CATEGORIES(),
      REQUEST_GET_MESSAGES(),
    ];

    Promise.all(promises)
      .then(responses => {
        const userData = responses[0].data.user;
        console.log(userData, '<-- user data');
        const feedCategories = responses[1].data.items;
        const eventCategories = responses[2].data.items;
        const companyCategories = responses[3].data.items;
        const conversations = responses[4].data.conversations;

        dispatch(setUser(userData));
        dispatch(setFeedCategories(feedCategories));
        dispatch(setEventCategories(eventCategories));
        dispatch(setCompanyCategories(companyCategories));
        dispatch(setInbox(conversations));
      })
      .catch(err => console.log(err));
  }, [dispatch]);

  return (
    <Tab.Navigator
      // hide all default styling—we control everything in CustomTabBar
      screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
      tabBar={props => {
        const currentTabRoute = props.state.routes[props.state.index] as any;
        const focusedName = getLeafRouteName(currentTabRoute);
        console.log(focusedName, '<-- focused name');

        if (HIDE_TABBAR_ROUTES.includes(focusedName)) return null;
        return <CustomTabBar {...props} />;
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ title: t('tabs.home') }}
      />
      <Tab.Screen
        name="Events"
        component={EventStackNavigator}
        options={{ title: t('tabs.events') }}
      />
      <Tab.Screen
        name="Companies"
        component={CompanyStackNavigator}
        options={{ title: t('tabs.companies') }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatStackNavigator}
        options={{ title: t('tabs.chat') }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackNavigator}
        options={{ title: t('tabs.profile') }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  const { user } = useAppSelector(state => state.user);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user?.photoKey ? (
          <Stack.Screen name="Main" component={TabNavigation} />
        ) : (
          <>
            <Stack.Screen name={'Login'} component={LoginScreen} />
            <Stack.Screen name={'Onboarding'} component={OnboardingScreen} />
            <Stack.Screen
              name={'CreateAccount'}
              component={CreateAccountScreen}
            />
            <Stack.Screen
              name={'ForgotPassword'}
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name={'ForgotPasswordVerifyCode'}
              component={ForgotPasswordVerifyCodeScreen}
            />
            <Stack.Screen
              name={'ForgotPasswordNewPass'}
              component={ForgotPasswordNewPassScreen}
            />
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

export default Navigation;
