import React from 'react';
import {
  NavigationContainer,
  NavigationState,
  PartialState,
  Route,
} from '@react-navigation/native';
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

const HIDE_TABBAR_ROUTES = ['FeedDetail', 'EventDetail', 'SomethingElse'];

function Navigation() {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
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
          component={CompaniesScreen}
          options={{ title: t('tabs.companies') }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{ title: t('tabs.chat') }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: t('tabs.profile') }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
