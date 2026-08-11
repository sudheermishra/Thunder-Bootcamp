import express from "express";
import config from "./config.js";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: `Hello from ${config.appName}`,
    environment: config.environment,
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is healthy",
  });
});

app.listen(config.port, () => {
  console.log(`${config.appName} running on port ${config.port}`);
});
