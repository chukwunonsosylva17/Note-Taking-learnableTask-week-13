"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailValidation = exports.passwordValidation = exports.loginValidation = exports.registerValidation = void 0;
const joi_1 = __importDefault(require("joi"));
// Schema for user registration validation
const registerSchema = joi_1.default.object({
    username: joi_1.default.string().trim().min(3).max(30).required(),
    email: joi_1.default.string().trim().lowercase().email().required(),
    password: joi_1.default.string().trim().min(6).required(),
});
// Schema for user login validation
const loginSchema = joi_1.default.object({
    email: joi_1.default.string().trim().lowercase().email().required(),
    password: joi_1.default.string().trim().required(),
});
// Middleware for validating registration
const registerValidation = (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({ success: false, message: "Request body is missing" });
        }
        const { error } = registerSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ success: false, errors: error.details });
        }
        next();
    }
    catch (err) {
        console.error("Validation error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
exports.registerValidation = registerValidation;
// Middleware for validating login
const loginValidation = (req, res, next) => {
    const { error } = loginSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ success: false, errors: error.details });
    }
    next();
};
exports.loginValidation = loginValidation;
// Schema for password validation
const passwordSchema = joi_1.default.object({
    plainPassword: joi_1.default.string().trim().required(),
    hashedPassword: joi_1.default.string().trim().required(),
});
// Middleware for validating password
const passwordValidation = (req, res, next) => {
    const { error } = passwordSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ success: false, errors: error.details });
    }
    next();
};
exports.passwordValidation = passwordValidation;
// Schema for email validation
const emailSchema = joi_1.default.object({
    email: joi_1.default.string().trim().lowercase().email().required(),
});
// Middleware for validating email
const emailValidation = (req, res, next) => {
    const { error } = emailSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ success: false, errors: error.details });
    }
    next();
};
exports.emailValidation = emailValidation;
