import React from "react";
import { connect } from "react-redux";

import PersonCard from "../../settings/components/person-card.component";
import { ExploreScroller } from "./explore.styles";

const PeopleTab = ({ people }) => {
    console.log(people.length, "people");
    return (
        <ExploreScroller>
            {people.map(({ _id, username, profilePicture: pp, email: friendEmail }) => {
                return (
                    <PersonCard
                        key={_id}
                        id={_id}
                        picture={pp}
                        username={username}
                        email={friendEmail}
                    />
                );
            })}
        </ExploreScroller>
    );
};

const mapStateToProps = ({ explore }) => ({
    people: explore.people
});

export default connect(mapStateToProps)(PeopleTab);