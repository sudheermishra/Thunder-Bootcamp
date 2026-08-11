import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  appName: process.env.APP_NAME || "Node App",
  environment: process.env.ENVIRONMENT || "development",
};

export default config;
