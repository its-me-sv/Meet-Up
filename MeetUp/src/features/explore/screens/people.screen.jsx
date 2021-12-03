import React from "react";
import { connect } from "react-redux";

import PersonCard from "../../settings/components/person-card.component";
import { ExploreScroller } from "./explore.styles";
import Loader from "../../../components/loader/loader.component";
import NoResultScreen from "../../../components/no-result-screen/no-result-screen.component";

const PeopleTab = ({ people, pending }) => {
    if (pending) return <Loader />;
    if (!people.length) return <NoResultScreen />;
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
    people: explore.people,
    pending: explore.isPending
});

export default connect(mapStateToProps)(PeopleTab);