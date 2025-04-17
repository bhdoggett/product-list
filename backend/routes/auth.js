import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import mongoose from "mongoose";
import User from "../models/user";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const router = express.Router();

// this is a work in progress
