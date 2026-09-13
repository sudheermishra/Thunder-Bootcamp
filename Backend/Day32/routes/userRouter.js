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
import loadUserMiddleware from "../middlewares/loadUserMiddleware.js";

const userRouter = express.Router();

// api's for user
userRouter.post("/login", unAuthenticateRateLimiter, login);
userRouter.post("/signup", unAuthenticateRateLimiter, signup);
userRouter.post("/logout", authUserMiddleware, authenticateRateLimiter, logout);
userRouter.get(
  "/profile",
  authUserMiddleware,
  authenticateRateLimiter,
  loadUserMiddleware,
  profile,
);
userRouter.delete(
  "/delete",
  authUserMiddleware,
  authenticateRateLimiter,
  loadUserMiddleware,
  deleteAccount,
);

export default userRouter;
