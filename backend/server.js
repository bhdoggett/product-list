import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import passport from "passport";
import mainRoutes from "./routes/main.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import dotenv from "dotenv";
import { User } from "./models/user.js";
import configurePassport from "./config/passport.js";
dotenv.config();

const PORT = process.env.Port || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session & passport middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
);

app.use(passport.initialize(), passport.session());

// Passport configuration
configurePassport(passport);

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

// Routes
app.use(mainRoutes);
app.use(authRoutes);

// Global error handleing
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ message: "Internal servor error", error: err.message });
});

mongoose.connect("mongodb://localhost/products");

app.listen(PORT, () => console.log(`Node.js listening on port ${PORT}`));
