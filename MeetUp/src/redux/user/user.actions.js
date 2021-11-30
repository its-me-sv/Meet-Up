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

export const setFriends = data => ({
    type: userTypes.SET_FRIENDS,
    payload: data
});

export const fetchUserStart = body => async dispatch => {
    dispatch(fetchUserPending()); 
    try {
        const { data } = await axios.post("http://192.168.29.97:5000/auth/login", body);
        dispatch(fetchUserSuccess(data));
        const response = await axios.get(`http://192.168.29.97:5000/interest/${data._id}`);
        dispatch(setInterest(response.data));
        const response1 = await axios.get(`http://192.168.29.97:5000/user/friends/${data._id}`);
        dispatch(setFriends(response1.data));
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

export const addInterest = (interestId, name) => ({
    type: userTypes.ADD_INTEREST,
    payload: {_id: interestId, name}
});

export const addInterestToDB = (userId, interestId, name) => dispatch => {
    axios.put(
        `http://192.168.29.97:5000/interest/${interestId}/add`,
        {userId}
    ).then(() => dispatch(addInterest(interestId, name)))
    .catch(console.log);
};

export const removeFriend = friendId => ({
    type: userTypes.REMOVE_FRIEND,
    payload: friendId
});

export const addFriend = friend => ({
    type: userTypes.ADD_FRIEND,
    payload: friend
});

export const removeFriendFromDB = (userId, FriendId) => dispatch => {
    axios.put(
        `http://192.168.29.97:5000/user/${FriendId}/remove-friend`,
        { userId }
    ).then(() => dispatch(removeFriend(FriendId)))
    .catch(console.log);
};

export const addFriendToDB = (userId, friend) => dispatch => {
    axios.put(
        `http://192.168.29.97:5000/user/${friend._id}/add-friend`,
        { userId }
    ).then(() => dispatch(addFriend(friend)))
    .catch(console.log);
};