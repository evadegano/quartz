// packages that manage auth strategies
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");


module.exports = (passport) => {
  // local strategy
  passport.use(new LocalStrategy(
    {
      username: "email",
      password: "password"
    },
    function(username, password, done) {
      // search for user in database
      User.findOne({ email: username })
        .then(user => {
          // return error if email adress doesn't exist in the database
          if (!user) {
            return done(null, false, {
              errorMessage: "Incorrect email address."
            });
          }

          if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {
              errorMessage: "Incorrect password."
            })
          }
          done(null, user);
        })
        .catch(err => {
          done(err)})
    }
  ))

  // Google strategy
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: process.env.GOOGLE_OAUTH_ID,
  //       clientSecret: process.env.GOOGLE_OAUTH_SECRET,
  //       callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL || "/auth/google/callback"
  //     },
  //     (accessToken, refreshToken, profile, done) => {
  //       console.log("Google account details: ", profile);

  //       // search for user in database
  //       User.findOne({ email: profile.emails.value })
  //         .then(user => {
  //           // return an error if account was not created via Google
  //           if (user && user.googleID !== profile.id) {
  //             return done(null, false, {
  //               errorMessage: "This email address was not registered via Google. Please login with your password."
  //             });
  //           }

  //           // log in user if found
  //           if (user) {
  //             return done(null, user);
  //           }

  //           // else, add user to database
  //           User.create({ 
  //             firstName: profile.name.givenName,
  //             email: profile.emails.value,
  //             googleID: profile.id
  //           })
  //             .then(newUser => {
  //               done(null, newUser);
  //             })
  //             .catch(err => done(err));
  //         })
  //         .catch(err => done(err));
  //     }
  //   )
  // )

  // serialize user to define what data will be kept in the session
  passport.serializeUser((user, cb) => cb(null, user._id));
  passport.deserializeUser((id, cb) => {
    User.findById(id)
      .then(user => cb(null, user))
      .catch(err => cb(err));
  })
}






