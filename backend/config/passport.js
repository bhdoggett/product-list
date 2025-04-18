import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user.js";

const configurePassport = (passport) => {
  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await User.findOne({ googleId: profile.id });
          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              picture: profile.photos[0].value,
            });
            await newUser.save();
            return done(null, newUser);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

export default configurePassport;
