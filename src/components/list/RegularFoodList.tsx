import { View, Text, Image, ScrollView, FlatList } from 'react-native'
import React from 'react'
import { useStyles } from 'react-native-unistyles'
import { cardStyles } from '@unistyles/cardStyles'
import ScalePress from '@components/ui/ScalePress'
import { regularFoodData, foodCategories } from '@utils/dummyData'
import { navigate } from '@utils/NavigationUtils'

const RegularFoodList = () => {

    const { styles } = useStyles(cardStyles)

    const renderItem = ({ item }: any) => {
        return (
            <ScalePress 
                style={styles.itemContainer}
                onPress={() => {
                    // Navigate to food category screen with specific food items
                    const categoryKey = item.name.toLowerCase().replace(/\s+/g, '');
                    if (foodCategories[categoryKey as keyof typeof foodCategories]) {
                        navigate('RestaurantScreen', {
                            item: {
                                name: item.name,
                                items: foodCategories[categoryKey as keyof typeof foodCategories]
                            }
                        });
                    } else {
                        // For categories without specific data, show general items
                        navigate('RestaurantScreen', {
                            item: {
                                name: item.name,
                                items: []
                            }
                        });
                    }
                }}
            >
                <Image source={{ uri: item?.imageUrl }} style={styles.regularFoodImage} />
            </ScalePress>
        )
    }


    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
                numColumns={Math.ceil(regularFoodData?.length / 2)}
                data={regularFoodData}
                renderItem={renderItem}
                scrollEnabled={false}
                keyExtractor={item => item?.id?.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                style={styles.regularFoodContainer}
            />
        </ScrollView>
    )
}

export default RegularFoodList