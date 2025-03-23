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
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const JWT_SECRET = process.env.JWT_SECRET;
// Ensure JWT_SECRET exists before starting the server
if (!JWT_SECRET) {
    console.error(" Missing JWT_SECRET in environment variables. Exiting...");
    process.exit(1);
}
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
        if (!token) {
            res
                .status(401)
                .json({ success: false, message: "No token provided" });
        }
        if (!token) {
            res.status(401).json({ success: false, message: "No token provided" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        if (!(decoded === null || decoded === void 0 ? void 0 : decoded.userId)) {
            res.status(401).json({ success: false, message: "Invalid token" });
        }
        const user = yield user_model_1.default.findById(decoded.userId).select("-password");
        if (!user) {
            res
                .status(401)
                .json({ success: false, message: "User not found" });
        }
        if (user) {
            req.user = user; // Attach user to request
            next(); // Proceed to next middleware
        }
        else {
            res.status(401).json({ success: false, message: "User not found" });
        }
        next(); // Proceed to next middleware
    }
    catch (error) {
        console.error(" Authentication error:", error);
        let message = "Server error";
        if (error instanceof Error) {
            if (error.name === "TokenExpiredError")
                message = "Token expired";
            if (error.name === "JsonWebTokenError")
                message = "Invalid token";
        }
        res.status(401).json({ success: false, message });
    }
    next();
});
exports.authenticateUser = authenticateUser;
