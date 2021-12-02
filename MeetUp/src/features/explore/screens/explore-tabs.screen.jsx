import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

import PeopleTab from "./people.screen";
import InterestsTab from "./interests.screen";

const screenOptions = {
    tabBarStyle: { backgroundColor: "#F1F1F1" },
    tabBarLabelStyle: { 
        fontSize: 16,
        textTransform: 'none'
    },
    tabBarActiveTintColor: "black",
    tabBarInactiveTintColor: "gray",
    tabBarIndicatorStyle: {
        borderTopWidth: 2,
        borderTopColor: 'black',
        borderRadius: 24
    }
};

const ExploreTabs = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Interests" component={InterestsTab} />
            <Tab.Screen name="People" component={PeopleTab} />
        </Tab.Navigator>
    );
};

export default ExploreTabs;