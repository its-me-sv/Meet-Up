import React, {useEffect} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import SettingsScreen from "../../features/settings/screens/settings.screen";
import ExploreMenu from "../../features/explore/screens/explore-menu.screen";
import ChatScreen from "../../features/chat/screens/chat.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
    Chat: "chatbox",
    Explor: "search",
    Setting: "settings"
};

const getTabStyles = (route) => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
    switch (routeName) {
        case "Chat Screen":
            return { display: "none" };
        default:
            return {};
    }
}

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
    headerShown: false,
    tabBarStyle: getTabStyles(route)
});

const AppNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName="Chat"
            screenOptions={screenOptions}
        >
            <Tab.Screen name="Chat" component={ChatScreen} />
            <Tab.Screen name="Explor" component={ExploreMenu} />
            <Tab.Screen name="Setting" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default AppNavigator;