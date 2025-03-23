"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importDefault(require("mongoose"));
// Custom validator for MongoDB ObjectId
const objectIdSchema = joi_1.default.string().custom((value, helpers) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
    }
    return value;
}, "MongoDB ObjectId").required().messages({
    "string.empty": "{#label} is required",
    "any.invalid": "{#label} must be a valid MongoDB ObjectId"
});
// Alternative: Regex validation (if not using Mongoose)
// const objectIdSchema = Joi.string()
//   .pattern(/^[0-9a-fA-F]{24}$/)
//   .required()
//   .messages({
//     "string.empty": "{#label} is required",
//     "string.pattern.base": "{#label} must be a valid 24-character hex string"
//   });
exports.noteValidationSchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "string.empty": "Title is required"
    }),
    content: joi_1.default.string().required().messages({
        "string.empty": "Content is required"
    }),
    category: objectIdSchema.label("Category ID"),
    user: objectIdSchema.label("User ID")
});
// Example input data
const inputData = {
    title: "",
    content: "",
    category: "", // Example ObjectId
    user: "" // Example ObjectId
};
const validationResult = exports.noteValidationSchema.validate(inputData, { abortEarly: false });
if (validationResult.error) {
    console.error("Validation failed:", validationResult.error.details.map(err => err.message));
}
else {
    console.log("Validation passed:", validationResult.value);
}
