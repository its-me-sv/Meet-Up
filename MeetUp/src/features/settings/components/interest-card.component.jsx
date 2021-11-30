import React from "react";

import Text from "../../../components/typography/text.component";
import {
    CardContainer,
    RemoveButton,
    AddButton
} from "./interest-card.styles";

const InterestCard = ({name, remove, fromExplore, add}) => {
    return (
        <CardContainer explore={fromExplore}>
            <Text>{name}</Text>
            {remove && <RemoveButton onPress={remove}>Remove</RemoveButton>}
            {add && <AddButton onPress={add}>Add</AddButton>}
        </CardContainer>
    );
}

export default InterestCard