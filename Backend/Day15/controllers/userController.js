import User from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = (userId) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
  }

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
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

    const token = createToken(user._id);

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
    resp.status(500).json({
      message: error.message,
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

    const token = createToken(user._id);
    resp.cookie("token", token, cookieOptions);
    resp.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    resp.status(500).json({
      message: error.message,
    });
  }
};

export const profile = async (req, resp) => {
  try {
    const { token } = req.cookies;
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    const user = await User.findOne({ _id: payload.id });
    console.log(user);
    if (!user) {
      return resp.status(400).json({
        message: "user not found",
      });
    }
    resp.status(200).json({
      data: user,
    });
  } catch (error) {
    resp.status(500).json({
      message: error.message,
    });
  }
};

export const logout = async (req, resp) => {};
