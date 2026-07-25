import express from "express";
import mongoose from "mongoose";
import User from "./userSchema.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

await mongoose.connect(
  "mongodb+srv://sudheermishra8587_db_user:uLjCwNDEB1b4w5x8@cluster0.vh95za4.mongodb.net/LearnAuth",
);
const app = express();
// jab bhi browser send krta h cookies toh woh string format me hoti toh usko js object me convert krti h cookieparser
app.use(cookieParser());
// for parsing and packet collecting
app.use(express.json());

app.post("/signup", async (req, resp) => {
  const { name, age, email, password } = req.body;

  try {
    const user = await User.create({ name, age, email, password });
    // token bhejna padega
    // payload, secret key, optional field
    // sign ek function h jo phle argument lega object jisme hum payload pass krenge ki is payload se woh digital signature banayega
    // payload me koi sensitive chije mat daalo q ki ye sirf encode hoke jaata h isko koi bhi decode krke information le skte
    // isme unique index wali value pass kro jiske base pe yeh db me search krega data ko
    // second argument me hum symmteric key pass krte h
    //third argument option h ki yeh token kitne time baad expire hoga "1h" 456 yeh second me

    // token create ho gya
    // JWT token generate kiya aur token variable me store kar diya
    const token = jwt.sign(
      {
        name: name,
        email: email,
      },
      "house@123",
      { expiresIn: "1h" },
    );

    // is token ko hum client side p response me pass nhi krnege isko cookies m send krnege jo browser handle krta hain
    // agar hum direct is toke ko js ko dede frontend p toh yeh leak ho skta h and hacker isko access kr skta hain

    resp.cookie(
      "token", // 👈 Cookie ka NAME (browser is naam se cookie store karega)
      token, // 👈 Cookie ki VALUE (upar generate hua JWT token)
      {
        // 👇 JavaScript (document.cookie) is cookie ko access nahi kar sakti.
        // Sirf browser automatically request ke sath server ko bhejega.
        httpOnly: true,
        // 👇 false = HTTP aur HTTPS dono par cookie chalegi (development/localhost).
        // Production me secure: true rakhte hain taaki cookie sirf HTTPS par hi bheji jaye.
        secure: false,
        // 👇 Cookie kitni der tak valid rahegi.
        // 60 * 60 * 1000 = 1 hour = 3600000 milliseconds.
        // Iske baad browser cookie automatically delete kar dega.
        maxAge: 60 * 60 * 1000,
      },
    );
    resp.json({
      message: "user is created successfully",
    });
  } catch (error) {
    resp.json({
      message: error.message,
    });
  }
});

app.get("/user", async (req, resp) => {
  // verify its token
  const { token } = req.cookies;
  // token ko verify karna padega, kya ye valid hai ya nahi
  // jwt.verify 2 argument lega phla toh token kaa naam kis naam se save kiya toha cookie me req se cookie ko nikal liya and pass kr diya jwt.verify me
  // second argument lega secret key jise yeh is token ke payload kaa digital singature nikal ke verify kr ske
  // yeh return me hume payload send kr dega user kaa
  // ab user authenticate ho gya toh yeh bhi check krna padega na ki user kon h and isko kya dena hai
  const payload = jwt.verify(token, "house@123");

  // toh payload me humne email pass kri thi jab token generate kia tha ab wahi payload se hum email nikal ke find kr lenege database me or user ko jo chiaye woh de denege
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
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        const token = jwt.sign(
          {
            email: email,
            name: user.name,
          },
          "house@123",
          { expiresIn: "1h" },
        );

        resp.cookie("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 60 * 60 * 1000,
        });
        resp.json({
          message: "User Logged in successfully",
        });
      } else {
        resp.json({
          message: "invalid credentials",
        });
      }
    } else {
      resp.json({
        message: "user not found",
      });
    }
  } catch (error) {
    resp.json({
      message: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log("server is listening on port number 3000");
});
