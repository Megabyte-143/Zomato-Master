import express from "express";

import { OrderModel } from "../../schema/db_all_models";

const Router = express.Router();

//================================= Getting all Orders ===================================

/*
    Route            /
    Des              Get all orders based on Id
    Params           _id
    BODY             none
    Access           Public
    Method           GET
*/

Router.get("/:_id", async (req, res) => {

    try {
        const { _id } = req.params;
        const getOrders = OrderModel.findOne({ user: _id });
        if (!getOrders) {
            return res.status(400).json({ error: "User not Found" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

//============================================================================================


//================================= Add new Order ===================================

/*
    Route            /new
    Des              Add new order
    Params           _id
    BODY             orderDetails
    Access           Public
    Method           POST
*/

Router.post("/new", async (req, res) => {

    try {
        const { _id } = req.params;
        const { orderDetails } = req.body;
        const addNewOrder = await OrderModel.findOneAndUpdate(
            {
                user: _id,
            },
            {
                $push: { orderDetails: orderDetails }
            },
            {
                new: true
            }
        );

        return res.json({ order: addNewOrder });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

//============================================================================================

export default Router;