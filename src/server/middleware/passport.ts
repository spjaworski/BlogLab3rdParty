import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import * as JWTStrategy from "passport-jwt";
import { Application } from "express";
import bcrypt_utils from "../utils/bcrypt";
import users from '../database/queries/users';
import { jwtConfig } from "../config";
import { Payload } from "../../types";

export function configurePassport(app: Application) {

    // passport.serializeUser((user, done) => done(null, user));
    // passport.deserializeUser((user, done) => done(null, user));
    // passport.deserializeUser(function(id, done) {
    //     User.findById(id, function (err, user) {
    //       done(err, user);
    //     });
    //   });

    passport.use(new LocalStrategy.Strategy({
        usernameField: 'email',
    }, async (email, password, done) => {
        try {
            const [user] = await users.find('email', email);


            if (!user) {
                done(null, false);
            }

            const confirmedMatch = bcrypt_utils.compareHash(password, user.password!);
            if (!confirmedMatch) return done(null, false);

            delete user.password;
            done(null, user);

        } catch (error) {
            console.log(error);
            done(error, false);
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
    app.use(passport.initialize());
}