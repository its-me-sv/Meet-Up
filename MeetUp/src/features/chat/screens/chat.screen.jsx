import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ChatMenu from "./menu.screen";

const ChatStack = createStackNavigator();

const ChatScreen = () => {
    return (
        <ChatStack.Navigator>
            <ChatStack.Screen 
                name="Chat Menu"
                options={{headerTitle: "Chat"}}
                component={ChatMenu}
            />
        </ChatStack.Navigator>
    );
};

export default ChatScreen;