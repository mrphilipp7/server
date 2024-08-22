import { asyncHandler } from "../lib/utils/asyncHandler.utils";
import authService from "../lib/utils/authentication.utils";
import { Request, Response } from "express";
import { getUserByEmail } from "../services/user.services";
import { RESPONSE_STATUS, responseBody } from "../lib/utils/response.utils";
import { ApiError } from "../lib/classes/error.class";
import { comparePassword } from "../lib/utils/encryption.utils";

/**
 * @desc generate jwts to log in user
 * @route POST api/v1/auth/tokens
 * @access public
 */
export const generateTokens = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    // email doesn't exist
    if (user === null) {
      throw new ApiError(RESPONSE_STATUS.UN_AUTHORIZED, {
        message: "Email or password is incorrect.",
      });
    }

    const isValidEmailandPassword = await comparePassword({
      password: password,
      hashedPassword: user.password,
    });

    // provided password does not match password in db
    if (isValidEmailandPassword === false) {
      throw new ApiError(RESPONSE_STATUS.UN_AUTHORIZED, {
        message: "Email or password is incorrect.",
      });
    }

    const payLoad = {
      userId: user.id,
      issued: new Date(),
    };

    const accessToken = authService.generateAccessToken(payLoad);
    const refreshToken = authService.generateRefreshToken(payLoad);

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return responseBody(res, RESPONSE_STATUS.CREATED, {
      data: accessToken,
      message: "Credentials successfully verfied",
    });
  }
);

/**
 * @desc check user session status
 * @route GET api/v1/auth/tokens
 * @access private
 */
export const getTokens = asyncHandler(async (req: Request, res: Response) => {
  return responseBody(res, RESPONSE_STATUS.SUCCESS, {
    data: req.user,
    message: "Token has been verified",
  });
});

/**
 * @desc log our user
 * @route DELETE api/v1/auth/tokens
 * @access private
 */
export const deleteTokens = asyncHandler(
  async (req: Request, res: Response) => {
    res.cookie("access_token", "", {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production" ? true : false,
      expires: new Date(0), // Set the expiration date to the past
    });

    res.cookie("refresh_token", "", {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production" ? true : false,
      expires: new Date(0), // Set the expiration date to the past
    });

    return responseBody(res, RESPONSE_STATUS.SUCCESS, {
      message: "Tokens have been successfully deleted.",
    });
  }
);
