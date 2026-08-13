import express from "express";

const app = express();

app.use(express.json());

app.get("/user", (req, res) => {
  res.json({
    message: "Hello from Server 3",
    port: 3003,
  });
});
app.listen(3003, () => {
  console.log("server is listening on port number 3003");
});
