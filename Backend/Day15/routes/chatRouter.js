import express from "express";
import authUserMiddleware from "../middlewares/authUserMiddleware";

const chatRouter = express.Router();

chatRouter.use(authUserMiddleware);

chatRouter.post("/createChat", createChat);

chatRouter.get("/getRecentChat", getRecentChat);

chatRouter.get(":chatId", getSinglechat);

chatRouter.delete(":chatId", deleteChat);

export default chatRouter;
