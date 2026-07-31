import User from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    const { name, age, email, password } = req.body;
    if (!name || !email || !password) {
      return resp.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // if already a email exists
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
    const { email, password } = req.body;
    if (!email || !password) {
      return resp.status(400).json({
        message: "Email and Password are required",
      });
    }

    const user = await User.findOne({ email: email });
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
