import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useStyles} from 'react-native-unistyles';
import {homeStyles} from '@unistyles/homeStyles';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import Icon from '@components/global/Icon';

const ProfileScreen: FC = () => {
  const insets = useSafeAreaInsets();
  const {styles} = useStyles(homeStyles);

  const profileOptions = [
    {
      id: 1,
      title: 'Edit Profile',
      icon: 'person-outline',
      iconFamily: 'Ionicons' as const,
    },
    {
      id: 2,
      title: 'Addresses',
      icon: 'location-outline',
      iconFamily: 'Ionicons' as const,
    },
    {
      id: 3,
      title: 'Payment Methods',
      icon: 'card-outline',
      iconFamily: 'Ionicons' as const,
    },
    {
      id: 4,
      title: 'Notifications',
      icon: 'notifications-outline',
      iconFamily: 'Ionicons' as const,
    },
    {
      id: 5,
      title: 'Help & Support',
      icon: 'help-circle-outline',
      iconFamily: 'Ionicons' as const,
    },
    {
      id: 6,
      title: 'About',
      icon: 'information-circle-outline',
      iconFamily: 'Ionicons' as const,
    },
    {
      id: 7,
      title: 'Logout',
      icon: 'log-out-outline',
      iconFamily: 'Ionicons' as const,
      isDestructive: true,
    },
  ];

  const renderProfileOption = (option: any) => (
    <TouchableOpacity
      key={option.id}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginVertical: 4,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
      }}>
      <Icon
        name={option.icon}
        iconFamily={option.iconFamily}
        size={24}
        color={option.isDestructive ? '#FF4444' : Colors.text}
      />
      <CustomText
        fontFamily="Okra-Medium"
        fontSize={16}
        color={option.isDestructive ? '#FF4444' : Colors.text}
        style={{marginLeft: 16, flex: 1}}>
        {option.title}
      </CustomText>
      <Icon
        name="chevron-forward"
        iconFamily="Ionicons"
        size={20}
        color="#ccc"
      />
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      }}>
        <CustomText fontFamily="Okra-Bold" fontSize={20} color="#333">
          Profile
        </CustomText>
      </View>

      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={{
          backgroundColor: '#fff',
          margin: 16,
          borderRadius: 12,
          padding: 20,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}>
          <Image
            source={require('@assets/images/user.jpg')}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              marginBottom: 12,
            }}
          />
          <CustomText fontFamily="Okra-Bold" fontSize={18} color="#333" style={{marginBottom: 4}}>
            John Doe
          </CustomText>
          <CustomText fontFamily="Okra-Medium" fontSize={14} color="#666">
            john.doe@example.com
          </CustomText>
          <CustomText fontFamily="Okra-Medium" fontSize={12} color="#999" style={{marginTop: 4}}>
            +91 98765 43210
          </CustomText>
        </View>

        {/* Profile Options */}
        <View style={{marginTop: 8}}>
          {profileOptions.map(renderProfileOption)}
        </View>

        {/* App Info */}
        <View style={{
          alignItems: 'center',
          paddingVertical: 20,
          marginTop: 20,
        }}>
          <CustomText fontFamily="Okra-Medium" fontSize={12} color="#999">
            Laziz App v1.0.0
          </CustomText>
          <CustomText fontFamily="Okra-Medium" fontSize={12} color="#999" style={{marginTop: 4}}>
            Made with ❤️ for Bakhtiyarpur
          </CustomText>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
