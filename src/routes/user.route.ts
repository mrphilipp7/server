import {
  createNewUser,
  deleteUser,
  updateUser,
  getUser,
} from "../controllers/user.controller";
import { Router } from "express";

const UserRouter = Router();

UserRouter.post("/", createNewUser);
UserRouter.get("/:id", getUser);
UserRouter.delete("/:id", deleteUser);
UserRouter.patch("/:id", updateUser);

export { UserRouter };
