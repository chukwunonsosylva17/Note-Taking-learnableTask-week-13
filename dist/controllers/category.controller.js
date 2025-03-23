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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const category_model_1 = require("../models/category.model");
// 📌 Create a New Category
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            res
                .status(400)
                .json({ success: false, message: "Name and description are required" });
            return;
        }
        const category = new category_model_1.Category({ name, description });
        yield category.save();
        res.status(201).json({ success: true, data: category });
    }
    catch (error) {
        next(error);
    }
});
exports.createCategory = createCategory;
// 📌 Get All Categories
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_model_1.Category.find();
        res.status(200).json({ success: true, data: categories });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCategories = getAllCategories;
// 📌 Get a Single Category by ID
const getCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.Category.findById(req.params.id);
        if (!category) {
            res.status(404).json({ success: false, message: "Category not found" });
            return;
        }
        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        next(error);
    }
});
exports.getCategoryById = getCategoryById;
// 📌 Update a Category by ID
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        if (!name && !description) {
            res.status(400).json({
                success: false,
                message: "At least one field (name or description) is required",
            });
            return;
        }
        const updateData = {};
        if (name)
            updateData.name = name;
        if (description)
            updateData.description = description;
        const category = yield category_model_1.Category.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true, runValidators: true });
        if (!category) {
            res.status(404).json({ success: false, message: "Category not found" });
            return;
        }
        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategory = updateCategory;
// 📌 Delete a Category by ID
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield category_model_1.Category.findByIdAndDelete(req.params.id);
        if (!category) {
            res.status(404).json({ success: false, message: "Category not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Category deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategory = deleteCategory;
// import { RequestHandler } from 'express';
// import { CategoryService } from '../services/category.service';
// import { validateRequest } from '../middleware/validation.middleware';
// import { NoteService } from '../services/note.service';
// import { z } from 'zod';
// // Zod schema for validation
// export const createCategorySchema = z.object({
//   name: z.string().min(1, "Category name is required"),
//   color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color code")
//     .default('#ffffff')
// });
// export const createCategory: RequestHandler = async (req, res, next) => {
//   try {
//     const category = await CategoryService.createCategory(req.body);
//     res.status(201).json(category);
//   } catch (error) {
//     next(error);
//   }
// };
// // export const createNote: RequestHandler = async (req, res, next) => {
// //   try {
// //     const note = await CategoryService.createNote(req.body.categoryId);
// //     res.status(201).json(note);
// //   } catch (error) {
// //     next(error);
// //   }
// // };
// export const createNoteByCategory: RequestHandler = async (req, res, next) => {
//   try {
//     const notes = await NoteService.createNote(req.body.categoryId);
//     res.status(201).json(notes);
//   } catch (error) {
//     next(error);
//   }
// };
// export const getAllCategories: RequestHandler = async (req, res, next) => {
//   try {
//     const category = await CategoryService.getAllCategories();
//     res.status(201).json(category);
//   } catch (error) {
//     next(error);
//   }
// };
// export const getCategoryById: RequestHandler = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const category = await CategoryService.getCategoryById(id);
//     res.status(201).json(category);
//   } catch (error) {
//     next(error);
//   }
// };
// export const updateCategory: RequestHandler = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const category = await CategoryService.updateCategory(id, req.body);
//     res.status(201).json(category);
//   } catch (error) {
//     next(error);
//   }
// };
// export const deleteCategory: RequestHandler = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const category = await CategoryService.deleteCategory(id);
//     res.status(201).json(category);
//   } catch (error) {
//     next(error);
//   }
// };
// export const  categoryRoutes = [
//    {
//       path: '/',
//       method: 'get',
//       handler: getAllCategories
//     },
//     {
//       path: '/:id',
//       method: 'get',
//       handler: getCategoryById
//     },
//     {
//         path: '/:id',
//         method: 'post',
//         handler: createNoteByCategory
//       },
//   {
//     path: '/',
//     method: 'post',
//     middleware: [validateRequest(createCategorySchema)],
//     handler: createCategory
//   }, 
//    {
//       path: '/:id',
//       method: 'put',
//       middleware: [validateRequest(createCategorySchema)],
//       handler: updateCategory
//     },
//     {
//       path: '/:id',
//       method: 'delete',
//       handler: deleteCategory
//     },
// ];
