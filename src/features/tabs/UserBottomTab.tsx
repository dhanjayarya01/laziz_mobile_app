import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DeliveryScreen from '@features/delivery/DeliveryScreen';
import OrdersScreen from '@features/orders/OrdersScreen';
import DiningScreen from '@features/dining/DiningScreen';
import LiveScreen from '@features/live/LiveScreen';
import CustomTabBar from './CustomTabBar';

const Tab = createBottomTabNavigator();

const UserBottomTab: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen name="Home" component={DeliveryScreen} />
      <Tab.Screen name="Order" component={OrdersScreen} />
      <Tab.Screen name="Dining" component={DiningScreen} />
      <Tab.Screen name="Profile" component={LiveScreen} />
    </Tab.Navigator>
  );
};

export default UserBottomTab;
