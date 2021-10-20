import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
//Components
import Navbar from "../component/navbar/navbar";
import FoodTab from "../component/FoodTab";

//redux actions
import { getRestaurant } from "../redux/reducer/restaurant/restaurant_action";

const HomeLayout = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRestaurant());
    }, []);

    return <>
        <div className="container mx-auto lg:px-20">
            <Navbar />

            {props.children}
        </div>
        <FoodTab />
    </>
};

export default HomeLayout;
