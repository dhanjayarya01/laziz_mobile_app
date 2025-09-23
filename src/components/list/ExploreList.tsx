import {View} from 'react-native';
import React from 'react';
import {homeStyles} from '@unistyles/homeStyles';
import {useStyles} from 'react-native-unistyles';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import RecommendedList from './RecommendedList';
import BreakerText from '@components/ui/BreakerText';
import RegularFoodList from './RegularFoodList';

const ExploreList = () => {
  const {styles} = useStyles(homeStyles);

  return (
    <View style={styles.topHidingContainer}>
      <View style={styles.flexRowCenter}>
        <View style={styles.leftTab(true)}>
          <CustomText
            color={Colors.text}
            fontFamily="Okra-Medium">
            Laziz Special
          </CustomText>
        </View>
      </View>

      <RecommendedList />
      <BreakerText text="CRAVING SOMETHING?" />
      <RegularFoodList />
      <BreakerText text="ALL FOODS" />
    </View>
  );
};

export default ExploreList;
