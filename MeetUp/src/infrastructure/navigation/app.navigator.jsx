import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import SettingsScreen from "../../features/settings/screens/settings.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Chat: "chatbox",
    Explore: "search",
    Setting: "settings"
};

const ChatScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>ChatScreen</Text>
        </View>
    );
};

const SearchScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>SearchScreen</Text>
        </View>
    );
};

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName = TAB_ICON[route.name];
        !focused && (iconName += "-outline");
        return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray',
    tabBarShowLabel: false,
    // tabBarStyle: {
    //     backgroundColor: '#453a94'
    // },
    // headerStyle: {
    //     backgroundColor: '#453a94',
    // },
    // headerTitleStyle: {
    //     color: 'white'
    // }
});

const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Explore" component={SearchScreen} />
            <Tab.Screen name="Setting" component={SettingsScreen} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
};

export default AppNavigator;