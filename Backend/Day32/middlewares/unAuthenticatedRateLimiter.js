import { redisClient } from "../config/redis.js";

const unAuthenticateRateLimiter = async (req, resp, next) => {
  try {
    const key = `rate-limit:ip: ${req.ip}`;
    const requestCount = await redisClient.incr(key);

    if (requestCount === 1) {
      await redisClient.expire(key, 60);
    }

    if (requestCount > 10) {
      const remainingTime = await redisClient.ttl(key);

      return resp.status(429).json({
        message: `Too many requests. Try again after ${remainingTime} seconds.`,
      });
    }

    next();
  } catch (error) {
    console.log("unAuthenticated rate limiter error:", error);
    next();
  }
};

export default unAuthenticateRateLimiter;
