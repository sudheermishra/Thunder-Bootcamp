import express from "express";
import {
  login,
  signup,
  logout,
  profile,
  deleteAccount,
} from "../controllers/userController.js";
import authUserMiddleware from "../middlewares/authUserMiddleware.js";
import authenticateRateLimiter from "../middlewares/authenticatedRateLimiter.js";
import unAuthenticateRateLimiter from "../middlewares/unAuthenticatedRateLimiter.js";

const userRouter = express.Router();

// api's for user
userRouter.post("/login", authenticateRateLimiter, login);
userRouter.post("/signup", unAuthenticateRateLimiter, signup);
userRouter.post("/logout", authUserMiddleware, authenticateRateLimiter, logout);
userRouter.get(
  "/profile",
  authUserMiddleware,
  authenticateRateLimiter,
  profile,
);
userRouter.delete(
  "/delete",
  authUserMiddleware,
  authenticateRateLimiter,
  deleteAccount,
);

export default userRouter;
