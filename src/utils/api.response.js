class ApiResponse {
    constructor(statusCode, message = 'Success', data = null) {
        this.status = statusCode < 400;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}

export default ApiResponse;