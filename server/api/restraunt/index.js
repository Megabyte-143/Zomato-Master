import express from "express";

// Restraunt Model Import
import { RestaurantModel } from "../../schema/db_all_models";

//Validation
import { ValidateRestaurantCity, ValidateRestaurantSearchString } from "../../validation/restaurant";
import { ValidateRestaurantId } from "../../validation/food";

const Router = express.Router();

//============================== Getting all the Restraunts ================================

/*
    Route           /
    Description     get all restraunt details 
    Parameters      None
    Access          PUBLIC
    Method          GET
*/

Router.get("/", async (req, res) => {
    try {
        await ValidateRestaurantCity(req.query);
        const { city } = req.query;
        const restraunts = await RestaurantModel.find({ city });
        return res.json({ restraunts });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//============================================================================================


//============================== Getting the Particular Restraunts ===========================

/*
    Route           /
    Description     get particular restraunt details 
    Parameters      _id
    Access          PUBLIC
    Method          GET
*/

Router.get("/:_id", async (req, res) => {
    try {
        await ValidateRestaurantId(req.params);
        const { _id } = req.params;
        const restraunt = await RestaurantModel.findOne(_id);

        if (!restraunt)
            return res.status(404).json({ error: "Restraunt Not Found" });
        return res.json({ restraunt });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//============================================================================================


//============================ Getting the Restraunt Detail Screen ===========================

/*
    Route           /search
    Description     Get Restraunt Details Screen 
    Parameters      None
    Body            searchString
    Access          PUBLIC
    Method          GET
*/

Router.get("/search", async (req, res) => {
    try {
        await ValidateRestaurantSearchString(req.body);
        const { searchString } = req.body;
        const restraunts = await RestaurantModel.find({
            name: { $regex: searchString, $options: "i" },
        });
        res.json({ restraunts });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//============================================================================================

export default Router;