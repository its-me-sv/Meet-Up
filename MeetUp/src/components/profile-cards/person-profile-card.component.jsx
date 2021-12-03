import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Divider } from "react-native-paper";
import { format } from "timeago.js";
import { connect } from "react-redux";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

import Spacer from "../spacer/spacer.component";
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
} from "../../features/settings/screens/view-account.styles";
import PersonCard from "../../features/settings/components/person-card.component";
import Loader from "../loader/loader.component";
import {
    addFriendToDB,
    removeFriendFromDB
} from "../../redux/user/user.actions";
import {
    AddButton,
    MessageButton,
    RemoveText
} from "../../features/settings/components/interest-card.styles";

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

const PersonProfileCard = ({ 
    route, userFriends, 
    addFriend, removeFriend,
    userId
}) => {
    const { id } = route.params;
    const [person, setPerson] = useState(null);
    const [friends, setFriends] = useState([]);
    const [interests, setInterests] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        axios.get(`http://192.168.29.97:5000/user?userId=${id}`)
        .then(({ data }) => setPerson(data))
        .catch(console.log);
        axios.get(`http://192.168.29.97:5000/user/friends/${id}`)
        .then(({ data }) => setFriends(data))
        .catch(console.log);
        axios.get(`http://192.168.29.97:5000/interest/${id}`)
        .then(({ data }) => setInterests(data))
        .catch(console.log);
    }, [isFocused, id]);
    if (!person) return <Loader />;
    const { profilePicture, _id: id1, username, email } = person;
    const imageUrl = profilePicture.length ? baseUrl + profilePicture : defaultUrl;
    const isFriend = userFriends.filter(f => f._id === id).length === 1;
    const personReduced = {};
    personReduced["_id"] = id1;
    personReduced["username"] = username;
    personReduced["email"] = email;
    personReduced["profilePicture"] = profilePicture;
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
                        <TextVariant1>{person.username}</TextVariant1>
                        <TextVariant2>{person.email}</TextVariant2>
                    </ProfileTopRight>
                    {(userId !== id) && (
                        <View style={{
                            marginLeft: "auto",
                            marginTop: "auto",
                            flexDirection: "row"
                        }}>
                            <MessageButton>Message</MessageButton>
                            <Spacer position="left" size="medium" />
                            {
                                isFriend
                                ? <RemoveText onPress={() => removeFriend(userId, id)}>Remove</RemoveText>
                                : <AddButton onPress={() => addFriend(userId, personReduced)}>Add</AddButton>
                            }
                        </View>
                    )}
                </ProfileTop>
                <Divider />
                <Spacer size="medium" />
                <JoinedContainer>
                    <View>
                        <TextVariant2>Joined</TextVariant2>
                        <TextVariant3>{formatTime(person.createdAt)}</TextVariant3>
                    </View>
                    <RightEndText>{format(person.createdAt)}</RightEndText>
                </JoinedContainer>
                <Spacer size="medium" />
                <Divider />
                <Spacer size="medium" />
                <View>
                    <TextVariant2>Interests</TextVariant2>
                    <Spacer />
                    {!interests.length && <TextVariant3 opaque={true}>Developing interests</TextVariant3>}
                    <InteresetWrapper>
                        {[...interests].map(({ _id, name }, idx) => (
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
                    {!friends.length && <TextVariant3 opaque={true}>Looking for friends</TextVariant3>}
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
    userFriends: user.user.friends,
    userId: user.user._id
});

const mapDispatchToProps = dispatch => ({
    addFriend: (userId, friendId) => dispatch(addFriendToDB(userId, friendId)),
    removeFriend: (userId, friendId) => dispatch(removeFriendFromDB(userId, friendId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonProfileCard);