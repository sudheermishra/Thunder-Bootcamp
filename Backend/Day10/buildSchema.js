import mongoose from "mongoose";

// Schema defines the structure of documents inside the collection
// It also allows us to apply validations and default values
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 20,
      trim: true, // Removes extra spaces from the beginning and end
      required: true,
    },
    accountNumber: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      minLength: 3,
      maxLength: 20,
      trim: true,
    },
    age: {
      type: Number,
      min: 10, // Minimum allowed age
      max: 60, // Maximum allowed age
    },
    balance: {
      type: Number,
      min: 0, // Balance cannot be negative
      required: true,
    },
    accountType: {
      type: String,
      required: true,
      // enum restricts the value to only the given options
      enum: ["saving", "current"],

      // If the user doesn't provide accountType,
      // Mongoose will automatically set it to "saving"
      default: "saving",
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  },
);

// Model creates (or uses an existing) collection in MongoDB.
// First argument: Collection name ("Customer")
// Second argument: Schema that defines the structure of documents.
//
// The model returns an object that provides methods like:
// create(), find(), findOne(), updateOne(), deleteOne(), etc.
// We export this model so it can be used in other files.

const Customer = mongoose.model("Customer", userSchema);

export default Customer;

// model hamare liye collection create kr deta h database me or usme yeh schemaa set kr deta hain
// model function as a argument hum pass krte h collection kaa naam jo bhi hume banana h or dusri value schemma jo hmne banaya
// and model hume return me object dega jisme hume bhaut saari functionlity milti jinse hum crud opertion and all perform kar skte h
// and is object ko fir hum export kra denge taaki isko hum main file me use kr ske
