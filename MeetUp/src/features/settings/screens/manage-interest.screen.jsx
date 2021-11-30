import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";

import InterestCard from "../components/interest-card.component";
import Spacer from "../../../components/spacer/spacer.component";
import {
    removeInterestFromDB
} from "../../../redux/user/user.actions";

const ManageInterest = ({ userId, userInterests, removeInterest }) => {
    return (
        <ScrollView>
            {userInterests.map(
                value => (
                    <InterestCard 
                    key={value._id}
                    remove={() => removeInterest(userId, value._id)}
                    {...value} 
                    />
                )
            )}
            <Spacer size="large" />
        </ScrollView>
    );
};

const mapStateToProps = ({user}) => ({
    userInterests: user.user.interests,
    userId: user.user._id
});

const mapDispatchToProps = dispatch => ({
    removeInterest: (id1, id2) => dispatch(removeInterestFromDB(id1, id2))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ManageInterest);