"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error("❌ Error:", err.message || err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json(Object.assign({ success: false, message: err.message || "Internal Server Error" }, (process.env.NODE_ENV === "development" && { stack: err.stack })));
    // For unexpected errors
    console.error('ERROR: ', err);
    return res.status(500).json({
        status: 'error',
        message: 'Something went wrong'
    });
};
exports.errorHandler = errorHandler;
