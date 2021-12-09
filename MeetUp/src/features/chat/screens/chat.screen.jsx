import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const ChatStack = createStackNavigator();

const ChatMenu = () => <View><Text>Chat Menu</Text></View>;

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