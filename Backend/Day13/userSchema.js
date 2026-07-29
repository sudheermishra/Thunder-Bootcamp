import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      MaxLength: 20,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 100,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;

// index, unique, sparse: indexes ko create karte hai

// index: true: Mein seedha index create karunga
// unique: true ---> Mein aapke liye unique value enter hone dunga, aur uske around indexes
// sparse: true: entry di hai, tabhi index create honge,  toh create karunga index

// email: uniuqe: true, required: true: email dena compulsory hai or uske around indexing banegi
//Phone Number: sparse: true, unique: true: phone number dena mandatory nahi, lekin agar diya, toh uniue hoga aur uske around index create hoga
