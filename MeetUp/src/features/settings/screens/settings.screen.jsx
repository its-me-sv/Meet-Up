import React from "react";
import {
    createStackNavigator,
    TransitionPresets
} from "@react-navigation/stack";

import MenuScreen from "./menu.screen";
import ConditionsScreen from "../../account/screens/conditions.screen";
import CredentialsScreen from "./credentials.screen";
import ManageInterest from "./manage-interest.screen";
import EditProfileScreen from "./edit-profile.screen";
import CameraScreen from "./camera.screen";
import ViewAccount from "./view-account.component";

const screenOptions = {
    headerMode: 'screen',
    headerTitleAlign: 'center',
    ...TransitionPresets.ModalPresentationIOS,
};

const SettingStack = createStackNavigator();

const TermsAndPolicies = () => <ConditionsScreen fromSettings={true} />;

const SettingsScreen = () => {
    return (
        <SettingStack.Navigator screenOptions={screenOptions}>
            <SettingStack.Screen 
                name="Settings"
                options={{
                    headerTitleAlign: "left"
                }}
                component={MenuScreen}
            />
            <SettingStack.Screen
                name="Terms and Policies"
                component={TermsAndPolicies}
                options={{ headerShown: false }}
            />
            <SettingStack.Screen
                name="Change credentials"
                component={CredentialsScreen}
                options={{ headerShown: false }}
            />
            <SettingStack.Screen
                name="Manage interests"
                component={ManageInterest}
                options={{ headerShown: false }}
            />
            <SettingStack.Screen
                name="Edit profile"
                component={EditProfileScreen}
                options={{ headerShown: false }}
            />
            <SettingStack.Screen
                name="Camera"
                component={CameraScreen}
                options={{ headerShown: false }}
            />
            <SettingStack.Screen
                name="Account"
                component={ViewAccount}
                options={{ headerShown: false }}
            />
        </SettingStack.Navigator>
    );
};

export default SettingsScreen;