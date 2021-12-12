import { combineReducers } from "redux";

import UserReducer from "./user/user.reducer";
import ExploreReducer from "./explore/explore.reducer";
import ConversationReducer from "./conversation/conversation.reducer";

const rootReducer = combineReducers({
    user: UserReducer,
    explore: ExploreReducer,
    convo: ConversationReducer
});

export default rootReducer;