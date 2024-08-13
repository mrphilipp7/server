import mongoose, { Document, Schema, Model } from "mongoose";

// Define the User interface extending mongoose.Document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Create the User Schema
const UserSchema: Schema<IUser> = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Create the User model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
