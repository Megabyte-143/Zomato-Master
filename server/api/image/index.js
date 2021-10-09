// Libraries
import express from "express";
import multer from "multer";

import { ImageModel } from "../../schema/db_all_models";

// Utilities 
import { s3Upload } from "../../Utils/AWS/index";

const Router = express.Router();

//Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });



//============================== Uploading and Saving Images ================================

/*
    Route           /
    Description     Uploading Given image to S3 buket and saving on MongoDB     
    Parameters      None
    Access          PUBLIC
    Method          POST
*/

Router.post("/", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;

        //S3 buket options 
        const bucketOptions = {
            Bucket: "zomato-master-mine",
            Key: file.originalname,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: "public-read"
        };
        const uploadImage = await s3Upload(bucketOptions);
        return res.status(200).json({ uploadImage });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

//============================================================================================

export default Router;