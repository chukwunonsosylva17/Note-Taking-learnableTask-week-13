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
exports.loginUser = exports.registerUser = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const secretKey = crypto_1.default.randomBytes(10).toString('hex');
console.log(secretKey);
if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
}
/**
 * Register a new user
 */
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            res
                .status(400)
                .json({ success: false, message: "All fields are required" });
            return; // Ensure function execution stops here
        }
        const existingUser = yield user_model_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "User already exists. Please log in.",
            });
            return;
        }
        const newUser = new user_model_1.default({ username, email, password });
        yield newUser.save();
        res.status(201).json({
            success: true,
            message: "User registered successfully. Please login using your email and password to obtain a token.",
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Registration failed", error });
    }
});
exports.registerUser = registerUser;
/**
 * Login user and return JWT
 */
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({
                success: false,
                message: "User not found. Please register first before attempting to log in.",
            });
            return;
        }
        if (!(yield user.comparePassword(password))) {
            res.status(401).json({
                success: false,
                message: "Invalid email or password. Please try again.",
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, {
            expiresIn: "1h",
        });
        res
            .status(200)
            .json({ success: true, message: "Login successful.", token });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Login failed", error });
    }
});
exports.loginUser = loginUser;
