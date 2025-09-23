import {View, TouchableOpacity, Image} from 'react-native';
import React, {FC, useState} from 'react';
import {useStyles} from 'react-native-unistyles';
import {phoneStyles} from '@unistyles/phoneStyles';
import {resetAndNavigate} from '@utils/NavigationUtils';
import CustomText from '@components/global/CustomText';

const SocialLogin: FC = () => {
  const {styles} = useStyles(phoneStyles);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    // Simulate Google login process
    setTimeout(() => {
      setLoading(false);
      resetAndNavigate('UserBottomTab');
    }, 1500);
  };

  return (
    <View style={styles.socialContainer}>
      <TouchableOpacity 
        style={{
          width: '100%',
          height: 55,
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#e0e0e0',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
        onPress={handleGoogleLogin}
        disabled={loading}
        activeOpacity={0.8}
      >
        <Image
          source={require('@assets/icons/google.png')}
          style={{width: 24, height: 24, marginRight: 12}}
        />
        <CustomText 
          fontFamily="Okra-Medium" 
          fontSize={16}
          color="#333"
        >
          {loading ? 'Signing in...' : 'Continue with Google'}
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default SocialLogin;
