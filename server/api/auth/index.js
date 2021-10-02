import express from "express";
import passport from "passport";

const Router = express.Router();

//==========================Import Models==========================

//User Model
import { UserModel } from "../../schema/user/index";


//=================================================================


//===================================== SIGN UP ====================================

/*
    Route           /signup
    Description     Sign Up with email and passwords
    Parameters      None
    Access          PUBLIC
    Method          Post
*/

Router.post("/signup", async (req, res) => {
    try {

        await UserModel.findByEmailAndPhone(req.body.credentials);

        //DB    
        const newUser = await UserModel.create(req.body.credentials);

        // JWT token
        const token = newUser.generateJwtToken();

        return res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//====================================================================================


//===================================== SIGN IN ====================================

/*
    Route           /signin
    Description     Sign In with Google Authentication
    Parameters      None
    Access          PUBLIC
    Method          Post
*/

Router.post("/signin", async (req, res) => {
    try {

        const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        //JWT Token 
        const token = user.generateJwtToken();

        return res.status(200).json({ token, status: "Succes" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//====================================================================================


//===================================== Google SIGN IN ====================================

/*
    Route           /google
    Description     Google Sign In 
    Parameters      None
    Access          PUBLIC
    Method          GET
*/

Router.get("/google", passport.authenticate("google", {
    scope: [
        "https://wwww.googleapis.com/auth/userinfo.profile",
        "https://wwww.googleapis.com/auth/userinfo.email"
    ],
})
);

//====================================================================================


//===================================== Google SIGN IN Callback =============================

/*
    Route           /google/callback
    Description     Google Sign In 
    Parameters      None
    Access          PUBLIC
    Method          GET
*/

Router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/", }), (req, res) => {
    return res.json()
});

//====================================================================================

export default Router;