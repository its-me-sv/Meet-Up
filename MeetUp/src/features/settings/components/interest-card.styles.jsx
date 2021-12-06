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
    ${({explore}) => explore === true && (
        `
            padding: 6px;
            margin: 3px;
            elevation: 0;
            border-radius: 7px;
            border-radius: 18px;
            border-width: 1.2px;
            border-color: #b1acac;
        `
    )}
`;

export const RemoveButton = styled(Button).attrs({
    mode: "outlined",
    color: "#2c2929",
    // icon: "minus-circle-outline",
    compact: true
})`
    margin-left: auto;
    width: 90px;
`;

export const AddButton = styled(Button).attrs({
    mode: "contained",
    color: "#2c2929",
    // icon: "plus-circle-outline",
    compact: true
})`
    margin-left: auto;
    width: 90px;
`;

export const MessageButton = styled(Button).attrs({
    mode: "contained",
    color: "#2c2929",
    // icon: "message",
    compact: true,
    // labelStyle: { color: "black" }
})``;

export const RemoveText = styled(Button).attrs({
    mode: "outlined",
    color: "#2c2929",
    // icon: "minus-circle-outline",
    compact: true,
})``;