import userTypes from "./user.types";
import axios from "axios";

export const fetchUserPending = () => ({
    type: userTypes.USER_FETCH_PENDING
});

export const userReset = () => ({
    type: userTypes.USER_RESET
});

export const fetchUserSuccess = data => ({
    type: userTypes.USER_FETCH_SUCCESS,
    payload: {...data}
});

export const fetchUserFailure = err => ({
    type: userTypes.USER_FETCH_FAILURE,
    payload: err
});

export const setInterest = data => ({
    type: userTypes.SET_INTEREST,
    payload: data
});

export const fetchUserStart = body => async dispatch => {
    dispatch(fetchUserPending()); 
    try {
        const { data } = await axios.post("http://192.168.29.97:5000/auth/login", body);
        dispatch(fetchUserSuccess(data));
        const response = await axios.get(`http://192.168.29.97:5000/interest/${data._id}`);
        dispatch(setInterest(response.data));
    } catch (err) {
        dispatch(fetchUserFailure("Invalid login credentials"));
    }
};

export const changeSuccess = obj => ({
    type: userTypes.CHANGE_SUCCESS,
    payload: {...obj}
});

export const changeCredentials = body => async dispatch => {
    dispatch(fetchUserPending());
    const {password, ...rest} = body;
    try {
        await axios.put(`http://192.168.29.97:5000/user/${body.userId}`, body);
        dispatch(changeSuccess(rest));
        return true;
    } catch (err) {
        dispatch(fetchUserFailure("Credentials already in use"));
        return false;
    }
};

export const removeInterest = interestId => ({
    type: userTypes.REMOVE_INTEREST,
    payload: interestId
});

export const removeInterestFromDB = (userId, interestId) => dispatch => {
    axios.put(
        `http://192.168.29.97:5000/interest/${interestId}/remove`, 
        {userId}
    ).then(() => dispatch(removeInterest(interestId)))
    .catch(console.log);
};

export const setProfilePictureUrl = data => ({
    type: userTypes.SET_PROFILE_PICTURE,
    payload: data
});

export const setProfilePicture = (userId, profileUrl) => dispatch => {
    axios.put(`http://192.168.29.97:5000/user/${userId}`, {
        userId,
        profilePicture: profileUrl
    }).then(() => dispatch(setProfilePictureUrl(profileUrl)))
    .catch(() => dispatch(setProfilePictureUrl("")));
};