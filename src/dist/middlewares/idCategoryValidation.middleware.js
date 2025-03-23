"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = void 0;
const category_validation_1 = require("../validations/category.validation");
const validateIdParam = (req, res, next) => {
    const { error } = category_validation_1.idParamSchema.validate({ id: req.params.id });
    if (error) {
        res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
        return Promise.resolve();
    }
    next();
    return Promise.resolve();
};
exports.validateIdParam = validateIdParam;
