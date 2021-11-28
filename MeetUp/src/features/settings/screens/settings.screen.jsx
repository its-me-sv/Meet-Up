import React from "react";
import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";

import MenuScreen from "./menu.screen";
import ConditionsScreen from "../../account/screens/conditions.screen";
import CredentialsScreen from "./credentials.screen";
import ManageInterest from "./manage-interest.screen";
import EditProfileScreen from "./edit-profile.screen";
import CameraScreen from "./camera.screen";

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
            <SettingStack.Screen
                name="Change credentials"
                component={CredentialsScreen}
            />
            <SettingStack.Screen
                name="Manage interests"
                component={ManageInterest}
            />
            <SettingStack.Screen
                name="Edit profile"
                component={EditProfileScreen}
            />
            <SettingStack.Screen
                name="Camera"
                component={CameraScreen}
            />
        </SettingStack.Navigator>
    );
};

export default SettingsScreen;