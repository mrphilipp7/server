import { Request, Response } from "express";
import { asyncHandler } from "../lib/utils/asyncHandler.utils";
import { RESPONSE_STATUS, responseBody } from "../lib/utils/response.utils";
import {
  createBlogPost,
  updateBlogPostById,
  getAllBlogPosts,
  getBlogPostById,
  deleteBlogPostById,
} from "../services/blogPost.services";
import {
  createBlogPostValidator,
  deleteBlogPostValidator,
} from "../validation/blogPost.validation";
import { ApiError } from "../lib/classes/error.class";

/**
 * @desc create a new blog post
 * @route POST api/v1/blog-post
 * @access public
 */
export const createNewBlogPost = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const author = req.user.userId;

    // running zod validation on request body
    const result = createBlogPostValidator.safeParse(body);
    if (!result.success) {
      throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
        message: result.error.issues,
      });
    }

    // body for params for building a new blog post
    const blogParams = {
      title: body.title,
      content: body.content,
      author,
    };

    const newBlogPost = await createBlogPost(blogParams);

    return responseBody(res, RESPONSE_STATUS.CREATED, {
      data: newBlogPost,
      message: "Blog post successfully created.",
    });
  }
);

/**
 * @desc find a blog post by id
 * @route GET api/v1/blog-post/:id
 * @access public
 */
export const getExistingBlogPostById = asyncHandler(
  async (req: Request, res: Response) => {
    const params = req.params;

    // running zod validation on request params
    const result = createBlogPostValidator.safeParse(params);
    if (!result.success) {
      throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
        message: result.error.issues,
      });
    }

    const blogPost = await getBlogPostById(params.id);

    return responseBody(res, RESPONSE_STATUS.SUCCESS, {
      data: blogPost,
      message: "Blog post successfully retreived.",
    });
  }
);

/**
 * @desc get all blog posts
 * @route GET api/v1/blog-post
 * @access public
 */
export const getAllExistingBlogPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const blogPosts = await getAllBlogPosts();

    return responseBody(res, RESPONSE_STATUS.SUCCESS, {
      data: blogPosts,
      message: "Blog posts successfully retrieved.",
    });
  }
);

/**
 * @desc delete a blog post
 * @route DELETE api/v1/blog-post
 * @access public
 */
export const deleteExistingBlogPostById = asyncHandler(
  async (req: Request, res: Response) => {
    const params = req.params;

    const result = deleteBlogPostValidator.safeParse(params);
    if (!result.success) {
      throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
        message: result.error.issues,
      });
    }

    const deletedBlogPost = await deleteBlogPostById(params.id);

    return responseBody(res, RESPONSE_STATUS.SUCCESS, {
      data: deletedBlogPost,
      message: "Blog post successfully deleted.",
    });
  }
);

/**
 * @desc update a blog post
 * @route PATCH api/v1/blog-post
 * @access public
 */
export const updateExistingBlogPostById = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const author = req.user.userId;

    // running zod validation on request body
    const result = createBlogPostValidator.safeParse(body);
    if (!result.success) {
      throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
        message: result.error.issues,
      });
    }

    const updatedBlogPost = await updateBlogPostById(author, body);

    return responseBody(res, RESPONSE_STATUS.SUCCESS, {
      data: updatedBlogPost,
      message: "Blog post successfully updated.",
    });
  }
);
