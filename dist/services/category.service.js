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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategoryById = exports.updateCategoryById = exports.createNewCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const category_model_1 = require("../models/category.model");
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield category_model_1.Category.find();
    }
    catch (error) {
        console.error("❌ Error fetching categories:", error);
        throw error;
    }
});
exports.getAllCategories = getAllCategories;
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        console.error("❌ Invalid ObjectId:", id);
        return null;
    }
    return yield category_model_1.Category.findById(id);
});
exports.getCategoryById = getCategoryById;
const createNewCategory = (name, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!name || !description) {
            console.error("❌ Name and description are required for category.");
            return null;
        }
        const category = new category_model_1.Category({ name, description });
        return yield category.save();
    }
    catch (error) {
        console.error("❌ Error creating category:", error);
        throw error;
    }
});
exports.createNewCategory = createNewCategory;
const updateCategoryById = (id, name, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            console.error("❌ Invalid ObjectId:", id);
            return null;
        }
        const updateData = {};
        if (name)
            updateData.name = name;
        if (description)
            updateData.description = description;
        return yield category_model_1.Category.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
    }
    catch (error) {
        console.error("❌ Error updating category:", error);
        throw error;
    }
});
exports.updateCategoryById = updateCategoryById;
const deleteCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        console.error("❌ Invalid ObjectId:", id);
        return null;
    }
    return yield category_model_1.Category.findByIdAndDelete(id);
});
exports.deleteCategoryById = deleteCategoryById;
// import { Category } from '../models/category.model';
// import  Note  from '../models/note.model';
// import { CreateCategoryInput, UpdateCategoryInput, CategoryDocument, CreateNoteInput, NoteDocument } from './type.service';
// //import { NotFoundError, ValidationError } from '../utils/errorHandler';
// export class CategoryService {
//   /**
//    * Create new category with unique name validation
//    */
//   static async createCategory(input: CreateCategoryInput): Promise<CategoryDocument> {
//     const existing = await Category.findOne({ name: input.name });
//     if (existing) {
//       throw new ValidationError('Category name already exists');
//     }
//     const category = new Category({
//       name: input.name,
//       color: input.color || '#ffffff'
//     });
//     await category.save();
//     return category;
//   }
// // Create new Note With Category
//       static async createNote(input: CreateNoteInput): Promise<NoteDocument> {
//           const category = await Category.findById(input.categoryId);
//           if (!category) {
//               throw new ValidationError('Invalid category ID');
//           }
//           const note = new Note({
//               title: input.title,
//               content: input.content,
//               category: input.categoryId
//           });
//           await note.save();
//           return note.populate('category');
//       }
//   /**
//    * Get all categories
//    */
//   static async getAllCategories(): Promise<CategoryDocument[]> {
//     return Category.find().sort({ name: 1 }).exec();
//   }
//   /**
//    * Get single category by ID
//    */
//   static async getCategoryById(id: string): Promise<CategoryDocument> {
//     const category = await Category.findById(id);
//     if (!category) throw new NotFoundError('Category not found');
//     return category;
//   }
//   /**
//    * Update category
//    */
//   static async updateCategory(
//     id: string,
//     input: UpdateCategoryInput
//   ): Promise<CategoryDocument> {
//     if (input.name) {
//       const existing = await Category.findOne({ name: input.name });
//       if (existing && existing.id !== id) {
//         throw new ValidationError('Category name already exists');
//       }
//     }
//     const category = await Category.findByIdAndUpdate(id, input, {
//       new: true,
//       runValidators: true
//     });
//     if (!category) throw new NotFoundError('Category not found');
//     return category;
//   }
//   /**
//    * Delete category only if not used in notes
//    */
//   static async deleteCategory(id: string): Promise<void> {
//     const notesCount = await Note.countDocuments({ category: id });
//     if (notesCount > 0) {
//       throw new ValidationError('Cannot delete category with associated notes');
//     }
//     const result = await Category.findByIdAndDelete(id);
//     if (!result) throw new NotFoundError('Category not found');
//   }
//   static async getCategoryCount(): Promise<number> {
//     return Category.countDocuments().exec();
//   }
// }
