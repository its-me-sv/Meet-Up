import conversationTypes from "./conversation.types";
import axios from "axios";

export const convoFetchStart = () => ({
    type: conversationTypes.SET_START
});

export const convoFetchSuccess = convos => ({
    type: conversationTypes.SET_SUCCESS,
    payload: convos
});

export const convoFetchFailure = err => ({
    type: conversationTypes.SET_FAILURE,
    payload: err
});

export const fetchConversations = userId => async dispatch => {
    try {
        dispatch(convoFetchStart());
        const { data } = await axios.get(`http://192.168.29.97:5000/conversation/${userId}`);
        dispatch(convoFetchSuccess(data));
    } catch (err) {
        console.log(err);
        dispatch(convoFetchFailure(err));
    }
};