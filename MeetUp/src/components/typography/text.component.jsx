import styled from "styled-components/native";

const defaultTextStyles = theme => `
    font-weight: ${theme.fontWeights.regular};
    color: ${theme.colors.text.primary};
    flex-wrap: wrap;
    margin-top: 0px;
    margin-bottom: 0px;
`;

const body = theme => `
    font-size: ${theme.fontSizes.body};
`;

const hint = theme => `
    font-size: ${theme.fontSizes.body};
`;

const error = theme => `
    color: ${theme.colors.text.error};
`;

const caption = theme => `
    font-size: ${theme.fontSizes.caption};
    font-weight: ${theme.fontWeights.bold};
`;

const label = theme => `
    font-size: ${theme.fontSizes.body};
    font-weight: ${theme.fontWeights.medium};
`;

const success = theme => `
    color: ${theme.colors.text.success};
`;

const variants = {
    body,
    label,
    caption,
    error,
    hint,
    success
};

const Text = styled.Text`
    ${({ theme }) => defaultTextStyles(theme)}
    ${({ variant, theme }) => variants[variant](theme)}
`;

Text.defaultProps = {
    variant: "body"
};

export default Text;