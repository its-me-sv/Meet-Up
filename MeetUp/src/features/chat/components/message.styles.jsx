import styled from "styled-components/native";
import { Dimensions, ScrollView } from "react-native";

const screenWidth = Dimensions.get("screen").width;

export const MessageContainer = styled(ScrollView)`
    background-color: #bdb8b8;
    max-width: ${0.6 * screenWidth}px;
    margin: 6px;
    margin-bottom: 1px;
    border-radius: 7px;
    padding: 7px;
    padding-top: 2px;
    padding-bottom: 2px;
    ${({fromUser}) => fromUser === true && `
        background-color: #d6d4d4;
        margin-left: auto;
    `}
    max-height: 170px;
`;

export const Message = styled.Text`
    font-size: 18px;
`;

export const Time = styled.Text`
    font-size: 12px;
    margin-left: auto;
    color: #535252;
    ${({fromUser}) => fromUser === true && `color: #6f6c6c;`}
`;