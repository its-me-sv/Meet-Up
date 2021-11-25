import React from "react";
import styled, { useTheme } from "styled-components/native";

const sizes = {
    small: 1,
    medium: 2,
    large: 3
};

const positions = {
    top: "margin-top",
    left: "margin-left",
    right: "margin-right",
    bottom: "margin-bottom"
};

const getVariant = (pos, size, theme) => {
    const sizeIndex = sizes[size];
    const property = positions[pos];
    const value = theme.space[sizeIndex];
    return `${property}: ${value}`;
};

const SpacerView = styled.View`
    ${({ variant }) => variant};
`;

const Spacer = ({ position = "top", size = "small", children }) => {
    const theme = useTheme();
    const variant = getVariant(position, size, theme);
    return (
        <SpacerView variant={variant}>
            {children}
        </SpacerView>
    );
};

export default Spacer;