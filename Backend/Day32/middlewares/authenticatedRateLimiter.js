import { redis } from "../config/redis";

const authenticateRateLimiter = async (req, resp, next) => {
  try {
    const userId = req.user._id.toString;
    const key = `rate-limit:user:${userId}`;

    const requestCount = await redis.incr(key);
    if (requestCount === 1) {
      await redis.expire(key, 60);
    }
    if (requestCount > 20) {
      const remainingTime = await redis.ttl(key);
      return resp.status(429).json({
        message: `Too Many Request try after${remainingTime}`,
      });
    }
    next();
  } catch (error) {
    console.log("Authenticated rate limiter error:", error);
    next();
  }
};

export default authenticateRateLimiter;
