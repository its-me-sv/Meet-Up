import exploreTypes from "./explore.types";
import axios from "axios";

export const fetchSuccess = data => ({
    type: exploreTypes.FETCH_EXPLORE_SUCCESS,
    payload: {...data}
});

export const fetchFailure = err => ({
    type: exploreTypes.FETCH_EXPLORE_FAILURE,
    payload: err
});

export const fetchStart = () => ({
    type: exploreTypes.FETCH_EXPLORE_START
});

export const fetchExplore = keyword => async dispatch => {
    try {
        dispatch(fetchStart());
        const {data: people} = await axios.get(`http://192.168.29.97:5000/user/find/${keyword}`)
        const {data: interests} = await axios.get(`http://192.168.29.97:5000/interest/find/${keyword}`)
        dispatch(fetchSuccess({people, interests}));
    } catch (err) {
        dispatch(fetchFailure(err));
        console.log(err);
    }
};