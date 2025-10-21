class AppError extends Error {
    constructor(statusCode, message = 'Something went wrong', errors = null, stack = null) {
        super(message);
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.statusCode = statusCode;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default AppError;
export const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const isOperational = `${statusCode}`.startsWith('4');
    res.status(statusCode).json({
        status: isOperational ? 'fail' : 'error',
        statusCode,
        message: err.message || 'Internal Server Error',
        errors: err.errors || undefined,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};
export const handleNotFound = (req, res, next) => {
    const statusCode = 404;
    res.status(statusCode).json({
        status: 'fail',
        statusCode: statusCode,
        message: `Cannot method:${req.method} URL:${req.originalUrl} not found.`,
    });
    next();
};