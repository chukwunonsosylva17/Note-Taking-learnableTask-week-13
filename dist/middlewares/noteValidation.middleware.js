"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNote = void 0;
const note_validation_1 = require("../validations/note.validation");
const validateNote = (req, res, next) => {
    const { error, value } = note_validation_1.noteValidationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });
    if (error) {
        res.status(400).json({
            success: false,
            errors: error.details.map((detail) => detail.message),
        });
        return;
    }
    req.body = value;
    next();
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
