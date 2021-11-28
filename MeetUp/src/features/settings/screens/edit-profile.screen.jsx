import React from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import { Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

import Spacer from "../../../components/spacer/spacer.component";
import { setProfilePicture } from "../../../redux/user/user.actions";
import { 
    EditProfileContainer,
    ImageButton
} from "./edit-profile.styles";

const defaultUrl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
const baseUrl = "http://192.168.29.97:5001";

const EditProfileScreen = ({ profileUrl, navigation, userId, setPP }) => {
    const imageUrl = profileUrl.length ? baseUrl+profileUrl : defaultUrl;
    const uploadPhoto = (uri) => {
        const image = {
            uri,
            type: "image/jpeg",
            name: `${userId}.jpg`
        };
        const data = new FormData();
        data.append("userId", userId);
        data.append("file", image);
        axios.post("http://192.168.29.97:5001/upload", data)
        .then(({ data }) => setPP(userId, data.fileDest))
        .catch(console.log);
    };
    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert("Permission is required to access photos");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!pickerResult.cancelled)
            uploadPhoto(pickerResult.uri);
    };
    return (
        <ScrollView>
            <EditProfileContainer>
                <Spacer size="large" />
                <Avatar.Image size={120} source={{ uri: imageUrl + `?${new Date()}`}} />
                <ImageButton
                    icon="camera"
                    onPress={() => navigation.navigate("Camera", {userId})}
                >Take photo</ImageButton>
                <ImageButton
                    icon="image"
                    onPress={openImagePickerAsync}
                >Choose Photo</ImageButton>
            </EditProfileContainer>
        </ScrollView>
    );
};

const mapStateToProps = ({user}) => ({
    profileUrl: user.user.profilePicture,
    userId: user.user._id
});

const mapDispatchToProps = dispatch => ({
    setPP: (userId, url) => dispatch(setProfilePicture(userId, url))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditProfileScreen);