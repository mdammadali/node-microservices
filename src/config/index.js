import dotenv from 'dotenv';
dotenv.config();

const baseConfig = {
    port: process.env.PORT || 8000,
    mongoDBUri: 'mongodb://localhost:27017/microservices',
    jwtSecret: process.env.JWT_SECRET || 'a_very_secure_default_secret_for_jwt_development',
    rateLimit: {
        windowMs: 15 * 60 * 1000,
        max: 100,
        message: 'Too many requests from this IP, please try again after some time.'
    },
    serviceRegistry: {
        userService: 'http://localhost:3001',
        productService: 'http://localhost:3002',
        orderService: 'http://localhost:3003',
        cartService: 'http://localhost:3004',
        authService: 'http://localhost:3005',
        paymentService: 'http://localhost:3006'
    },
    logging: {
        level: 'info',
        transports: {
            console: true
        }
    }
}
const configs = {
    ...baseConfig
}
export default configs