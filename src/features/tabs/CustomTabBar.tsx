import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import React, {FC} from 'react';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {useSharedState} from './SharedContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';
import {tabStyles} from '@unistyles/tabStyles';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Colors, screenWidth} from '@unistyles/Constants';
import ScalePress from '@components/ui/ScalePress';
import {
  DeliveryTabIcon,
  DiningTabIcon,
  LiveTabIcon,
  ReorderTabIcon,
} from './TabIcon';
import {useAppSelector} from '@states/reduxHook';
import CartHOC from '@features/checkout/CartHOC';

const CustomTabBar: FC<BottomTabBarProps> = props => {
  const isVegMode = useAppSelector(state => state.user.isVegMode);
  const {scrollY} = useSharedState();

  const {state, navigation} = props;
  const bottom = useSafeAreaInsets();

  const {styles} = useStyles(tabStyles);
  const isLiveTabFocused = state.routes[state.index]?.name === 'Profile';

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY:
            scrollY.value === 1
              ? withTiming(100, {duration: 300})
              : withTiming(0, {duration: 300}),
        },
      ],
    };
  });

  const indicatorStyle = useAnimatedStyle(() => {
    const baseLeft = 10;
    let slideValue = state.index == 3 ? 0.23 : 0.24;
    return {
      left: withTiming(baseLeft + state.index * screenWidth * slideValue),
    };
  });

  return (
    <>
      {!isLiveTabFocused && <CartHOC />}
      <Animated.View
        style={[
          styles.tabBarContainer,
          animatedStyle,
          {
            paddingBottom: bottom.bottom,
            backgroundColor: isLiveTabFocused ? Colors.dark : Colors.background,
          },
        ]}>
        <View style={styles.tabContainer}>
          {state?.routes?.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route?.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route?.name);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            return (
              <ScalePress
                onPress={onPress}
                onLongPress={onLongPress}
                key={index}
                style={[
                  styles.tabItem,
                  isFocused ? styles.focusedTabItem : {},
                ]}>
                {route?.name === 'Home' && (
                  <DeliveryTabIcon focused={isFocused} />
                )}
                {route?.name === 'Order' && (
                  <ReorderTabIcon focused={isFocused} />
                )}
                {route?.name === 'Dining' && (
                  <DiningTabIcon focused={isFocused} />
                )}
                {route?.name === 'Profile' && <LiveTabIcon focused={isFocused} />}
              </ScalePress>
            );
          })}
          <View style={styles.verticalLine} />
        </View>

        <Animated.View
          style={[
            styles.slidingIndicator,
            indicatorStyle,
            {
              backgroundColor: isLiveTabFocused
                ? '#fff'
                : isVegMode
                ? Colors.active
                : Colors.primary,
            },
          ]}
        />

      </Animated.View>
    </>
  );
};

export default CustomTabBar;
