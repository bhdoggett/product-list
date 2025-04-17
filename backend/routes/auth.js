import express from "express";
import session from "express-session";
import passport from "passport";
import { User } from "../models/user.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Required to use __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env file from parent directory
dotenv.config({ path: path.resolve(__dirname, "../.env") });

("passport-google-oauth20");

const router = express.Router();

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
);

router.use(passport.initialize(), passport.session());

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

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    successRedirect: "/success",
    failureRedirect: "/auth/failure",
  })
);

router.get("/success", (req, res) => {
  res.send("Logged in successfully!");
});

router.get("/auth/failure", (req, res) => {
  res.send("Failed to log in!");
});

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

router.get("/api/logout", (req, res) => {
  req.logout();
  res.send(req.user);
});

export default router;

// this is a work in progress
