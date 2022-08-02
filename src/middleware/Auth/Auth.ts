import passport from "passport";
import LocalStrategy from "passport-local";
import argon2 from "argon2";
import { Users } from "../../modules/Kd_Mo_users";
import express from "express"

 const router = express.Router()
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
        userResult;
        const isValid = await argon2.verify(userResult?.password, password);

        if (!isValid)
          return callback(null, false, {
            message: "Incorrect username or password.",
          });
      }



      return callback(null, userResult);

    }
  )
);
passport.serializeUser((user: Express.User, done: (err: any, id?: unknown) => void) =>{
  process.nextTick(function() {

    done(null, { id: user, username: user });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user as string);
  });
});

router.post('/login/password', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

export default  {passport, router};