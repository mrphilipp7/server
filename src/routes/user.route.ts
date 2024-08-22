import {
  createNewUser,
  deleteUser,
  updateUser,
  getUser,
} from "../controllers/user.controller";
import { Router } from "express";
import authService from "../lib/utils/authentication.utils";

const UserRouter = Router();

UserRouter.post("/", createNewUser);
UserRouter.get("/:id", authService.authenticate, getUser);
UserRouter.delete("/:id", authService.authenticate, deleteUser);
UserRouter.patch("/:id", authService.authenticate, updateUser);

export { UserRouter };
