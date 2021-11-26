import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";

const SafeArea = styled(SafeAreaView)`
    flex: 1;
    ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
    ${StatusBar.currentHeight && `margin-bottom: ${StatusBar.currentHeight}px`};
    ${({fromSettings}) => fromSettings && `
        margin-top: 0px;
        margin-bottom: 0px;
    `}
`;

export default SafeArea;