import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        fullname: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String },
        address: [{ detail: { type: String }, for: { type: String } },],
        phoneNumber: [{ type: Number }]
    },
    {
        timestamps: true
    }
);

//=========================For Generating JWT Token========================
UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "Zomato_App");
}
//==========================================================================

//=========================For Checking Existing User========================
UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {

    //check whether the email exist 
    const checkUserByEmail = await UserModel.findOne({ email });

    //check whether the phoneNumber exist 
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByEmail || checkUserByPhone) {
        throw new Error("User Already Exists");
    }
    return false;
}
//============================================================================

//========================For checking the Email And Password========================
UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {

    //check whether the email exist 
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User Doesn't Exist");

    //compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) {
        throw new Error("Invalid Password");
    }
    return user;
}
//======================================================================================

//========================For BCrpyt the Password *times================================
UserSchema.pre("save", function (next) {
    const user = this;

    //password isnot modified
    if (!user.isModified("password")) return next();

    //generating bcrypt salt
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);

        //hashing the password
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            //assigning hashed password
            user.password = hash;
            return next();
        });
    });
});
//======================================================================================

export const UserModel = mongoose.model("Users", UserSchema);