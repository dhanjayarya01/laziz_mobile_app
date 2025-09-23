import {
  View,
  Platform,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import {loginStyles} from '@unistyles/authStyles';
import {useStyles} from 'react-native-unistyles';
import CustomText from '@components/global/CustomText';
import BreakerText from '@components/ui/BreakerText';
import SocialLogin from '@components/ui/SocialLogin';
import useKeyboardOffsetHeight from '@utils/useKeyboardOffsetHeight';

const LoginScreen: FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current
  const keyboardOffsetHeight = useKeyboardOffsetHeight()
  const {styles} = useStyles(loginStyles);

  useEffect(() => {
    if (keyboardOffsetHeight == 0) {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start()
    } else {
        Animated.timing(animatedValue, {
            toValue: -keyboardOffsetHeight * 0.25,
            duration: 500,
            useNativeDriver: true
        }).start()
    }
}, [keyboardOffsetHeight])

  return (
    <View style={styles.container}>
      <StatusBar hidden={Platform.OS !== 'android'} />

      <Image
        source={require('@assets/images/login.png')}
        style={styles.cover}
      />

      <Animated.ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={{ transform: [{ translateY: animatedValue }] }}
        contentContainerStyle={styles.bottomContainer}>
        <CustomText fontFamily="Okra-Bold" variant="h2" style={styles.title}>
          Welcome to Laziz
        </CustomText>
        
        <CustomText fontFamily="Okra-Medium" variant="h4" style={styles.subtitle}>
          Your favorite food, delivered fresh
        </CustomText>

        <BreakerText text="Sign in to continue" />

        <SocialLogin />
      </Animated.ScrollView>

      <View style={styles.footer}>
        <CustomText>By continuing, you agree to our</CustomText>
        <View style={styles.footerTextContainer}>
          <CustomText style={styles.footerText}>Terms of Service</CustomText>
          <CustomText style={styles.footerText}>Privacy Policy</CustomText>
          <CustomText style={styles.footerText}>Content Policies</CustomText>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
