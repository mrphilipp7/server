import { Request, Response } from "express";
import { asyncHandler } from "../lib/utils/asyncHandler.utils";
import { RESPONSE_STATUS, responseBody } from "../lib/utils/response.utils";
import {
  createUser,
  updateUserById,
  getUserById,
  deleteUserById,
} from "../services/user.services";
import { ApiError } from "../lib/classes/error.class";
import {
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateUserType,
  updateUserValidator,
} from "../validation/user.validation";

/**
 * @desc create a user
 * @route POST api/v1/user
 * @access public
 */
export const createNewUser = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;

    // running zod validation on request body
    const result = createUserValidator.safeParse(body);
    if (!result.success) {
      throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
        message: result.error.issues,
      });
    }

    const user = await createUser(body);

    return responseBody(res, RESPONSE_STATUS.CREATED, {
      data: user,
      message: "User created successfully",
    });
  }
);

/**
 * @desc delete a user
 * @route DELETE api/v1/user/:id
 * @access public
 */
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const params = req.params;

  const result = deleteUserValidator.safeParse(params);
  if (!result.success) {
    throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
      message: result.error.issues,
    });
  }

  const user = await deleteUserById(params.id);

  return responseBody(res, RESPONSE_STATUS.SUCCESS, {
    data: user,
    message: "User deleted successfully",
  });
});

/**
 * @desc get a user
 * @route GET api/v1/user/:id
 * @access public
 */
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const params = req.params;

  const result = getUserValidator.safeParse(params);
  if (!result.success) {
    throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
      message: result.error.issues,
    });
  }

  const getUserData = await getUserById(params.id);

  return responseBody(res, RESPONSE_STATUS.SUCCESS, {
    data: getUserData,
    message: "User retreived successfully",
  });
});

/**
 * @desc update a user
 * @route PATCH api/v1/user/:id
 * @access public
 */
export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const body = req.body;
  const params = req.params;

  const bodyValid = updateUserValidator.safeParse(body);
  if (!bodyValid.success) {
    throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
      message: bodyValid.error.issues,
    });
  }

  const { email, username, password } = body as updateUserType;

  const updatedUser = await updateUserById(params.id, {
    email,
    username,
    password,
  });

  return responseBody(res, RESPONSE_STATUS.SUCCESS, {
    data: updatedUser,
    message: "User updated successfully",
  });
});
