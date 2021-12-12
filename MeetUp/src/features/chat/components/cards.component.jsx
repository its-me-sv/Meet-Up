import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { Avatar, Divider } from "react-native-paper";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import Loader from "../../../components/loader/loader.component";
import Spacer from "../../../components/spacer/spacer.component";
import { TextVariant2 } from "../../../features/settings/screens/view-account.styles";

const defaultUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
const baseUrl = "http://192.168.29.97:5001";

const RowView = styled.View`
    flex-direction: row;
`;

const TextContainer = styled.View`
    margin-left: 7px;
`;

const ConvoCard = ({ convoId, members, userId }) => {
    const navigation = useNavigation();
    const [person, setPerson] = useState(null);
    useEffect(() => {
        const personId = members.filter(val => val !== userId)[0];
        axios.get(`http://192.168.29.97:5000/user/?userId=${personId}`)
        .then(({data}) => setPerson(data))
        .catch(console.log);
    }, []);
    if (!person) return <Loader />;
    const { profilePicture, username, email } = person;
    const imageUrl = profilePicture.length ? baseUrl + profilePicture : defaultUrl;
    return (
        <TouchableOpacity onPress={() => navigation.navigate("Chat Screen", {
            convoId,
            person,
            userId
        })}>
            <Spacer size="medium"/>
            <RowView>
                <Avatar.Image
                    size={60}
                    source={{ uri: imageUrl + `?${new Date()}` }}
                />
                <TextContainer>
                    <TextVariant2>{username}</TextVariant2>
                    <TextVariant2>{email}</TextVariant2>
                </TextContainer>
            </RowView>
            <Spacer/>
            <Divider />
        </TouchableOpacity>
    );
};

const mapStateToProps = ({ user }) => ({
    userId: user.user._id
});

export default connect(
    mapStateToProps
)(ConvoCard);