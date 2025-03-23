import mongoose from "mongoose";
import { Category } from "../models/category.model";

export const getAllCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("❌ Invalid ObjectId:", id);
    return null;
  }
  return await Category.findById(id);
};

export const createNewCategory = async (name: string, description: string) => {
  try {
    if (!name || !description) {
      console.error("❌ Name and description are required for category.");
      return null;
    }

    const category = new Category({ name, description });
    return await category.save();
  } catch (error) {
    console.error("❌ Error creating category:", error);
    throw error;
  }
};

export const updateCategoryById = async (
  id: string,
  name?: string,
  description?: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("❌ Invalid ObjectId:", id);
      return null;
    }

    const updateData: Record<string, any> = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    return await Category.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.error("❌ Error updating category:", error);
    throw error;
  }
};

export const deleteCategoryById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("❌ Invalid ObjectId:", id);
    return null;
  }
  return await Category.findByIdAndDelete(id);
};












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