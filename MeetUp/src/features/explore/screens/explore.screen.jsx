import React, { useEffect, useState } from "react";
import { ScrollView, View, Dimensions } from "react-native";
import { Divider, Avatar } from "react-native-paper";
import { connect } from "react-redux";
import axios from "axios";

import SearchBar from "../components/search.component";
import Spacer from "../../../components/spacer/spacer.component";
import { 
    TextVariant2,
    FriendContainer
 } from "../../settings/screens/view-account.styles";
import InterestCard from "../../settings/components/interest-card.component";
import { 
    removeInterestFromDB 
} from "../../../redux/user/user.actions";

const windowHeight = Dimensions.get("window").height;
const defaultUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
const baseUrl = "http://192.168.29.97:5001";

const ExploreScreen = ({ userInterests, userId, removeInterest }) => {
    const [people, setPeople] = useState([]);
    useEffect(() => {
        axios.get(`http://192.168.29.97:5000/user/friends/${userId}`)
        .then(({ data }) => setPeople(data))
        .catch(console.log);
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
                        {userInterests.map(
                            value => (
                                <InterestCard
                                    key={value._id}
                                    cb={() => removeInterest(userId, value._id)}
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
                        {[...people].map(({ _id, username, profilePicture: pp }) => {
                            const friendPp = pp.length ? baseUrl + pp : defaultUrl;
                            return (
                                <FriendContainer key={_id}>
                                    <Spacer size="medium" position="left" />
                                    <Avatar.Image
                                        size={49}
                                        source={{ uri: friendPp + `?${new Date()}` }}
                                    />
                                    <Spacer size="small" position="left" />
                                    <Spacer size="small" position="left" />
                                    <TextVariant2>{username}</TextVariant2>
                                </FriendContainer>
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
    userId: user.user._id
});

const mapDispatchToProps = dispatch => ({
    removeInterest: (id1, id2) => dispatch(removeInterestFromDB(id1, id2))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExploreScreen);