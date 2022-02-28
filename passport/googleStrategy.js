const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require('../models/User.model');



passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL || "/auth/google"
  },
  (accessToken, refreshToken, profile, done) => {
    console.log("Google account details: ", profile);

    // search for user in database
    User.findOne({ email: profile.emails.value })
      .then(user => {
        // return an error if account was not created via Google
        if (user && user.googleID !== profile.id) {
          return done(null, false, {
            errorMessage: "This email address was not registered via Google. Please login with your password."
          });
        }

        // log in user if found
        if (user) {
          return done(null, user);
        }

        // else, add user to database
        User.create({ 
          email: profile.emails.value,
          googleID: profile.id
        })
          .then(newUser => {
            done(null, newUser);
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
    }
  )
)