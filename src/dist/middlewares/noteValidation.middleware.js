"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNote = void 0;
const note_validation_1 = require("../validations/note.validation");
const validateNote = (req, res, next) => {
    var _a, _b;
    try {
        // Ensure the user is authenticated
        if (!req.user || (!req.user._id && !req.user.userId)) {
            res.status(401).json({
                success: false,
                message: "Unauthorized: User ID is missing",
            });
        }
        // Convert user ID to string and assign it to req.body
        if (req.user) {
            req.body.user = ((_a = req.user._id) === null || _a === void 0 ? void 0 : _a.toString()) || ((_b = req.user.userId) === null || _b === void 0 ? void 0 : _b.toString());
        }
        // Validate request body
        const { error, value } = note_validation_1.noteValidationSchema.validate(req.body, {
            abortEarly: false, // Show all validation errors at once
            stripUnknown: true, // Remove unknown fields
        });
        if (error) {
            const validationErrorResponse = {
                success: false,
                errors: error.details.map((detail) => ({
                    field: detail.path.join("."),
                    message: detail.message,
                })),
            };
            res.status(400).json(validationErrorResponse);
        }
        req.body = value; // Assign validated data
        next();
    }
    catch (err) {
        console.error("Validation Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error during validation",
        });
    }
};
exports.validateNote = validateNote;
// /**
//  * Validates a request body against a Zod schema.
//  * @param {ZodSchema<T>} schema - The Zod schema to validate against.
//  * @returns {RequestHandler} - A middleware function that validates the request body.
//  */
// export const validateRequest =
//   <T>(schema: ZodSchema<T>): RequestHandler =>
//   (req: Request, res: Response, next: NextFunction): void => {
//     const { body } = req;
//     if (!body) {
//       return next(new ValidationError('No request body'));
//     }
//     try {
//       schema.parse(body);
//       next();
//     } catch (error) {
//       if (error instanceof ValidationError) {
//         return next(error);
//       }
//       next(new ValidationError('Invalid request body'));
//     }
//   };
