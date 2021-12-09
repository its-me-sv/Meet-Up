import React from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { InterestHolder as Ih } from "../../settings/screens/view-account.styles";

const InterestHolder = ({ children, id }) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate("Interest Profile", { id })}>
            <Ih>
                {children}
            </Ih>
        </Pressable>
    );
};

export default InterestHolder;