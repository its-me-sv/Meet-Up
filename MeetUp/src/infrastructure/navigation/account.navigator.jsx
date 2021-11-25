import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet } from "react-native";

import AccountScreen from "../../features/account/screens/account.screen";

const RegisterScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Register Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "tomato"
    }
});

const screenOptions = {
    headerShown: false
};

const Stack = createStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={AccountScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
        </Stack.Navigator>
    );
};

export default AccountNavigator;