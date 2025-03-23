"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validateIdParam = void 0;
const category_validation_1 = require("../validations/category.validation");
const validateIdParam = (req, res, next) => {
    const { error } = category_validation_1.idParamSchema.validate({ id: req.params.id });
    if (error) {
        res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
        return;
    }
    next();
};
exports.validateIdParam = validateIdParam;
// export const validate = (schema: Joi.Schema) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     const { error } = schema.validate(req.body, {
//       abortEarly: false,
//       allowUnknown: false
//     });
const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            const errors = error.details.map((detail) => ({
                field: detail.path[0],
                message: detail.message
            }));
            res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors
            });
            return;
        }
        next();
    };
};
exports.validate = validate;
