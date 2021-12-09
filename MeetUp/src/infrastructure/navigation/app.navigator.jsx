import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SettingsScreen from "../../features/settings/screens/settings.screen";
import ExploreMenu from "../../features/explore/screens/explore-menu.screen";
import ChatScreen from "../../features/chat/screens/chat.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Chat: "chatbox",
    Explor: "search",
    Setting: "settings"
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
    tabBarHideOnKeyboard: true,
    headerShown: false
});

const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Explor" component={ExploreMenu} />
            <Tab.Screen name="Setting" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default AppNavigator;