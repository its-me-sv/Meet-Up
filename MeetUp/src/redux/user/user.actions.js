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

export const fetchUserStart = body => dispatch => {
    dispatch(fetchUserPending());
    axios.post("http://192.168.29.97:5000/auth/login", body)
    .then(({data}) => dispatch(fetchUserSuccess(data)))
    .catch(() => dispatch(fetchUserFailure("Invalid login credentials")));
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