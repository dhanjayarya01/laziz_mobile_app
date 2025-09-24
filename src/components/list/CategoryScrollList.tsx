import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useStyles } from 'react-native-unistyles';
import { homeStyles } from '@unistyles/homeStyles';
import CustomText from '@components/global/CustomText';
import { Colors } from '@unistyles/Constants';

const categoryData = [
    { id: 1, name: 'Starter' },
    { id: 2, name: 'Main Course' },
    { id: 3, name: 'Drink' },
    { id: 4, name: 'Coffee' },
    { id: 5, name: 'Dessert' },
    { id: 6, name: 'Snacks' },
    { id: 7, name: 'Salad' },
    { id: 8, name: 'Soup' }
];

const CategoryScrollList = () => {
    const { styles } = useStyles(homeStyles);

    return (
        <View style={{ marginVertical: 15 }}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15, gap: 10 }}
            >
                {categoryData.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={{
                            backgroundColor: Colors.background,
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderRadius: 20,
                            borderWidth: 1,
                            borderColor: '#E0E0E0',
                            marginRight: 10
                        }}
                        activeOpacity={0.7}
                    >
                        <CustomText 
                            fontFamily="Okra-Medium" 
                            color={Colors.text}
                            fontSize={14}
                        >
                            {category.name}
                        </CustomText>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default CategoryScrollList;
