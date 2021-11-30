import React, { useEffect, useState } from "react";
import { ScrollView, View, Dimensions } from "react-native";
import { Divider } from "react-native-paper";
import { connect } from "react-redux";

import SearchBar from "../components/search.component";
import Spacer from "../../../components/spacer/spacer.component";
import { 
    TextVariant2,
 } from "../../settings/screens/view-account.styles";
import InterestCard from "../../settings/components/interest-card.component";
import PersonCard from "../../settings/components/person-card.component";

const windowHeight = Dimensions.get("window").height;

const ExploreScreen = ({ userInterests, userFriends }) => {
    const [people, setPeople] = useState([]);
    const [interest, setInterest] = useState([]);
    useEffect(() => {
        setPeople(userFriends);
        setInterest(userInterests);
    }, []);
    return (
        <ScrollView>
            <SearchBar />
            <View style={{
                flex: 1,
                flexDirection: "column",
                padding: 12,
                paddingTop: 0,
                justifyContent: "space-evenly"
            }}>
                <View>
                    <Spacer size="medium" />
                    <Divider />
                    <Spacer size="medium" />
                    <TextVariant2>Interests</TextVariant2>
                    <Spacer size="medium" />
                    <ScrollView style={{
                        height: (windowHeight * 28) / 100,
                    }}>
                        {interest.map(
                            value => (
                                <InterestCard
                                    key={value._id}
                                    {...value}
                                    fromExplore={true}
                                />
                            )
                        )}
                    </ScrollView>
                    <Spacer size="large" />
                </View>
                <View>
                    <Divider />
                    <Spacer size="medium" />
                    <TextVariant2>People</TextVariant2>
                    <Spacer size="medium" />
                    <ScrollView style={{
                        height: (windowHeight * 31) / 100
                    }}>
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
                    </ScrollView>
                </View>
            </View>
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