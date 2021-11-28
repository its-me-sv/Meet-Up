import React from "react";
import { Button } from "react-native-paper";
import styled from "styled-components/native";

export const CardContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 14px;
    margin: 18px;
    margin-bottom: 0px;
    border-radius: 3px;
    elevation: 2;
`;

export const RemoveButton = styled(Button).attrs({
    mode: "contained",
    color: "#D0421B",
    icon: "minus-circle-outline",
    compact: true
})`
    margin-left: auto;
`;

export const AddButton = styled(Button).attrs({
    mode: "contained",
    color: "#138000",
    icon: "plus-circle-outline",
    compact: true
})`
    margin-left: auto;
`;