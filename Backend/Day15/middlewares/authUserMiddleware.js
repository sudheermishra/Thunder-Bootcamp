import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

const authUserMiddleware = async (req, resp, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return resp.status(401).json({
        message: "Please Login First",
      });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const existingUser = await User.findById({ _id: payload.id });
    if (!existingUser) {
      return resp.status(400).json({
        message: "User Doesn't Exist",
      });
    }
    //Matlab req object ke andar user naam ki key/property bana do aur uske andar existingUser store kar do.
    req.user = existingUser;
    next();
  } catch (error) {
    console.log(error);
    resp.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default authUserMiddleware;
