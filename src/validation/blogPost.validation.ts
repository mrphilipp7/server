import { z } from "zod";

const createBlogPostValidator = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

const getBlogPostValidator = z.object({
  id: z.string().min(1),
});

const deleteBlogPostValidator = z.object({
  id: z.string().min(1),
});

const updateBlogPostValidator = z.object({
  title: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
});

type createBlogPostType = z.infer<typeof createBlogPostValidator>;
type getBlogPostType = z.infer<typeof getBlogPostValidator>;
type deleteBlogPostType = z.infer<typeof deleteBlogPostValidator>;
type updateBlogPostType = z.infer<typeof updateBlogPostValidator>;

export {
  createBlogPostValidator,
  createBlogPostType,
  getBlogPostValidator,
  getBlogPostType,
  deleteBlogPostValidator,
  deleteBlogPostType,
  updateBlogPostValidator,
  updateBlogPostType,
};
