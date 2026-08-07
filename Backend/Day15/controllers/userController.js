import User from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginSchema, signupSchema } from "../validators/userValidator.js";
import Message from "../model/messageSchema.js";
import Chat from "../model/chatSchema.js";

const createToken = (userId, email) => {
  if (!process.env.JWT_SECRET) {
    // yeh error catch block me chala jayega
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign({ id: userId, email: email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: false,
  maxAge: 60 * 60 * 1000,
};

export const signup = async (req, resp) => {
  try {
    // jo bhi body me data aayega phle signupchema zod validator ke pass jayega agar validate nhi hua toh
    // error  return kr dega jo bhi reason hoga
    // user valid hua toh hum result me se result.data me se destructure kr lenege data ko jo bhi field aaya h result me

    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return resp.status(400).json({
        message: result.error.issues[0].message,
      });
    }

    // const { name, age, email, password } = req.body;
    // if (!name || !email || !password) {
    //   return resp.status(400).json({
    //     message: "Name, email and password are required",
    //   });
    // }

    const { name, age, email, password } = result.data;

    // if already a email exists
    // Jab bhi hum databse ko access krenge yeh mongoose schema validate hoga
    // but zod validator mogoose validator se phle validate hoga as we see hamara code me phle humne zod ko validate kiya h

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return resp.status(409).json({
        message: "User already exists",
      });
    }

    // password hashing for db
    const saltRound = 12;
    const hashPsssword = await bcrypt.hash(password, saltRound);

    // user creation
    const user = await User.create({
      name: name,
      age: age,
      email: email,
      password: hashPsssword,
    });

    const token = createToken(user._id, user.email);

    resp.cookie("token", token, cookieOptions);

    resp.status(201).json({
      message: "user created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
      },
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, resp) => {
  try {
    const result = loginSchema.safeParse(req.body);
    console.log(result);
    if (!result.success) {
      resp.status(400).json({
        message: result.error.issues[0].message,
      });
    }
    const { email, password } = result.data;

    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      return resp.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return resp.status(401).json({
        message: "Invalid Email or Password",
      });
    }

    const token = createToken(user._id, user.email);
    resp.cookie("token", token, cookieOptions);
    resp.status(200).json({
      message: "User logged in successfully",
      user: {
        name: user.name,
        age: user.age,
        email: user.email,
        usage: user.usage,
      },
    });
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const profile = async (req, resp) => {
  try {
    const { name, email, age, usage } = req.user;
    resp.status(200).json({
      name: name,
      age: age,
      usage: usage,
      email: email,
    });
  } catch (error) {
    (console.log(error),
      resp.status(500).json({
        message: "Internal Server Error",
      }));
  }
};

export const logout = async (req, resp) => {
  resp.clearCookie("token", {
    httpOnly: true,
    secure: false,
  });

  resp.status(200).json({
    message: "User Logged Out SuccessFully",
  });
};

export const deleteAccount = async (req, resp) => {
  try {
    const userId = req.user._id;
    await Message.deleteMany({ userId: userId });
    await Chat.deleteMany({ userId: userId });
    await User.deleteOne({ _id: userId });

    resp.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    resp.status(200).json({
      message: "user deleted successfully",
    });
  } catch (error) {
    console.log(error.message);
    resp.status(500).json({
      message: "Internal Server Error",
    });
  }
};
