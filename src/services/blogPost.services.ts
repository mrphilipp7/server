import { Request, Response } from "express";
import BlogPost, { IBlogPost } from "../models/blogPost.model";

// Create a new blog post
export const createBlogPost = async (
  blogPostData: Partial<IBlogPost>
): Promise<IBlogPost> => {
  const newBlogPost = new BlogPost(blogPostData);
  const savedBlogPost = await newBlogPost.save();
  return savedBlogPost;
};

// Get all blog posts
export const getAllBlogPosts = async (): Promise<IBlogPost[] | null> => {
  return await BlogPost.find().populate("author", "username email");
};

// Get a single blog post by ID
export const getBlogPostById = async (
  id: string
): Promise<IBlogPost | null> => {
  return await BlogPost.findById(id).populate("author", "username email");
};

// Update a blog post by ID
export const updateBlogPostById = async (
  id: string,
  updateData: Partial<IBlogPost>
) => {
  return await BlogPost.findByIdAndUpdate(id, updateData, { new: true }).exec();
};

// Delete a blog post by ID
export const deleteBlogPostById = async (
  id: String
): Promise<IBlogPost | null> => {
  return await BlogPost.findByIdAndDelete(id);
};
