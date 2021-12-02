import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-paper";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Spacer from "../../../components/spacer/spacer.component";
import {
    FriendContainer,
    TextVariant2,
    TextVariant3
} from "../screens/view-account.styles";
import {
    AddButton,
    RemoveButton
} from "../components/interest-card.styles";
import {
    addFriendToDB,
    removeFriendFromDB
} from "../../../redux/user/user.actions";

const defaultUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
const baseUrl = "http://192.168.29.97:5001";

const PersonCard = ({
    id, picture, username, 
    email, friends, userId,
    addFriend, removeFriend,
    fromProfile
}) => {
    const friendPp = picture.length ? baseUrl + picture : defaultUrl;
    const navigation = useNavigation();
    const friend = {};
    friend["_id"] = id;
    friend["username"] = username;
    friend["email"] = email;
    friend["profilePicture"] = picture;
    const isFriend = friends.filter(f => f._id === id).length === 1;
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Person Profile", {id})}>
            <FriendContainer>
                <Spacer size="medium" position="left" />
                <Avatar.Image
                    size={49}
                    source={{ uri: friendPp + `?${new Date()}` }}
                />
                <Spacer size="small" position="left" />
                <View>
                    <TextVariant2>{username}</TextVariant2>
                    <TextVariant3>{email}</TextVariant3>
                </View>
                {
                    (!fromProfile && userId !== id)&& (
                        <>{
                            isFriend
                            ? <RemoveButton onPress={() => removeFriend(userId, id)}>Remove</RemoveButton>
                            : <AddButton onPress={() => addFriend(userId, friend)}>Add</AddButton>
                        }</>
                    )
                }
                <Spacer size="medium" position="right" />
            </FriendContainer>
        </TouchableOpacity>
    );
};

const mapStateToProps = ({ user }) => ({
    friends: user.user.friends,
    userId: user.user._id
});

const mapDispatchToProps = dispatch => ({
    addFriend: (userId, friendId) => dispatch(addFriendToDB(userId, friendId)),
    removeFriend: (userId, friendId) => dispatch(removeFriendFromDB(userId, friendId))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PersonCard);