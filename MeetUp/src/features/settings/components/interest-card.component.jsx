import React from "react";
import { connect } from "react-redux";

import Text from "../../../components/typography/text.component";
import {
    CardContainer,
    RemoveButton,
    AddButton
} from "./interest-card.styles";
import Spacer from "../../../components/spacer/spacer.component";
import {
    addInterestToDB,
    removeInterestFromDB
} from "../../../redux/user/user.actions";

const InterestCard = ({
    _id: id, name, fromExplore,
    userId, userInterests,
    addInterest, removeInterest
}) => {
    console.log(userInterests);
    const isInterest = userInterests.filter(({_id}) => _id === id).length === 1;
    return (
        <CardContainer explore={fromExplore}>
            <Text>{name}</Text>
            {
                isInterest 
                ? <RemoveButton onPress={() => removeInterest(userId, id)}>Remove</RemoveButton>
                : <AddButton onPress={() => addInterest(userId, id, name)}>Add</AddButton>
            }
            <Spacer size="medium" position="right" />
        </CardContainer>
    );
};

const mapStateToProps = ({ user }) => ({
    userId: user.user._id,
    userInterests: user.user.interests
});

const mapDispatchToProps = dispatch => ({
    addInterest: (id1, id2, name) => dispatch(addInterestToDB(id1, id2, name)),
    removeInterest: (id1, id2) => dispatch(removeInterestFromDB(id1, id2))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InterestCard);