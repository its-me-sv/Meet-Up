import React from "react";
import { connect } from "react-redux";
import { Avatar, Button } from "react-native-paper";

import Spacer from "../../../components/spacer/spacer.component";

const defaultUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
const baseUrl = "http://192.168.29.97:5001";

const EditProfileScreen = ({ profileUrl, navigation, userId }) => {
    const imageUrl = profileUrl.length ? baseUrl+profileUrl : defaultUrl;
    return (
        <>
            <Spacer size="large" />
            <Avatar.Image size={120} source={{ uri: imageUrl + `?${new Date()}`}} />
            <Button
                icon="camera"
                mode="contained"
                onPress={() => navigation.navigate("Camera", {userId})}
            >Take Photo</Button>
        </>
    );
};

const mapStateToProps = ({user}) => ({
    profileUrl: user.user.profilePicture,
    userId: user.user._id
});

export default connect(
    mapStateToProps
)(EditProfileScreen);