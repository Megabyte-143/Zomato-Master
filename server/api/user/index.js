import express from "express";

import { UserModel } from "../../schema/db_all_models";

const Router = express.Router();



//================================= Getting the User Data ===================================

/*
    Route            /
    Des              Get an user data
    Params           _id
    BODY             none
    Access           Public
    Method           GET
*/

Router.get("/", async (req, res) => {

    try {
        const { _id } = req.params;
        const getUser = await UserModel.findById(_id);
        return res.json({ user: getUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

//============================================================================================


//================================= Update the User Data ===================================

/*
    Route            /update
    Des              Update the User Data
    Params           _userId
    BODY             user data
    Access           Public
    Method           PUT
*/

Router.get("/update/:_userId", async (req, res) => {

    try {
        const { userId } = req.params;
        const { userData } = req.body;
        const updateUserData = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set: userData,
            },
            {
                new: true,
            }
        );
        return res.json({ user: updateUserData });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

//============================================================================================

export default Router;