import { z } from "zod";

const createUserValidator = z.object({
  email: z.string().min(1).email(),
  username: z.string().min(1),
  password: z.string().min(6).max(10),
});

const getUserValidator = z.object({
  id: z.string().min(1),
});

const deleteUserValidator = z.object({
  id: z.string().min(1),
});

const updateUserValidator = z.object({
  email: z.string().min(1).email().optional(),
  username: z.string().min(1).optional(),
  password: z.string().min(6).max(10).optional(),
});

type createUserType = z.infer<typeof createUserValidator>;
type getUserType = z.infer<typeof getUserValidator>;
type deleteUserType = z.infer<typeof deleteUserValidator>;
type updateUserType = z.infer<typeof updateUserValidator>;

export {
  createUserType,
  createUserValidator,
  getUserType,
  getUserValidator,
  deleteUserType,
  deleteUserValidator,
  updateUserType,
  updateUserValidator,
};
