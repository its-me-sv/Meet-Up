import React from "react";
import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";

import MenuScreen from "./menu.screen";
import ConditionsScreen from "../../account/screens/conditions.screen";

const screenOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerMode: 'screen',
    headerTitleAlign: 'center'
};

const SettingStack = createStackNavigator();

const TermsAndPolicies = () => <ConditionsScreen fromSettings={true} />;

const SettingsScreen = () => {
    return (
        <SettingStack.Navigator
            screenOptions={screenOptions}
        >
            <SettingStack.Screen 
                options={{header: () => null}}
                name="Menu"
                component={MenuScreen}
            />
            <SettingStack.Screen
                name="Terms and Policies"
                component={TermsAndPolicies}
            />
        </SettingStack.Navigator>
    );
};

export default SettingsScreen;