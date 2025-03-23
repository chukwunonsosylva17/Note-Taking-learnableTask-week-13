"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.checkPassword = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../models/user.model"));
const authService = __importStar(require("../services/auth.service"));
/**
 * Register a new user
 */
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully. Please log in.",
            user,
        });
    }
    catch (error) {
        console.error("Registration Error:", error.message);
        res.status(error.status || 500).json({
            success: false,
            message: error.message || "Registration failed",
        });
    }
});
exports.registerUser = registerUser;
/**
 * Login user and return JWT
 */
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const token = yield authService.loginUser(email, password);
        res.json({ token });
    }
    catch (error) {
        const err = error;
        const message = err.message.includes('Invalid email')
            ? 'Account not found'
            : err.message.includes('Invalid password')
                ? 'Incorrect password'
                : 'Authentication failed';
        res.status(401).json({
            status: 'error',
            message
        });
    }
    ;
});
exports.loginUser = loginUser;
/**
 * Check if password matches hashed password
 */
const checkPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { plainPassword, hashedPassword } = req.body;
    const match = yield bcrypt_1.default.compare(plainPassword, hashedPassword);
    res.json({ match });
});
exports.checkPassword = checkPassword;
/**
 * Reset user password
 */
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, newPassword } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    yield user_model_1.default.updateOne({ email }, { $set: { password: hashedPassword } });
    res.json({ message: 'Password updated successfully' });
});
exports.resetPassword = resetPassword;
