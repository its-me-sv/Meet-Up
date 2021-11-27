import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

const middlewares = [thunk];

// __DEV__ && middlewares.push(logger);

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;