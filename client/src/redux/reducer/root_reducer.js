import {combineReducer} from "redux";

import restaurant from "./restaurant/restaurant_reducer";

const rootReducer = combineReducer({restaurant});

export default rootReducer;

