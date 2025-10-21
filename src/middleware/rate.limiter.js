import rateLimit from 'express-rate-limit'
import configs from '../config/index.js'
const rateLimitConfig = configs.rateLimit;

const rateLimiterMiddleware = rateLimit({
    windowMs: rateLimitConfig.windowMs,
    max: rateLimitConfig.max,
    message: rateLimitConfig.message,
    headers: true,
    // store: new RedisStore({
    //   client: redisClient,
    //   expiry: rateLimitConfig.windowMs / 1000 // In seconds
    // })
});

export default rateLimiterMiddleware