import express from "express";
import mongoose from "mongoose";
import Customer from "./buildSchema.js";
import Users from "./data.js";
const app = express();

await mongoose.connect(
  "mongodb+srv://sudheermishra8587_db_user:VA9ahO4DxnWjsscz@cluster0.ffdlxjb.mongodb.net/Thunder",
);

app.use(express.json());

// create user
app.post("/customer", async (req, resp) => {
  const body = req.body;
  // await isliye q ki database me jaake create krega toh time lagega
  const customer = await Customer.create(body);
  resp.json({
    message: "user is created sucessfully",
    customer: customer,
  });
});

//create user in bulk
app.post("/customer/bulk", async (req, resp) => {
  const customer = await Customer.insertMany(Users);
  resp.json({
    message: "User is created Successfully",
    customer: customer,
  });
});

// get information of all the customer
app.get("/customer", async (req, resp) => {
  const customer = await Customer.find();
  resp.json({ message: "All user information is here", customer: customer });
});

//filter by query params isko hum "/customer/:accountNumber" ise upper likhenge q ki agar  "/customer/:accountNumber" yeh rahega and humne request kri ispe "/customer/filter" ispe toh req upper wale p jayegi q ki :accountNumber dynamic h toh node isko prefernec degi

app.get("/customer/filter", async (req, resp) => {
  //   const {name,city,age,balance} = req.query;
  //   query me store toh as a object form me ho raa h    // req.query = {city: "Banglore", accountType: "current"}
  // toh hum req.query direct pass kr denge destructure krni ki jarut nhi h

  const customer = await Customer.find(req.query);
  resp.json({
    customer: customer,
  });
});

// fetch particular customer information on the basis of its accountNumber (params)
app.get("/customer/:accountNumber", async (req, resp) => {
  const accountValue = req.params.accountNumber;
  const customer = await Customer.findOne({ accountNumber: accountValue });

  if (!customer) {
    resp.json({
      message: "Customer Doesnt exist",
    });
  } else {
    resp.json({
      message: "Customer information",
      customer: customer,
    });
  }
});

//delete user on the basis of their account Number

app.delete("/customer/:accountNumber", async (req, resp) => {
  const accountValue = req.params.accountNumber;
  const customer = await Customer.findOneAndDelete({
    accountNumber: accountValue,
  });
  if (!customer) {
    resp.json({
      message: "Customer Doesnt exist",
    });
  } else {
    resp.json({
      message: "Customer  deleted",
      customer: customer,
    });
  }
});

// Update the city of the user

app.patch("/customer/:accountNumber", async (req, resp) => {
  const { city, age } = req.body;
  // findoneandUpdate phle args hume fine krenge params ke basis pe Customer collection me jaake accountnumber key ki cvalue parmas value se equal krke duhnd lega
  //second args lega jo hume update krna h
  const customer = await Customer.findOneAndUpdate(
    { accountNumber: accountNumber },
    { $set: { city: city, age: age } },
    { new: true },
  );

  resp.json(customer);
});

app.listen(3000, () => {
  console.log("server is listening on port number 3000");
});
