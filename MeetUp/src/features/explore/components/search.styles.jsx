import styled from "styled-components/native";
import { Searchbar } from 'react-native-paper';

export const SearchContainer = styled.View`
    padding: 12px;
    width: 100%;
    padding-bottom: 0px;
`;

export const SearchBar = styled(Searchbar).attrs({
    placeholder: "Search interests and people",
    selectionColor: "#0095f6",
    iconColor: "#2c2929"
})`
    elevation: 7;
    border-radius: 12px;
`;