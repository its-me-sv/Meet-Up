import { combineReducers } from "redux";

import UserReducer from "./user/user.reducer";
import ExploreReducer from "./explore/explore.reducer";

const rootReducer = combineReducers({
    user: UserReducer,
    explore: ExploreReducer
});

export default rootReducer;