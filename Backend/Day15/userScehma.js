import mongoose from "mongoose";

const userScehma = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    usage: {
      // kitne token use ho gye current window me
      tokenUsed: {
        type: Number,
        default: 0,
      },
      // token limit set kr denge ki user itne hi token use kr skta window ke time tak
      tokenLimit: {
        type: Number,
        default: 10000,
      },
      // token ko reset kr denge
      resetAt: {
        type: Date,
        default: () => new Date(Date.now() + 5 * 60 * 60 * 1000), // abhi kaa time plus 5 hours kaaa time add kr diya in milisecond
      },
      // total token aaj tak kitne token use kr lie
      totalTokenUsed: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userScehma);
export default User;
