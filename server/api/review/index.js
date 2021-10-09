import express from "express";

import { ReviewModel } from "../../schema/db_all_models";

//Validation
import { ValidateId } from "../../validation/menu";
import { ValidateReviewBody } from "../../validation/review";

const Router = express.Router();

//================================= Add new Review ===================================

/*
    Route            /new
    Des              Add new Review
    Params           none
    BODY             Review Object
    Access           Public
    Method           POST
*/

Router.post("/new", async (req, res) => {

    try {
        await ValidateReviewBody(req.body);
        const { reviewData } = req.body;
        await ReviewModel.create(reviewData);
        return res.json({ review: "Successfully Created Review" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

//============================================================================================


//================================= Delete a Review ===================================

/*
    Route            /delete
    Des              Delete a Review
    Params           _id
    BODY             none
    Access           Public
    Method           DELETE
*/

Router.delete("/delete/:_id", async (req, res) => {

    try {
        await ValidateId(req.params);
        const { _id } = req.params;
        await ReviewModel.findByIdAndDelete(_id);
        return res.json({ review: "Review Successfully Deleted" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

//============================================================================================

export default Router;