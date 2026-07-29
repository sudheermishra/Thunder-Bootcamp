import express from "express";
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import cookieParser from "cookie-parser";

// dotenv.config process.env jo ki empty object h usme yeh data fill kr dega dotenv package
// process.env hume nodejs deta h naa ki dotenv module/pacakage
// process.env initally empty hota h ab humne .env file me hamare secrets toh rakh diye but process.env me kon fill krega isliye dot env hume config krna padta h yeh uske andar fill krta h
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/user", userRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`server is listening on port number ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
