import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatMenu from "./menu.screen";
import MessagesScreen from "./messages.screen";

const ChatStack = createStackNavigator();

const ChatScreen = () => {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen 
                name="Chat Menu"
                options={{headerTitle: "Chat"}}
                component={ChatMenu}
            />
            <ChatStack.Screen
                name="Chat Screen"
                component={MessagesScreen}
                options={{headerTitleAlign: "center"}}
            />
        </ChatStack.Navigator>
    );
};

export default ChatScreen;