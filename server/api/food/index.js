import express from "express";

// Food Model Import
import { FoodModel } from "../../schema/db_all_models";

const Router = express.Router();

//============================== Getting all the Food ================================

/*
    Route           /
    Description     Get all food based on particular Restraunt 
    Parameters      _id
    Access          PUBLIC
    Method          GET
*/

Router.get("/:_id", async (req, res) => {

    try {
        const { _id } = req.params;
        const foods = await FoodModel.find({ restraunt: _id });

        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

//============================================================================================


//======================== Getting Food According to Category ================================

/*
    Route           /r
    Description     Get all food based on particular Category
    Parameters      category
    Access          PUBLIC
    Method          GET
*/

Router.get("/r/:category", async (req, res) => {

    try {
        const { category } = req.params;
        const foods = await FoodModel.find({ category: { $regex: category, $options: "i" } });

        return res.json({ foods });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

//============================================================================================

export default Router;