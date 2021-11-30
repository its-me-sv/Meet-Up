import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Divider } from "react-native-paper";
import { connect } from "react-redux";
import axios from "axios";

import SearchBar from "../components/search.component";
import Spacer from "../../../components/spacer/spacer.component";
import { 
    TextVariant2,
 } from "../../settings/screens/view-account.styles";
import InterestCard from "../../settings/components/interest-card.component";
import PersonCard from "../../settings/components/person-card.component";
import {
    ExploreContainer,
    InterestScroller,
    PeopleScroller
} from "./explore.styles";

const ExploreScreen = ({ userInterests, userFriends }) => {
    const [people, setPeople] = useState([]);
    const [interest, setInterest] = useState([]);
    useEffect(() => {
        setPeople(userFriends);
        setInterest(userInterests);
    }, []);
    const fetchByKeyword = keyword => {
        if (keyword.trim().length === 0) return;
        axios.get(`http://192.168.29.97:5000/user/find/${keyword}`)
        .then(({data}) => setPeople(data))
        .then(console.log);
        axios.get(`http://192.168.29.97:5000/interest/find/${keyword}`)
        .then(({data}) => setInterest(data))
        .then(console.log);
    };
    return (
        <ScrollView>
            <SearchBar cb={fetchByKeyword} />
            <ExploreContainer>
                <View>
                    <Spacer size="medium" />
                    <Divider />
                    <Spacer size="medium" />
                    <TextVariant2>Interests</TextVariant2>
                    <Spacer size="medium" />
                    <InterestScroller>
                        {interest.map(
                            value => (
                                <InterestCard
                                    key={value._id}
                                    {...value}
                                    fromExplore={true}
                                />
                            )
                        )}
                    </InterestScroller>
                    <Spacer size="large" />
                </View>
                <View>
                    <Divider />
                    <Spacer size="medium" />
                    <TextVariant2>People</TextVariant2>
                    <Spacer size="medium" />
                    <PeopleScroller>
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
                    </PeopleScroller>
                </View>
            </ExploreContainer>
        </ScrollView>
    );
};

const mapStateToProps = ({ user }) => ({
    userInterests: user.user.interests,
    userFriends: user.user.friends
});

export default connect(
    mapStateToProps
)(ExploreScreen);