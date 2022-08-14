import passport from "passport";
import LocalStrategy from "passport-local";
import argon2 from "argon2";
import { Users } from "../../modules/Kd_Mo_users";
import express from "express";
import { sessionUser } from "src/utils/types";

export const router = express.Router();

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

      return callback(null, {
        id: userResult._id,
        username: userResult.username,
      });
    }
  )
);

passport.serializeUser(
  (
    userS: Express.User | sessionUser,
    done: (err: any, user: sessionUser) => void
  ) => {
    process.nextTick(function () {
      return done(null, userS as sessionUser);
    });
  }
);

passport.deserializeUser(function (user: Express.User, cb) {
  process.nextTick(function () {
    return cb(null, user as Express.User);
  });
});




router.post("/login", (req, res, next) => {

  passport.authenticate("local", (err, user) => {

    if (err) {
      return next(err);
    }
    
    if (!user) {
      return res
        .send({ success: false, message: "authentication failed" })
        .status(401);
    }

     req.logIn(user,()=>{
      return res.send({ success: true, message: "authentication succeeded" });
 })
 
 //return res.send({ success: true, message: "authentication succeeded" });

  })(req, res, next);

});
 
router.post("/signup", async (req, res, next) => {

  await Users.create(req.body)
    .save()
    .then((user: Users) => {
      let userLogin = {
        id: user?._id,
        username: req.body.username,
      };

      req.login(userLogin, function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
    })
    .catch((err: any) => {
      if (err) {
        return next(err);
      }

      console.log(err);
    });
});

router.delete("/logout", (req, res) => {
  req.logOut((err) => {
    console.error(err);
  });
  res.redirect("/login");
});

export const Passport = passport;
