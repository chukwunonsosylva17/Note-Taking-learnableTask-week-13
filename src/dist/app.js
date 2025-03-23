"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const logging_middleware_1 = require("./middlewares/logging.middleware");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const note_route_1 = __importDefault(require("./routes/note.route"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const category_route_1 = __importDefault(require("./routes/category.route"));
const errorHandler_1 = require("./utils/errorHandler");
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const logging_middleware_2 = require("./middlewares/logging.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(logging_middleware_1.requestLogger);
app.use(logging_middleware_2.loggerMiddleware);
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// API Routes
app.use('/', index_route_1.default);
app.use("/api/notes", note_route_1.default);
app.use('/api/categories', category_route_1.default);
app.use("/api/users", auth_route_1.default);
// Global Route Error Handling 
app.all('*', (req, res, next) => {
    next(new errorHandler_1.NotFoundError(`Cannot find ${req.originalUrl} on this server`));
});
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Error: ${err.message}`);
    const statusCode = err instanceof errorHandler_1.NotFoundError ? 404 :
        err.name === 'ValidationError' ? 400 :
            500;
    res.status(statusCode).json(Object.assign({ status: 'error', message: err.message }, (process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        errorType: err.name
    })));
});
app.use(errorHandler_middleware_1.errorHandler);
exports.default = app;
