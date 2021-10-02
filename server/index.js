require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// Google Auth Config File
import googleAuthConfig from "./config/google_auth";

// API 
import Auth from "./api/auth/index";
import Restraunt from "./api/restraunts/index";

//Database Connection
import ConnectDB from "./schema/connection";


const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

// Passport Configuration 
googleAuthConfig(passport);


//For application routes
// localhost:4000/auth/signup
zomato.use("/auth", Auth);
zomato.use("/restraunt", Restraunt);

zomato.get("/", (req, res) => res.json({ message: "SetUp Success Yay!!" }));

zomato.listen(4000, () =>
    ConnectDB().then(() => console.log("Server is up and running")).catch(() => console.log("DB connection failed")));
