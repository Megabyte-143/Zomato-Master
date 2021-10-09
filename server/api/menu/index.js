// Libraries
import express from "express";

// Model Imports
import { MenuModel, ImageModel } from "../../schema/db_all_models";

// Validation
import { ValidateId } from "../../validation/menu";

const Router = express.Router();

//======================== Getting Menu List According to Restraunt ==========================

/*
    Route           /ml
    Description     Get all list of menu based on id    
    Parameters      _id
    Access          PUBLIC
    Method          GET
*/

Router.get("/ml/:_id", async (req, res) => {

    try {
        await ValidateId(req.params);
        const { _id } = req.params;
        const menus = await MenuModel.findOne(_id);

        return res.json({ menus });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

//============================================================================================


//======================== Getting Images According to Restraunt ==========================

/*
    Route           /image
    Description     Get images based on id    
    Parameters      _id
    Access          PUBLIC
    Method          GET
*/

Router.get("/image/:_id", async (req, res) => {

    try {
        await ValidateId(req.params);
        const { _id } = req.params;
        const menuImage = await ImageModel.findOne(_id);

        return res.json({ menuImage });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

//============================================================================================

export default Router;