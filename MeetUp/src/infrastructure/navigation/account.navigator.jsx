import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../../features/account/screens/account.screen";
import RegisterScreen from "../../features/account/screens/register.screen";
import ConditionsScreen from "../../features/account/screens/conditions.screen";

const screenOptions = {
    headerShown: false
};

const Stack = createStackNavigator();

const AccountNavigator = () => {
    return (
        <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={AccountScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="Conditions" component={ConditionsScreen}/>
        </Stack.Navigator>
    );
};

export default AccountNavigator;