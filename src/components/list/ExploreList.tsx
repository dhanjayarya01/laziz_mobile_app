import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {homeStyles} from '@unistyles/homeStyles';
import {useStyles} from 'react-native-unistyles';
import CustomText from '@components/global/CustomText';
import {Colors} from '@unistyles/Constants';
import Icon from '@components/global/Icon';
import RecommendedList from './RecommendedList';
import BreakerText from '@components/ui/BreakerText';
import RegularFoodList from './RegularFoodList';
import CategoryScrollList from './CategoryScrollList';

const ExploreList = () => {
  const [tabSelected, setSelectedTab] = useState(1);
  const {styles} = useStyles(homeStyles);

  return (
    <View style={styles.topHidingContainer}>
      <View style={styles.flexRowCenter}>
        <Pressable
          style={styles.leftTab(tabSelected === 1)}
          onPress={() => setSelectedTab(1)}>
          <CustomText
            color={tabSelected == 1 ? Colors.text : Colors.lightText}
            fontFamily="Okra-Medium">
            Laziz Special
          </CustomText>
        </Pressable>
      </View>

      <RecommendedList />
      <BreakerText text="FOOD CATEGORIES" />
      <RegularFoodList />
      <CategoryScrollList />
      <CategoryScrollList />
    </View>
  );
};

export default ExploreList;
