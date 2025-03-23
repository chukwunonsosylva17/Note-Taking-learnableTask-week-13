"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = exports.requestLogger = void 0;
const requestLogger = (req, res, next) => {
    if (!req || !req.method || !req.path) {
        console.error('API Request: Missing required request information');
        return next(new Error('Missing required request information'));
    }
    const log = {
        method: req.method,
        path: req.path,
        timestamp: new Date(),
    };
    console.log('API Request:', log);
    next();
};
exports.requestLogger = requestLogger;
const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    next();
};
exports.loggerMiddleware = loggerMiddleware;
