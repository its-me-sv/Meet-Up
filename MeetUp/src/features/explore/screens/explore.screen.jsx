import React, { useEffect } from "react";
import { connect } from "react-redux";

import SearchBar from "../components/search.component";
import ExploreTabs from "./explore-tabs.screen";
import { 
    fetchSuccess,
    fetchExplore
} from "../../../redux/explore/explore.actions";

const ExploreScreen = ({ userInterests, userFriends, setInitial, search }) => {
    useEffect(() => {
        setInitial({
            people: userFriends,
            interests: userInterests
        });
    }, []);
    const fetchByKeyword = keyword => {
        if (keyword.trim().length === 0) return;
        search(keyword);
    };
    return (
        <>
            <SearchBar cb={fetchByKeyword} />
            <ExploreTabs />
        </>
    );
};

const mapStateToProps = ({ user }) => ({
    userInterests: user.user.interests,
    userFriends: user.user.friends
});

const mapDispatchToProps = dispatch => ({
    setInitial: data => dispatch(fetchSuccess(data)),
    search: keyword => dispatch(fetchExplore(keyword))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExploreScreen);