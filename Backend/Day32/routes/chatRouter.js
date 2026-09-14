import express from "express";
import authUserMiddleware from "../middlewares/authUserMiddleware.js";
import {
  createChat,
  getRecentChat,
  getSingleChat,
  deleteChat,
} from "../controllers/chatController.js";
import authenticateRateLimiter from "../middlewares/authenticatedRateLimiter.js";
import loadUserMiddleware from "../middlewares/loadUserMiddleware.js";

const chatRouter = express.Router();

chatRouter.use(authUserMiddleware);
chatRouter.use(authenticateRateLimiter);
chatRouter.use(loadUserMiddleware);

chatRouter.post("/createChat", createChat);

chatRouter.get("/getRecentChat", getRecentChat);

chatRouter.get("/:chatId", getSingleChat);

chatRouter.delete("/:chatId", deleteChat);

export default chatRouter;
