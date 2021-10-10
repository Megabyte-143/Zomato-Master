import JwtPassport from "passport-jwt";

//Database Model
import { UserModel } from "../schema/user";

const JwtStrategy = JwtPassport.Strategy;
const ExtractJwt = JwtPassport.ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "Zomato_App"
};

export default (passport) => {
    passport.use(
        new JwtStrategy(options, async (jwt__payload, done) => {
            try {
                const doesUserExist = UserModel.findById(jwt__payload.user);
                if (!doesUserExist) return done(null, false);
                return done(null, doesUserExist);
            } catch (e) { 
                throw new Error(e);
            }
        })
    );
}