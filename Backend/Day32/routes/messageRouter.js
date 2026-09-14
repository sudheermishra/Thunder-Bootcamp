import express from "express";
import authUserMiddleware from "../middlewares/authUserMiddleware.js";
import { sendMessage, getMessage } from "../controllers/messageController.js";
import authenticateRateLimiter from "../middlewares/authenticatedRateLimiter.js";
import loadUserMiddleware from "../middlewares/loadUserMiddleware.js";
import tokenUsedMiddleware from "../middlewares/tokenUsedMiddleware.js";

const messageRouter = express.Router();

messageRouter.use(authUserMiddleware);
messageRouter.use(authenticateRateLimiter);

messageRouter.post("/", tokenUsedMiddleware, loadUserMiddleware, sendMessage);
messageRouter.get("/:chatId", loadUserMiddleware, getMessage);
messageRouter.post(
  "/:chatId",
  tokenUsedMiddleware,
  loadUserMiddleware,
  sendMessage,
);

export default messageRouter;
