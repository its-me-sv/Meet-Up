import React from "react";
import { connect } from "react-redux";

import InterestCard from "../../settings/components/interest-card.component";
import { ExploreScroller } from "./explore.styles";
import Loader from "../../../components/loader/loader.component";
import NoResultScreen from "../../../components/no-result-screen/no-result-screen.component";

const InterestsTab = ({ interests, pending }) => {
    if (pending) return <Loader />;
    if (!interests.length) return <NoResultScreen />;
    return (
        <ExploreScroller>
            {interests.map(
                value => (
                    <InterestCard
                        key={value._id}
                        {...value}
                        fromExplore={true}
                    />
                )
            )}
        </ExploreScroller>
    );
};

const mapStateToProps = ({explore}) => ({
    interests: explore.interests,
    pending: explore.isPending
});

export default connect(mapStateToProps)(InterestsTab);