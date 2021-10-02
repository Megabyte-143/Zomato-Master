import express from "express";

// Restraunt Model Import
import { RestrauntModel } from "../../schema/db_all_models";

const Router = express.Router();

//============================== Getting all the Restraunts ================================

/*
    Route           /
    Description     get all restraunt details 
    Parameters      None
    Access          PUBLIC
    Method          GET
*/

Router.get("/", (req, res) => {
    try {
        const { city } = req.query;
        const restraunts = await RestrauntModel.find({ city });
        return res.json({ restraunts });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//============================================================================================


//============================== Getting the Particular Restraunts ===========================

/*
    Route           /
    Description     get all restraunt details 
    Parameters      _id
    Access          PUBLIC
    Method          GET
*/

Router.get("/:_id", (req, res) => {
    try {
        const { _id } = req.params;
        const restraunt = await RestrauntModel.findOne(_id);

        if (!restraunt)
            return res.status(404).json({ error: "Restraunt Not Found" });
        return res.json({ restrauntq });
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

Router.get("/search", (req, res) => {
    try {
        const { searchString } = req.body;

        const restraunt = await RestrauntModel.find({
            name: { $regex: searchString, $options: "i" },
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//============================================================================================

export default Router;