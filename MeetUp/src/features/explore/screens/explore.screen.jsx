import React from "react";
import { ScrollView, View } from "react-native";
import { Searchbar } from 'react-native-paper';

const ExploreScreen = () => {
    return (
        <ScrollView>
            <View style={{
                padding: 12,
                width: "100%",
            }}>
                <Searchbar 
                    placeholder="Search interests and people"
                    style={{
                        elevation: 7,
                        borderRadius: 12
                    }}
                />
            </View>
        </ScrollView>
    );
};

export default ExploreScreen;