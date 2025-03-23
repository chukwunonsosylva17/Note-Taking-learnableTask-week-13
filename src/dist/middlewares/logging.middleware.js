"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = exports.requestLogger = void 0;
const requestLogger = (req, _res, next) => {
    console.log(`API Request: [${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
};
exports.requestLogger = requestLogger;
const loggerMiddleware = (req, _res, next) => {
    console.log(`[${Date.now()}] ${req.method} ${req.originalUrl}`);
    next();
};
exports.loggerMiddleware = loggerMiddleware;
