import DeliveryFocused from '@assets/tabicons/delivery_focused.png';
import Delivery from '@assets/tabicons/delivery.png';
import DiningFocused from '@assets/tabicons/dining_focused.png';
import Dining from '@assets/tabicons/dining.png';

import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import {FC, memo} from 'react';
import {Image, TextStyle, View, ViewStyle} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useAppSelector} from '@states/reduxHook';
import Icon from '@components/global/Icon';

interface TabProps {
  name: string;
}

interface IconProp {
  focused: boolean;
}

const styles = {
  width: RFValue(18),
  height: RFValue(18),
};

const tabStyles: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
};

const textStyleInActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  color: Colors.lightText,
  fontSize: RFValue(9.5),
};

const textStyleActive: TextStyle = {
  textAlign: 'center',
  marginTop: 4,
  color: Colors.active,
  fontSize: RFValue(9.5),
};

const TabIcon: FC<TabProps> = memo(({name}) => {
  return (
    <View style={tabStyles}>
      {name === 'Delivery' || name === 'Dining' ? (
        <Image
          source={name === 'Delivery' ? Delivery : Dining}
          style={styles}
        />
      ) : (
        <Icon
          name={name === 'Orders' ? 'receipt-outline' : 'person-outline'}
          iconFamily="Ionicons"
          size={18}
          color={Colors.lightText}
        />
      )}
      <CustomText style={textStyleInActive}>{name}</CustomText>
    </View>
  );
});

const TabIconFocused: FC<TabProps> = memo(({name}) => {
  
  const isVegMode = useAppSelector(state => state.user.isVegMode);

  return (
    <View style={tabStyles}>
      {name === 'Delivery' || name === 'Dining' ? (
        <Image
          source={name === 'Delivery' ? DeliveryFocused : DiningFocused}
          style={[
            styles,
            {
              tintColor: isVegMode ? Colors.active : Colors.primary,
            },
          ]}
        />
      ) : (
        <Icon
          name={name === 'Orders' ? 'receipt' : 'person'}
          iconFamily="Ionicons"
          size={18}
          color={isVegMode ? Colors.active : Colors.primary}
        />
      )}
      <CustomText style={textStyleActive}>{name}</CustomText>
    </View>
  );
});

export const DeliveryTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? (
    <TabIconFocused name="Delivery" />
  ) : (
    <TabIcon name="Delivery" />
  );
};

export const OrdersTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? (
    <TabIconFocused name="Orders" />
  ) : (
    <TabIcon name="Orders" />
  );
};

export const DiningTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? <TabIconFocused name="Dining" /> : <TabIcon name="Dining" />;
};

export const ProfileTabIcon: FC<IconProp> = ({focused}) => {
  return focused ? <TabIconFocused name="Profile" /> : <TabIcon name="Profile" />;
};
