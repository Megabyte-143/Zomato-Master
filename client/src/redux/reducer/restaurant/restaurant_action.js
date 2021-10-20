import axios from "axios";

import { GET_RESTAURANT } from "./restaurant_type";

export const getRestaurant = () => async (dispatch) => {
    try {
        const restaurantList = await axios({
            method: "GET",
            url: "http://localhost:4000/restaurant"
        });

        return dispatch({
            type: GET_RESTAURANT,
            payload: restaurantList.data,
        });
    } catch (e) {
        return dispatch({type: "ERROR",payload:e});
    }
};