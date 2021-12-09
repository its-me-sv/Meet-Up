import React from "react";
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";

import ExploreScreen from "./explore.screen";
import InterestProfileCard from "../../../components/profile-cards/interests-profile-card.component";
import PersonProfileCard from "../../../components/profile-cards/person-profile-card.component";

const screenOptions = {
    headerMode: 'screen',
    headerTitleAlign: 'center',
    // ...TransitionPresets.ModalPresentationIOS
};

const ExploreStack = createStackNavigator();

const ExploreMenu = () => {
    return (
        <ExploreStack.Navigator screenOptions={screenOptions}>
            <ExploreStack.Screen 
                name="Explore"
                options={{ headerTitleAlign: "left" }}
                component={ExploreScreen}
            />
            <ExploreStack.Screen 
                name="Interest Profile"
                options={{ headerTitle: "" }}
                component={InterestProfileCard}
            />
            <ExploreStack.Screen
                name="Person Profile"
                options={{ headerTitle: "" }}
                component={PersonProfileCard}
            />
        </ExploreStack.Navigator>
    );
};

export default ExploreMenu;