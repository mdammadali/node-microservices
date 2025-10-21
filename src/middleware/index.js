import express from 'express'
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later'
});

const middleware = (app) => {
    app.use(express.json());
    app.use(helmet());
    app.use(apiLimiter);
}
export default middleware;

