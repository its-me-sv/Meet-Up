import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { Avatar, Divider } from "react-native-paper";
import { format } from "timeago.js";
import axios from "axios";

import Spacer from "../../../components/spacer/spacer.component";
import {
    AccountContainer,
    ProfileTop,
    ProfileTopRight,
    TextVariant1,
    TextVariant2,
    JoinedContainer,
    TextVariant3,
    RightEndText,
    InteresetWrapper,
    InterestHolder
} from "./view-account.styles";
import PersonCard from "../components/person-card.component";
import { setFriends } from "../../../redux/user/user.actions";

const defaultUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
const baseUrl = "http://192.168.29.97:5001";

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
];

const formatTime = date => {
    let newDate = new Date(date);
    let day = newDate.getDate();
    let month = months[newDate.getMonth()];
    let year = newDate.getFullYear();
    return `${month} ${day}, ${year}`;
};

const ViewAccount = ({ user, setPeople }) => {
    const { profilePicture, friends } = user;
    const imageUrl = profilePicture.length ? baseUrl + profilePicture : defaultUrl;
    useEffect(() => {
        axios.get(`http://192.168.29.97:5000/user/friends/${user._id}`)
        .then(({data}) => setPeople(data))
        .catch(console.log);
    }, []);
    return (
        <ScrollView>
            <AccountContainer>
                <ProfileTop>
                    <Spacer size="large" />
                    <Spacer size="small" />
                    <Avatar.Image
                        size={120}
                        source={{ uri: imageUrl + `?${new Date()}` }}
                    />
                    <ProfileTopRight>
                        <TextVariant1>{user.username}</TextVariant1>
                        <TextVariant2>{user.email}</TextVariant2>
                    </ProfileTopRight>
                </ProfileTop>
                <Divider />
                <Spacer size="medium" />
                <JoinedContainer>
                    <View>
                        <TextVariant2>Joined</TextVariant2>
                        <TextVariant3>{formatTime(user.createdAt)}</TextVariant3>
                    </View>
                    <RightEndText>{format(user.createdAt)}</RightEndText>
                </JoinedContainer>
                <Spacer size="medium" />
                <Divider />
                <Spacer size="medium" />
                <View>
                    <TextVariant2>Interests</TextVariant2>
                    <Spacer />
                    <InteresetWrapper>
                        {[...user.interests].map(({_id, name}, idx) => (
                            <InterestHolder
                                key={_id}
                            >{name}</InterestHolder>
                        ))}
                    </InteresetWrapper>
                </View>
                <Spacer size="medium" />
                <Divider />
                <Spacer size="medium" />
                <View>
                    <TextVariant2>Friends</TextVariant2>
                    <Spacer size="medium" />
                    <ScrollView>
                    {
                        friends.map(({_id, username, profilePicture: pp, email: friendEmail}) => {
                            return (
                                <PersonCard 
                                    key={_id}
                                    id={_id}
                                    picture={pp}
                                    username={username}
                                    email={friendEmail}
                                    fromProfile={true}
                                />
                            );
                        })
                    }
                    </ScrollView>
                </View>
            </AccountContainer>
        </ScrollView>
    );
};

const mapStateToProps = ({user}) => ({
    user: user.user
});

const mapDispatchToProps = dispatch => ({
    setPeople: friends => dispatch(setFriends(friends))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewAccount);