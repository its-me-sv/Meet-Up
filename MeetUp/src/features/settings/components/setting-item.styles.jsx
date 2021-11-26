import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const ItemContainer = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    padding: 10px;
    padding-top: 0px;
`;

export const FieldText = styled.Text`
    font-size: 24px;
    color: #282626;
`;