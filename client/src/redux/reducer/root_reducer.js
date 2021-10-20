import {combineReducers} from "redux";

import restaurant from "./restaurant/restaurant_reducer";

const rootReducer = combineReducers({restaurant});

export default rootReducer;

