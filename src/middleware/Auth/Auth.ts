import passport from "passport";
import LocalStrategy from "passport-local";
import argon2 from "argon2";
import { Users } from "../../modules/Kd_Mo_users";
import express from "express"
import { sessionUser } from "src/utils/types";

 export const router = express.Router()
passport.use(
  new LocalStrategy.Strategy(
    async (
      username: string,
      password: string,
      callback: (
        error: any,
        user?: any,
        options?: LocalStrategy.IVerifyOptions | undefined
      ) => void
    ) => {
      const userResult = await Users.findOneBy({ username: username });
      if (!userResult)
        return callback(null, false, {
          message: "Incorrect username or password.",
        });

      if (userResult) {
        
        const isValid = await argon2.verify(userResult?.password, password);

        if (!isValid)
          return callback(null, false, {
            message: "Incorrect username or password.",
          });
      }



      return callback(null, { id:userResult._id, username:userResult.username } );

    }
  )
);
passport.serializeUser((userS: Express.User | sessionUser, done: (err: any,user:sessionUser) => void) =>{
  process.nextTick(function() {

    return done(null, userS as sessionUser );
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user as string);
  });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

export const Passport = passport;
