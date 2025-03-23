"use strict";
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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!process.env.JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
}
/**
 * Custom Error Class for better debugging
 */
class AuthError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
/**
 * Register a new user
 */
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = userData;
    if (!username || !email || !password) {
        throw new AuthError("All fields are required", 400);
    }
    const existingUser = yield user_model_1.default.findOne({ email });
    if (existingUser) {
        throw new AuthError("User already exists. Please log in.", 400);
    }
    // Hash password before saving
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    yield user_model_1.default.create({ email, password: hashedPassword });
    const newUser = new user_model_1.default({
        username,
        email,
        password: hashedPassword,
    });
    yield newUser.save();
    return newUser;
});
exports.registerUser = registerUser;
/**
 * Login user and return JWT token
 */ const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Login attempt for email:', email);
        const user = yield user_model_1.default.findOne({ email });
        console.log('User found:', user ? user.email : 'Not found');
        if (!user) {
            throw new Error('No user found with this email');
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        console.log('Password match:', isMatch);
        if (!isMatch) {
            throw new Error(' Invalid Password');
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    catch (error) {
        console.error('Authentication error:', error);
        throw new Error('Authentication failed');
    }
});
exports.loginUser = loginUser;
/**
 * Check if password matches hashed password
 */
const checkPassword = (plainPassword, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const match = yield bcrypt_1.default.compare(plainPassword, hashedPassword);
    return match;
});
exports.checkPassword = checkPassword;
/**
 * Reset user password
 */
const resetPassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
    yield user_model_1.default.updateOne({ email
    }, { $set: { password: hashedPassword } });
    return 'Password updated successfully';
});
exports.resetPassword = resetPassword;
