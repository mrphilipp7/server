import mongoose, { Document, Schema, Model } from "mongoose";
import { IUser } from "./user.model";

// Define the BlogPost interface extending mongoose.Document
export interface IBlogPost extends Document {
  title: string;
  content: string;
  author: IUser["_id"]; // Reference the User model's ID
}

// Create the BlogPost Schema
const BlogPostSchema: Schema<IBlogPost> = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
  },
  { timestamps: true }
);

// Create the BlogPost model
const BlogPost: Model<IBlogPost> = mongoose.model<IBlogPost>(
  "BlogPost",
  BlogPostSchema,
  "blog_posts"
);

export default BlogPost;
