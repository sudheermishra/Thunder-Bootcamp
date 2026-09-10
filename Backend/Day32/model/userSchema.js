import mongoose from "mongoose";
// ================= USER SCHEMA =================

// Har registered user ka data store hoga
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
      // total token aaj tak kitne token use kr lie
      totalTokenUsed: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
