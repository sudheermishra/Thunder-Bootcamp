import { redis } from "../config/redis.js";

const unAuthenticateRateLimiter = async (req, resp, next) => {
  try {
    const key = `rate-limit:ip: ${req.ip}`;
    const requestCount = await redis.incr(key);

    if (requestCount === 1) {
      await redis.expire(key, 60);
    }

    if (requestCount > 10) {
      const remainingTime = await redis.ttl(key);

      return resp.status(429).json({
        message: `Too Many Request try after${remainingTime}`,
      });
    }

    next();
  } catch (error) {
    console.log("unAuthenticated rate limiter error:", error);
    next();
  }
};

export default unAuthenticateRateLimiter;
