import styled from "styled-components/native";

export const ConditionsContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export const ScrollContainer = styled.ScrollView`
    padding: ${props => props.theme.space[4]};;
    padding-top: 0px;
`;