import {View, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {phoneStyles} from '@unistyles/phoneStyles';
import {resetAndNavigate} from '@utils/NavigationUtils';
import CustomText from '@components/global/CustomText';

const SocialLogin: FC = () => {
  const {styles} = useStyles(phoneStyles);

  const handleGoogleLogin = () => {
    resetAndNavigate('UserBottomTab');
  };

  return (
    <View style={styles.socialContainer}>
      <TouchableOpacity 
        style={[styles.iconContainer, {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20, paddingVertical: 12}]}
        onPress={handleGoogleLogin}
        activeOpacity={0.8}
      >
        <Image
          source={require('@assets/icons/google.png')}
          style={[styles.gimg, {marginRight: 10}]}
        />
        <CustomText fontFamily="Okra-Medium" variant="h5" color="#333">
          Continue with Google
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default SocialLogin;
