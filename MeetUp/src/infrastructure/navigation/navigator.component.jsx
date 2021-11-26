import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { connect } from "react-redux"

import AccountNavigator from "./account.navigator";
import AppNavigator from "./app.navigator";

const Navigation = ({ user }) => {
    return (
        <NavigationContainer>
            { user ? <AppNavigator /> : <AccountNavigator />}
        </NavigationContainer>
    );
};

const mapStateToProps = state => ({
    user: state.user.user
});

export default connect(mapStateToProps)(Navigation);