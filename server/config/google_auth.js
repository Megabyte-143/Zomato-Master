// import passport from "passport";
// import googleOAuth from "passport-google-oauth20";

// import { UserModel } from "../schema/user";

// const GoogleStrategy = googleOAuth.Strategy;

// export default (passport) => {
//     passport.use(
//         new GoogleStrategy({
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: "http://localhost:4000/auth/google/callback"
//         },
//             async (accessToken, refreshToken, profile, done) => {

//                 // Creating New user
//                 const newUser = {
//                     fullname: profile.displayName,
//                     email: profile.emails[0].value,
//                     profilePic: profile.photos[0].value,

//                 };
//                 try {

//                     // Check whether user exist or not
//                     const user = await UserModel.findOne({ email: newUser.email });


//                     if (user) {

//                         //Generate JWT token 
//                         const token = user.generateJwtToken();

//                         // Return user
//                         done(null, { user, token });
//                     } else {
//                         // Create new User
//                         const user = await UserModel.create(newUser);

//                         // Return User
//                         done(null, { user, token });
//                     }
//                 } catch (error) {
//                     // 
//                     done(error, null);
//                 }
//             }
//         )
//     );
//     passport.serializeUser((userData, done) => done(null, { ...userData }));
//     passport.deserializeUser((id, done) => done(null, id));
// };