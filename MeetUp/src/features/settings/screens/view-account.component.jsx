import React, { useEffect, useState } from "react";
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
    InterestHolder,
    FriendContainer
} from "./view-account.styles";

const defaultUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
const baseUrl = "http://192.168.29.97:5001";

const colors = [
    '#16a085',
    '#27ae60',
    '#f39c12',
    '#e74c3c',
    '#FB6964',
    '#BDBB99',
    '#77B1A9',
    '#73A857',
    '#ff3333'
];

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

const ViewAccount = ({ user }) => {
    const { profilePicture, _id } = user;
    const [friends, setFriends] = useState([]);
    const imageUrl = profilePicture.length ? baseUrl + profilePicture : defaultUrl;
    useEffect(() => {
        axios.get(`http://192.168.29.97:5000/user/friends/${_id}`)
        .then(({data}) => setFriends(data))
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
                                // color={colors[idx%colors.length]}
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
                        [...friends].map(({_id, username, profilePicture: pp}) => {
                            const friendPp = pp.length ? baseUrl + pp : defaultUrl;
                            return (
                                <FriendContainer key={_id}>
                                    <Spacer size="medium" position="left"/>
                                    <Avatar.Image
                                        size={49}
                                        source={{uri: friendPp + `?${new Date()}`}}
                                    />
                                    <Spacer size="small" position="left" />
                                    <Spacer size="small" position="left" />
                                    <TextVariant2>{username}</TextVariant2>
                                </FriendContainer>
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

export default connect(
    mapStateToProps
)(ViewAccount);