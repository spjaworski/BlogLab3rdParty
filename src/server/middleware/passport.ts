import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import * as JWTStrategy from "passport-jwt";
import { Application } from "express";
import bcrypt_utils from "../utils/bcrypt";
import users from '../database/queries/users';
import { jwtConfig } from "../config";
import { Payload } from "../../types";

export function configurePassport(app: Application) {


    passport.use(new LocalStrategy.Strategy({
        usernameField: 'email',
    }, async (email, password, done) => {
        try {
            const [userFound] = await users.find('email', email);


            if (!userFound) {
                done(null, false);
            }

            const confirmedMatch = bcrypt_utils.compareHash(password, userFound.password!);
            delete userFound.password;
            if (!confirmedMatch) return done(null, false);

            delete userFound.password;
            done(null, userFound);

        } catch (error) {
            console.log(error);
        }
    }));

    passport.use(new JWTStrategy.Strategy({
        secretOrKey: jwtConfig.secret,
        jwtFromRequest: JWTStrategy.ExtractJwt.fromAuthHeaderAsBearerToken()
    }, (payload: Payload, done) => {
        if (payload.password) {
            delete payload.password;
        }
        done(null, payload)
    }
    )
    );
    // app.use(passport.initialize());
}