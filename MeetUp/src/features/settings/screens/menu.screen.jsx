import React from "react";
import { connect } from "react-redux";

import SettingItem from "../components/setting-item.component";
import { MenuContainer } from "./menu.styles";
import {
    userReset
} from "../../../redux/user/user.actions"

const MenuScreen = ({ resetUser, navigation }) => {
    return (
        <MenuContainer>
            <SettingItem icon="user" field="View account" />
            <SettingItem icon="edit" field="Edit profile" />
            <SettingItem icon="list" field="Manage intrests" />
            <SettingItem 
                brand="mci" 
                icon="form-textbox-password" 
                field="Change credentials" 
                callBack={() => navigation.navigate("Change credentials")}
            />
            <SettingItem 
                brand="mci" 
                icon="script-text-outline" 
                field="Terms and Policies" 
                callBack={() => navigation.navigate("Terms and Policies")}
            />
            <SettingItem icon="log-out" field="Logout" callBack={resetUser} />
        </MenuContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    resetUser: () => dispatch(userReset())
});

export default connect(
    null,
    mapDispatchToProps
)(MenuScreen);