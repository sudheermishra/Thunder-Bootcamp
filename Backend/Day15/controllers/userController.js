import User from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, resp) => {
  const { name, age, email, password } = req.body;
  try {
    const saltRound = 12;
    const hashPsssword = await bcrypt.hash(password, saltRound);

    const user = await User.create({
      name: name,
      age: age,
      email: email,
      password: hashPsssword,
    });

    const token = jwt.sign(
      { name: name, email: email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    resp.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 1000,
    });
    resp.status(201).json({
      message: "user created successfully",
    });
  } catch (error) {
    resp.status(501).json({
      message: error.message,
    });
  }
};

export const login = async (req, resp) => {};

export const logout = async (req, resp) => {};
export const profile = async (req, resp) => {};
