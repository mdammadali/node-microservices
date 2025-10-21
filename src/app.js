import httpStatus from 'http-status';
import express from 'express'
import serviceProxyRoutes from './routes/service.proxy.routes.js';
import middleware from './middleware/index.js';
import ApiResponse from './utils/api.response.js';
import { errorHandlerMiddleware, handleNotFound } from './utils/error.handler.js';
const app = express();
middleware(app);
app.get('/health', (req, res) => res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, 'Microservices API is running')));
app.get('/', (req, res) => {
    res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, 'Main route'));
});
app.use(serviceProxyRoutes);
app.use(handleNotFound);
app.use(errorHandlerMiddleware);
export default app;