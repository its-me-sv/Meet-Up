import React, { useRef, useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { View, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { connect } from "react-redux";

import { ProfileCamera, InnerSnap } from "./camera.styles";
import Text from "../../../components/typography/text.component";
import { setProfilePicture } from "../../../redux/user/user.actions";

const CameraScreen = ({ route, navigation, setPP }) => {
    const { userId } = route.params;
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef();
    const snap = async () => {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync();
            const image = {
                uri: photo.uri,
                type: "image/jpeg",
                name: `${userId}.jpg`
            };
            const data = new FormData();
            data.append("userId", userId);
            data.append("file", image);
            axios.post("http://192.168.29.97:5001/upload", data)
            .then(({data}) => {
                setPP(userId, data.fileDest);
                navigation.goBack();
            })
            .catch(console.log);
        }
    };
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        Alert.alert("Taking photo", "Tap the screen to take photo\nLong press the screen to flip camera");
    }, []);
    if (hasPermission === null) return <View />;
    if (hasPermission === false) return <Text variant="error">No access to camera</Text>;
    return (
        <ProfileCamera
            ref={camera => (cameraRef.current = camera)}
            type={type}
        >
            <TouchableOpacity 
                onPress={snap} 
                onLongPress={() => setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )}
            >
                <InnerSnap />
            </TouchableOpacity>
        </ProfileCamera>
    );
};

const mapDispatchToProps = dispatch => ({
    setPP: (userId, url) => dispatch(setProfilePicture(userId, url))
});

export default connect(
    null,
    mapDispatchToProps
)(CameraScreen);