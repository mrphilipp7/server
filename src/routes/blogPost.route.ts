import {
  createNewBlogPost,
  getAllExistingBlogPosts,
  getExistingBlogPostById,
  updateExistingBlogPostById,
  deleteExistingBlogPostById,
} from "../controllers/blogPost.controller";
import { Router } from "express";
import authService from "../lib/utils/authentication.utils";

const BlogPostRouter = Router();

BlogPostRouter.post("/", authService.authenticate, createNewBlogPost);

BlogPostRouter.get("/", authService.authenticate, getAllExistingBlogPosts);

BlogPostRouter.get(
  "/blog/:id",
  authService.authenticate,
  getExistingBlogPostById
);

BlogPostRouter.patch(
  "/blog/:id",
  authService.authenticate,
  updateExistingBlogPostById
);

BlogPostRouter.delete(
  "/blog/:id",
  authService.authenticate,
  deleteExistingBlogPostById
);

export { BlogPostRouter };
