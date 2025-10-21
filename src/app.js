import httpStatus from 'http-status';
import express from 'express'
import middleware from './middleware/index.js';
import ApiResponse from './utils/api.response.js';
import routes from './routes/index.js'
import { handleError, handleNotFound } from './utils/error.handler.js';
const app = express();
middleware(app);
app.use('/', routes);
app.get('/', (req, res) => {
    res.status(httpStatus.OK).json(
        new ApiResponse(httpStatus.OK, 'Welcome to the microservices API')
    )
});
app.get('/health', (req, res) => res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, 'Microservices API is running')));
app.use(handleNotFound);
app.use(handleError);
export default app;