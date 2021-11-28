import userTypes from "./user.types";

const INITIAL_STATE = {
    isPending: false,
    error: null,
    user: null
};

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userTypes.USER_FETCH_PENDING:
            return {...state, isPending: true};
        case userTypes.USER_FETCH_FAILURE:
            return {...state, isPending: false, error: action.payload};
        case userTypes.USER_FETCH_SUCCESS:
            return {...state, isPending: false, user: action.payload, error: null };
        case userTypes.USER_RESET:
            return {isPending: false, error: null, user: null};
        case userTypes.CHANGE_SUCCESS:
            return {isPending: false, error: null, user: {...state.user, ...action.payload}};
        case userTypes.REMOVE_INTEREST:
            return {
                ...state, 
                user: {
                    ...state.user,
                    interests: state.user.interests.filter(({_id}) => _id !== action.payload)
                }
            };
        case userTypes.SET_INTEREST:
            return {
                ...state,
                user: {
                    ...state.user,
                    interests: action.payload
                }
            };
        default:
            return state;
    }
};

export default UserReducer;