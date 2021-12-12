import React, { useState } from "react";

import {
    SearchContainer,
    SearchBar as Searchbar
} from "./search.styles";

const SearchBar = ({ cb }) => {
    const [keyword, setKeyword] = useState("");
    const callBack = () => cb(keyword);
    return (
        <SearchContainer>
            <Searchbar 
                value={keyword}
                onChangeText={setKeyword}
                onIconPress={callBack}
                onSubmitEditing={callBack}
            />
        </SearchContainer>
    );
};

export default SearchBar;