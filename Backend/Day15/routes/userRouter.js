import express from "express";
import {
  login,
  signup,
  logout,
  profile,
} from "../controllers/userController.js";

const userRouter = express.Router();

// api's for user
userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/logout", logout);
userRouter.get("/profile", profile);

export default userRouter;
