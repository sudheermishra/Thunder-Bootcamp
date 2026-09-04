import express from "express";
import {
  login,
  signup,
  logout,
  profile,
  deleteAccount,
} from "../controllers/userController.js";
import authUserMiddleware from "../middlewares/authUserMiddleware.js";
const userRouter = express.Router();

// api's for user
userRouter.post("/login", login);
userRouter.post("/signup", signup);
userRouter.post("/logout", logout);
userRouter.get("/profile", authUserMiddleware, profile);
userRouter.delete("/delete", authUserMiddleware, deleteAccount);

export default userRouter;
