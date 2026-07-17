import mongoose from "mongoose";

// schema hamare
// What is Schema?
// Schema is the blueprint/rule of a document.
// hamare document ko ham phle yehi se validate krenge ki kesa hoga hamara document(data user kaa)
// example {
//   name: "Rohit",
//   accountNumber: 101,
//   city: "Dehradun",
//   age: 25,
//   balance: 5000
// }

// toh hum schema me bata denge name hoga accountNumber hoga city hoga extra
// and hum usko yehi validate kr denge kr denge ki name jo hoga woh string ka hoga and uski minlength hogi and maxLength itni hogi

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 20,
      trim: true, // (aage or piche kaa space remove kr do)
      required: true, //(mtlb ki yeh field require kr do ki name dalna toh jaruri h )
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
      min: 10,
      max: 60,
    },
    balance: {
      type: Number,
      min: 0,
      require: true,
    },
    accountType: {
      type: String,
      require: true,
    },
  },
  { timestamps: true },
);

const Customer = mongoose.model("Customer", userSchema);

export default Customer;

// timeStamps mtlb ki hum uske time time ko save krenge ki kab user ne data create kiya and kab update toh hamare pass me user kaa record rahega
