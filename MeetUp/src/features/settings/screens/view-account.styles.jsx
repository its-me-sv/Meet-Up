import styled from "styled-components/native";
import { Chip } from "react-native-paper";

export const AccountContainer = styled.View`
    flex: 1;
    flex-direction: column;
    margin: 21px;
`;

export const ProfileTop = styled.View`
    flex-direction: row;
    margin-bottom: 14px;
`;

export const ProfileTopRight = styled.View`
    flex-direction: column;
    margin-left: 10px;
`;

export const TextVariant1 = styled.Text`
    color: #343131;
    font-size: 28px;
`;

export const TextVariant2 = styled.Text`
    color: #343131;
    font-size: 18px;
`;

export const JoinedContainer = styled.View`
    flex-direction: row;
`;

export const TextVariant3 = styled.Text`
    color: black;
    font-size: 16px;
    ${({opaque}) => opaque === true && `opacity: 0.4;`}
`;

export const RightEndText = styled.Text`
    color: black;
    font-size: 16px;
    margin-top: auto;
    margin-left: auto;
    opacity: 0.5;
`;

export const InteresetWrapper = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

export const InterestHolder = styled(Chip).attrs({
    mode: "outlined",
    textStyle: {color: "white"}
})`
    margin-right: 3px;
    margin-top: 4px;
    /* padding: 2px; */
    /* elevation: 4; */
    /* ${({ color }) => `background-color: ${color};`} */
    background-color: #2c2929;
`;

export const FriendContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 3px;
    margin: 3px;
    border-radius: 18px;
    border-width: 1.2px;
    border-color: #b1acac;
`;