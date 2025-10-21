import express from 'express'
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import rateLimiterMiddleware from './rate.limiter.js';

const middleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use('/api/', rateLimiterMiddleware);
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        credentials: true
    }));
}
export default middleware;

