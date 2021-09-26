import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const Router = express.Router();

//==========================Import Models==========================

//User Model
import {UserModel} from "../../schema/user/index";


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
        const { email, password, fullname, phoneNumber } = req.body.credentials;

        // Check whether email or phone number exist 
        const checkUserByEmail = await UserModel.findOne({ email });
        const checkUserByPhone = await UserModel.findOne({ phoneNumber });

        if (checkUserByEmail || checkUserByPhone) {
            return res.json({ error: "User Already Exist" });
        }

        // hashing 
        const bcryptSalt  = await bcrypt.genSalt(8);

        const hashedPass= await bcrypt.hash(password,bcryptSalt);

        //MongoDB
        await UserModel.create({
            ... req.body.credentials,
            password: hashedPass,
        });

        //JWT Token 
        const token  = await jwt.sign({user:{fullname,email}},"Zomato_App");

        res.status(200).json({token});
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//====================================================================================



export default Router;