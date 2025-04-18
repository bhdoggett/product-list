import express from "express";
import passport from "passport";

const router = express.Router();

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
