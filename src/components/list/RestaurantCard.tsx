import {View, Text, Image} from 'react-native';
import React, {FC} from 'react';
import {useStyles} from 'react-native-unistyles';
import {restaurantStyles} from '@unistyles/restuarantStyles';
import ScalePress from '@components/ui/ScalePress';
import {navigate} from '@utils/NavigationUtils';
import CustomText from '@components/global/CustomText';
import StarRating from '@components/ui/StarRating';
import DottedLine from '@components/ui/DottedLine';

const RestaurantCard: FC<{item: any}> = ({item}) => {
  const {styles} = useStyles(restaurantStyles);

  return (
    <ScalePress
      onPress={() => {
        navigate('RestaurantScreen', {
          item: item,
        });
      }}>
      <View style={styles.card}>
        <View>
          <Image source={{uri: item?.image || item?.imageUrl}} style={styles.image} />
        </View>

        <View style={styles.info}>
          <View style={styles.textContainer}>
            <View style={styles.textPart}>
              <CustomText
                variant="h5"
                style={styles.name}
                numberOfLines={1}
                fontFamily="Okra-Bold">
                {item?.name}
              </CustomText>
              <CustomText numberOfLines={2} style={{marginTop: 4}}>
                {item?.description}
              </CustomText>
              <CustomText style={{marginTop: 4, fontWeight: 'bold'}}>
                ₹{item?.price}
              </CustomText>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
              <Image 
                source={item?.isVeg ? require('@assets/icons/veg.png') : require('@assets/icons/non_veg.png')} 
                style={{width: 16, height: 16, marginRight: 8}} 
              />
              <CustomText fontSize={12} color="#666">
                {item?.isVeg ? 'Veg' : 'Non-Veg'}
              </CustomText>
            </View>
          </View>
          <DottedLine />
          {item?.isCustomizable && (
            <CustomText fontSize={12} color="#666">
              Customizable
            </CustomText>
          )}
        </View>
      </View>
    </ScalePress>
  );
};

export default RestaurantCard;
