import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  googleId: { type: String },
  name: { type: String }
});

export default mongoose.model("User", userSchema);
