import Joi, { CustomHelpers, StringSchema } from 'joi';
import mongoose from'mongoose';

// Custom validator for MongoDB ObjectId
const objectIdSchema: StringSchema = Joi.string().custom((value: string, helpers: CustomHelpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
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

export const noteValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required"
  }),
  content: Joi.string().required().messages({
    "string.empty": "Content is required"
  }),
  category: objectIdSchema.label("Category ID"),
  user: objectIdSchema.label("User ID")
});

// Example input data
const inputData = {
  title: "",
  content: "",
  category: "",         // Example ObjectId
  user: ""              // Example ObjectId
};

const validationResult = noteValidationSchema.validate(inputData, { abortEarly: false });
if (validationResult.error) {
  console.error("Validation failed:", validationResult.error.details.map(err => err.message));
} else {
  console.log("Validation passed:", validationResult.value);
}

