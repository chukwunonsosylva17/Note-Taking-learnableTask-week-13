import { Request, Response, NextFunction } from "express";
import   { Category } from "../models/category.model";

// 📌 Create a New Category
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res
        .status(400)
        .json({ success: false, message: "Name and description are required" });
      return;
    }
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// 📌 Get All Categories
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// 📌 Get a Single Category by ID
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// 📌 Update a Category by ID
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description } = req.body;
    if (!name && !description) {
      res.status(400).json({
        success: false,
        message: "At least one field (name or description) is required",
      });
      return;
    }
    const updateData: Record<string, any> = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// 📌 Delete a Category by ID
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};


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

