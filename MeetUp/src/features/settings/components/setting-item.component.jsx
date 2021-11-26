import React from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import Spacer from "../../../components/spacer/spacer.component";
import {
    ItemContainer,
    FieldText
} from "./setting-item.styles";

const SettingItem = ({ brand = "f", icon, field, callBack }) => {
    const IconBrand = brand === 'f' ? Feather : MaterialCommunityIcons;
    return (
        <ItemContainer onPress={callBack}>
            <IconBrand size={24} name={icon} />
            <Spacer position="left" size="large" />
            <FieldText>{field}</FieldText>
        </ItemContainer>
    );
};

export default SettingItem;