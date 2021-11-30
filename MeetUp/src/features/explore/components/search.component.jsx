import React from "react";
import { View } from "react-native";
import { Searchbar } from 'react-native-paper';

const SearchBar = () => {
    return (
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
                selectionColor="#0095f6"
                iconColor="#2c2929"
            />
        </View>
    );
};

export default SearchBar;