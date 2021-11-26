import React from "react";

import SettingItem from "../components/setting-item.component";
import { MenuContainer } from "./menu.styles";

const MenuScreen = () => {
    return (
        <MenuContainer>
            <SettingItem icon="user" field="View account" />
            <SettingItem icon="edit" field="Edit profile" />
            <SettingItem icon="list" field="Manage intrests" />
            <SettingItem brand="mic" icon="form-textbox-password" field="Change credentials" />
            <SettingItem icon="log-out" field="Logout" />
        </MenuContainer>
    );
};

export default MenuScreen;