import styled from "styled-components/native";
import { ScrollView, Dimensions } from "react-native";

export const ExploreContainer = styled.View`
    flex: 1;
    flex-direction: column;
    padding: 12px;
    padding-top: 0px;
    justify-content: space-evenly;
`;

const windowHeight = Dimensions.get("window").height;

export const InterestScroller = styled(ScrollView)`
    height: ${`${(windowHeight * 28) / 100}px`};
`;

export const PeopleScroller = styled(ScrollView)`
    height: ${`${(windowHeight * 31) / 100}px`};
`;