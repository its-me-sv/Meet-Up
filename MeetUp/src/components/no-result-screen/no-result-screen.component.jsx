import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import Text from "../typography/text.component";
import Spacer from "../spacer/spacer.component";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const NoResultScreen = () => (
    <Container>
        <Ionicons name="search-outline" size={84} color="gray" />
        <Spacer size="large" />
        <Text style={{opacity: 0.7}}>No Results Found</Text>
    </Container>
);

export default NoResultScreen;