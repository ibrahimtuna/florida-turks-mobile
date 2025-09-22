import React from 'react';
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
import { getLeafRouteName } from './helpers.ts';
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export type HomeStackParamList = {
  Home: undefined;
  FeedDetail: { feedId: string };
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="FeedDetail" component={FeedDetailScreen} />
    </HomeStack.Navigator>
  );
}

export type EventStackParamList = {
  Events: undefined;
  EventDetail: { eventId: string };
};

const EventStack = createNativeStackNavigator<EventStackParamList>();

function EventStackNavigator() {
  return (
    <EventStack.Navigator screenOptions={{ headerShown: false }}>
      <EventStack.Screen name="Events" component={EventsScreen} />
      <EventStack.Screen name="EventDetail" component={EventDetailScreen} />
    </EventStack.Navigator>
  );
}

export type CompanyStackParamList = {
  Companies: undefined;
  CompanyDetail: { companyId: string };
  CompanyComments: { companyId: string };
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
    </CompanyStack.Navigator>
  );
}

export type ChatStackParamList = {
  Chat: undefined;
  ChatDetail: { chatId: string };
};

const ChatStack = createNativeStackNavigator<ChatStackParamList>();

function ChatStackNavigator() {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="Chat" component={ChatScreen} />
      <ChatStack.Screen name="ChatDetail" component={ChatDetailScreen} />
    </ChatStack.Navigator>
  );
}

export type ProfileStackParamList = {
  Profile: undefined;
  ProfileSettings: undefined;
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
    </ProfileStack.Navigator>
  );
}

const HIDE_TABBAR_ROUTES = [
  'FeedDetail',
  'EventDetail',
  'CompanyDetail',
  'CompanyComments',
  'ProfileSettings',
  'ChatDetail',
];

function TabNavigation() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      // hide all default styling—we control everything in CustomTabBar
      screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
      tabBar={props => {
        const currentTabRoute = props.state.routes[props.state.index] as any;
        const focusedName = getLeafRouteName(currentTabRoute);

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
  const isLoggedIn = false;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
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
    </NavigationContainer>
  );
}

export default Navigation;
