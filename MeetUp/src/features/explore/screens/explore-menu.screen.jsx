import React from "react";
import {
    createStackNavigator,
    CardStyleInterpolators,
} from "@react-navigation/stack";

import ExploreScreen from "./explore.screen";

const screenOptions = {
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerMode: 'screen',
    headerTitleAlign: 'center'
};

const ExploreStack = createStackNavigator();

const ExploreMenu = () => {
    return (
        <ExploreStack.Navigator screenOptions={screenOptions}>
            <ExploreStack.Screen 
                name="Explore"
                options={{
                    headerTitleAlign: "left"
                }}
                component={ExploreScreen}
            />
        </ExploreStack.Navigator>
    );
};

export default ExploreMenu;