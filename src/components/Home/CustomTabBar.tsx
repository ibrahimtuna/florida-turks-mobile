import React, { useMemo } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../Icon.tsx';
import type { IconName } from '../../assets/icons/icons.ts';

// ---- config ----
const ACTIVE_TINT = '#E40E1A';
const INACTIVE_TINT = '#848A96';
const ACTIVE_BG = '#FEF0F0';

const getIconName = (routeName: string): IconName => {
  switch (routeName) {
    case 'Home':
      return 'home';
    case 'Events':
      return 'calendar';
    case 'Companies':
      return 'company';
    case 'Chat':
      return 'chat';
    case 'Profile':
      return 'profile';
    default:
      return 'profile';
  }
};

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + 4 }]}>
      <View style={styles.row}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? (options.tabBarLabel as string)
              : options.title !== undefined
              ? (options.title as string)
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name as never);
            }
          };

          const onLongPress = () => {
            navigation.emit({ type: 'tabLongPress', target: route.key });
          };

          const iconName = getIconName(route.name);

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              style={styles.item} // 14px gap total (7 each side)
            >
              <View
                style={[
                  styles.itemInner,
                  isFocused && {
                    backgroundColor: ACTIVE_BG,
                  },
                ]}
              >
                <Icon
                  name={iconName}
                  size="s"
                  fill={isFocused ? ACTIVE_TINT : INACTIVE_TINT}
                />
                <Text
                  style={[
                    styles.label,
                    { color: isFocused ? ACTIVE_TINT : INACTIVE_TINT },
                  ]}
                >
                  {label}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    // nice shadow
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  item: {
    flex: 1,
    marginHorizontal: 6,
  },
  itemInner: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  label: {
    marginTop: 4,
    fontSize: 10,
    includeFontPadding: false,
  },
});

export default CustomTabBar;
