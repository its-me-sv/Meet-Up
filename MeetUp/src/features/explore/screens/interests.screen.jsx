import React from "react";
import { connect } from "react-redux";

import InterestCard from "../../settings/components/interest-card.component";
import { ExploreScroller } from "./explore.styles";

const InterestsTab = ({ interests }) => {
    console.log(interests.length, "interests");
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
    interests: explore.interests
});

export default connect(mapStateToProps)(InterestsTab);