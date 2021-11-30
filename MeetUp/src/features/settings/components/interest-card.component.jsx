import React from "react";

import Text from "../../../components/typography/text.component";
import {
    CardContainer,
    RemoveButton
} from "./interest-card.styles";

const InterestCard = ({name, cb, fromExplore}) => {
    return (
        <CardContainer explore={fromExplore}>
            <Text>{name}</Text>
            <RemoveButton onPress={cb}>Remove</RemoveButton>
        </CardContainer>
    );
}

export default InterestCard