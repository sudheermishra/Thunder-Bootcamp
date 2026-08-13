import express from "express";

const app = express();

app.use(express.json());

app.get("/user", (req, res) => {
  res.json({
    message: "Hello from Server 1",
    port: 3001,
  });
});

app.listen(3001, () => {
  console.log("server is listening on port number 3001");
});
