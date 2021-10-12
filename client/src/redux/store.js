import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "./reducer/root_reducer";

const middleWares = [thunk];

if (process.env.NODE_ENV === "development") {
    const { logger } = require("redux-logger");
    middleWares.push(logger);
}

const store = createStore(rootReducer, {}, applyMiddleware(...middleWares));

export default store;