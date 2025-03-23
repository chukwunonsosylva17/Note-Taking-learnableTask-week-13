"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = void 0;
const category_validation_1 = require("../validations/category.validation");
const validateCategory = (req, res, next) => {
    const { error, value } = category_validation_1.categoryValidationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });
    if (error) {
        res.status(400).json({
            success: false,
            errors: error.details.map((detail) => detail.message),
        });
        return; // Explicitly return to prevent further execution
    }
    req.body = value;
    next(); // Ensure next() is always called
};
exports.validateCategory = validateCategory;
