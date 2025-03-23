"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.idParamSchema = exports.categoryValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Schema for validating category creation
exports.categoryValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(2).max(50).trim().messages({
        "string.base": "Name must be a string",
        "string.empty": "Name is required",
        "string.min": "Name must be at least {#limit} characters long",
        "string.max": "Name cannot exceed {#limit} characters",
        "any.required": "Name is required",
    }),
    description: joi_1.default.string().required().min(10).max(500).trim().messages({
        "string.base": "Description must be a string",
        "string.empty": "Description is required",
        "string.min": "Description must be at least {#limit} characters long",
        "string.max": "Description cannot exceed {#limit} characters",
        "any.required": "Description is required",
    }),
});
// Schema for validating category ID
exports.idParamSchema = joi_1.default.object({
    id: joi_1.default.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
        "string.base": "ID must be a string",
        "string.pattern.base": "ID must be a valid MongoDB ObjectId",
        "any.required": "ID is required",
    }),
});
