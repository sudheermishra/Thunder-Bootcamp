import { redisClient } from "../config/redis.js";

const authenticateRateLimiter = async (req, resp, next) => {
  try {
    const userId = req.user._id.toString;
    const key = `rate-limit:user:${userId}`;

    const requestCount = await redisClient.incr(key);
    if (requestCount === 1) {
      await redisClient.expire(key, 60);
    }
    if (requestCount > 20) {
      const remainingTime = await redisClient.ttl(key);
      return resp.status(429).json({
        message: `Too Many Request try again after ${remainingTime} seconds`,
      });
    }
    next();
  } catch (error) {
    console.log("Authenticated rate limiter error:", error);
    next();
  }
};

export default authenticateRateLimiter;
