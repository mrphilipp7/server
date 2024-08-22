import {
  generateTokens,
  getTokens,
  deleteTokens,
} from "../controllers/auth.controller";
import { Router } from "express";
import authService from "../lib/utils/authentication.utils";

const AuthRouter = Router();

AuthRouter.post("/tokens", generateTokens);

AuthRouter.get("/tokens", authService.authenticate, getTokens);

AuthRouter.delete("/tokens", authService.authenticate, deleteTokens);

AuthRouter.post("/tokens/refresh", authService.refreshToken);

export { AuthRouter };
