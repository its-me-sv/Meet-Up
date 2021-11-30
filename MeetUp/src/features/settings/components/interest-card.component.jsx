import React from "react";
import { connect } from "react-redux";

import Text from "../../../components/typography/text.component";
import {
    CardContainer,
    RemoveButton,
    AddButton
} from "./interest-card.styles";
import Spacer from "../../../components/spacer/spacer.component";


const InterestCard = ({name, remove, fromExplore, add}) => {
    return (
        <CardContainer explore={fromExplore}>
            <Text>{name}</Text>
            {remove && <RemoveButton onPress={remove}>Remove</RemoveButton>}
            {add && <AddButton onPress={add}>Add</AddButton>}
            <Spacer size="medium" position="right" />
        </CardContainer>
    );
}

export default InterestCard