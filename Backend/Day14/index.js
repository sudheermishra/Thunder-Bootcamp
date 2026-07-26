import express from "express";
import mongoose from "mongoose";
import User from "./userScehma.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

await mongoose.connect(
  "mongodb+srv://sudheermishra8587_db_user:uLjCwNDEB1b4w5x8@cluster0.vh95za4.mongodb.net/LearnAuth",
);
const app = express();
app.use(cookieParser());
app.use(express.json());

app.post("/signup", async (req, resp) => {
  const { name, age, email, password } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name: name,
      age: age,
      email: email,
      password: hashPassword,
    });

    const token = jwt.sign({ name: name, email: email }, "house@123", {
      expiresIn: "1h",
    });

    resp.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    });

    resp.json({
      message: "user created successfully",
    });
  } catch (error) {
    resp.json({
      message: error.message,
    });
  }
});

app.get("/user", async (req, resp) => {
  const { token } = req.cookies;

  const payload = jwt.verify(token, "house@123");

  const user = await User.findOne({ email: payload.email });

  if (!user) {
    resp.json({
      message: "user not found",
    });
  } else {
    resp.json({
      message: "Your User detail",
      data: user,
    });
  }
});

app.post("/login", async (req, resp) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (user) {
    const isMatch = bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ name: user.name, email: email }, "house@123", {
        expiresIn: "1h",
      });

      resp.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 60 * 60 * 1000,
      });

      resp.json({
        message: "user logged in successfully",
      });
    } else {
      resp.json({
        message: "user not found",
      });
    }
  } else {
    resp.json({
      message: "user not found",
    });
  }
});

app.listen(3000, () => {
  console.log("server is listening on port number 3000");
});
