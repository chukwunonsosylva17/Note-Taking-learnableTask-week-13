"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNoteSchema = exports.categorySchema = exports.noteSchema = void 0;
// src/validation/schemas.ts
const joi_1 = __importDefault(require("joi"));
const mongodb_1 = require("mongodb");
exports.noteSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100).required().messages({
        'string.empty': 'Title is required',
        'string.min': 'Title must be at least {#limit} characters',
        'string.max': 'Title cannot exceed {#limit} characters'
    }),
    content: joi_1.default.string().min(10).required().messages({
        'string.empty': 'Content is required',
        'string.min': 'Content must be at least {#limit} characters'
    }),
    categoryId: joi_1.default.string()
        .custom((value, helpers) => {
        if (!mongodb_1.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    })
        .required()
        .messages({
        'any.invalid': 'Invalid category ID format',
        'any.required': 'Category ID is required'
    }),
    dueDate: joi_1.default.date().iso().greater('now').optional().messages({
        'date.base': 'Due date must be a valid date',
        'date.iso': 'Due date must be in ISO 8601 format',
        'date.greater': 'Due date must be in the future'
    })
});
exports.categorySchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least {#limit} characters',
        'string.max': 'Name cannot exceed {#limit} characters'
    }),
    color: joi_1.default.string()
        .pattern(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
        .default('#ffffff')
        .messages({
        'string.pattern.base': 'Color must be a valid hex code'
    })
});
exports.updateNoteSchema = exports.noteSchema.fork(['title', 'content', 'categoryId', 'dueDate'], (schema) => schema.optional());
