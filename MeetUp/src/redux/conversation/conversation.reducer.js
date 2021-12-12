import conversationTypes from "./conversation.types";

const initialState = {
    isPending: false,
    error: null,
    conversations: []
};

const ConversationReducer = (state = initialState, action) => {
    switch(action.type) {
        case conversationTypes.SET_START:
            return {...state, isPending: true};
        case conversationTypes.SET_FAILURE:
            return {...state, isPending: false, error: action.payload};
        case conversationTypes.SET_SUCCESS:
            return {...state, isPending: false, error: null, conversations: action.payload};
        default:
            return state;
    }
};

export default ConversationReducer;