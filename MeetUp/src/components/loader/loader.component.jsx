import React from "react";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";

const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const LoaderAnimation = styled(ActivityIndicator).attrs({
    animating: true,
    color: "black",
    size: "large"
})``;

const Loader = () => (<CenteredView><LoaderAnimation /></CenteredView>);

export default Loader;