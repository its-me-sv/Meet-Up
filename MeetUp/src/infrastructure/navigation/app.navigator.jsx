import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Chat: "chatbox",
    Search: "search",
    Settings: "settings"
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

const SettingsScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>SettingsScreen</Text>
        </View>
    );
};

const screenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName = TAB_ICON[route.name];
        !focused && (iconName += "-outline");
        return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: '#453a94',
    tabBarInactiveTintColor: 'gray',
    headerShown: false,
    tabBarShowLabel: false
});

const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default AppNavigator;