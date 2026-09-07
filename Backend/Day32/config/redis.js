import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS });

redis.on("error", (err) => console.log("Redis Client Error", err));

const connectRedis = async () => {
  await redis.connect();
  console.log("Redis Database connected successfully");
};

export { redis, connectRedis };
