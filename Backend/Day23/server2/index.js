import express from "express";

const app = express();

app.use(express.json());

app.get("/user", (req, res) => {
  res.json({
    message: "Hello from Server 2",
    port: 3002,
  });
});
app.listen(3002, () => {
  console.log("server is listening on port number 3002");
});
