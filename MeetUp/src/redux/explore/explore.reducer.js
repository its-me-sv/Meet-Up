import exploreTypes from "./explore.types";

const INITIAL_STATE = {
    isPending: false,
    error: null,
    people: [], 
    interests: []
};

const ExploreReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case exploreTypes.FETCH_EXPLORE_START:
            return {...state, isPending: true, error: null};
        case exploreTypes.FETCH_EXPLORE_FAILURE:
            return {...state, isPending: false, error: action.payload};
        case exploreTypes.FETCH_EXPLORE_SUCCESS:
            return {...state, isPending: false, error: null, ...action.payload};
        default:
            return state;
    }
};

export default ExploreReducer;