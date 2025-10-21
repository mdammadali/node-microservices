import express from 'express';
import httpStatus from 'http-status'
import ApiResponse from '../utils/api.response.js';
const router = express.Router();
router.get('/home', (req, res) => {
    res.status(httpStatus.OK).json(
        new ApiResponse(httpStatus.OK, 'All users data')
    )
});
export default router;