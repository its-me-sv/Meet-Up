import styled from "styled-components/native";
import { Button } from "react-native-paper";

export const EditProfileContainer = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;
`;

export const ImageButton = styled(Button).attrs({
    mode: "outlined"
})`
    margin-top: 14px;
`;