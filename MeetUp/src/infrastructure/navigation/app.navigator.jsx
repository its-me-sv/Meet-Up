import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

import SettingsScreen from "../../features/settings/screens/settings.screen";
import ExploreMenu from "../../features/explore/screens/explore-menu.screen";
import ExploreTabs from "../../features/explore/screens/explore-tabs.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Chat: "chatbox",
    Explor: "search",
    Setting: "settings"
};

const ChatScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>ChatScreen</Text>
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
    tabBarHideOnKeyboard: true
});

const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Explor" component={ExploreMenu} options={{headerShown: false}}/>
            <Tab.Screen name="Setting" component={SettingsScreen} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
};

export default AppNavigator;