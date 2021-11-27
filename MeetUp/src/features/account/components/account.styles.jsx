import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { Dimensions, Pressable, ScrollView } from "react-native";

import Text from "../../../components/typography/text.component";

const windowWidth = Dimensions.get("window").width;

export const Scroller = styled(ScrollView).attrs({
    contentContainerStyle: {
        flexGrow: 1, 
        justifyContent: 'center' 
    }
})`
`;

export const AccountContainer = styled.View`
    /* flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center; */
`;

export const AccountCover = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountForm = styled.View`
    padding: ${props => props.theme.space[0]};
    margin-top: ${props => props.theme.space[0]};
    flex-direction: column;
    align-items: center;
`;

export const AuthButton = styled(Button)`
    padding: ${props => props.theme.space[1]};
    width: ${windowWidth - 84}px;
    ${({tiny}) => tiny && `width: auto;`}
`;

export const AuthInput = styled(TextInput)`
    width: ${windowWidth-84}px;
`;

export const Title = styled(Text)`
    font-family: "HunderedMiraclesPlain";
    align-self: stretch;
    text-align: center;
    font-size: ${60}px;
`;

export const ErrorContainer = styled.View`
    max-width: 300px;
    align-items: center;
    align-self: center;
`;

export const PressableFooter = styled(Pressable)`
    align-self: center;
    justify-content: center;
    align-items: center;
    margin-bottom: ${props => props.theme.space[3]};
`;