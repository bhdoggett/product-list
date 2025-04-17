import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  picture: String,
});

const UserModel = mongoose.model("user", UserSchema);

export default User;
