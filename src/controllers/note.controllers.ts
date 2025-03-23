
import { Request, Response, NextFunction } from "express";
import {
  getAllNotes,
  getNoteById,
  createNewNote,
  updateExistingNote,
  deleteNoteById,
  getNotesByCategory,
} from "../services/note.service";

import { AuthRequest } from "../interfaces/auth.interface";
import Note from "../models/note.model";


const sendErrorResponse = (res: Response, { status, message }: { status: number; message: string }) => res.status(status).json({ success: false, message });

const handleRequest = <T extends AuthRequest>(
  fn: (req: T, res: Response, next: NextFunction) => Promise<Response | void>
) => (req: T, res: Response, next: NextFunction) => {
  fn(req, res, next).catch(next);
};

/**
 * Get all notes for the authenticated user
 */
export const getNotes = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.user || !req.user._id) {
      sendErrorResponse(res, { status: 401, message: "Unauthorized" });
      return;
    }
    if (!req.user.userId) {
      sendErrorResponse(res, { status: 500, message: "User ID is missing" });
      return;
    }
    const notes = await Note.find({ user: req.user.userId });
    if (!notes) {
      sendErrorResponse(res, { status: 404, message: "No notes found" });
      return;
    }
    res.status(200).json(notes);
    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single note by ID
 */
export const getNote = handleRequest(async (req, res) => {
  if (!req.user || !req.user._id)
    return sendErrorResponse(res, { status: 401, message: "Unauthorized" });

  const noteId = req.params.id;
  if (!noteId) return sendErrorResponse(res, { status: 400, message: "Note ID is required" });

  const note = await getNoteById(noteId, req.user._id);
  if (!note) return sendErrorResponse(res, { status: 404, message: "Note not found" });

  return res.status(200).json({ success: true, note });
});

/**
 * Get notes by category for authenticated user
 */
export const getNotesByCategoryHandler = handleRequest(async (req, res) => {
  if (!req.user || !req.user._id)
    return sendErrorResponse(res, { status: 401, message: "Unauthorized" });

  const categoryId = req.params.categoryId;
  if (!categoryId)
    return sendErrorResponse(res, { status: 400, message: "Category ID is required" });

  const notes = await getNotesByCategory(categoryId, req.user._id);
  return res.status(200).json({ success: true, notes });
});

/**
 * Create a new note
 */
export const createNote = handleRequest(async (req, res) => {
  if (!req.user || !req.user._id)
    return sendErrorResponse(res, { status: 401, message: "Unauthorized" });

  const { title, content, category } = req.body;
  if (!title || !content || !category)
    return sendErrorResponse(res, { status: 400, message: "Title, content, and category are required" });

  const newNote = await createNewNote(title, content, category, req.user._id);
  return res.status(201).json({ success: true, note: newNote });
});

/**
 * Update an existing note
 */
export const updateNote = handleRequest(async (req, res) => {
  if (!req.user || !req.user._id)
    return sendErrorResponse(res, { status: 401, message: "Unauthorized" });

  const noteId = req.params.id;
  if (!noteId) return sendErrorResponse(res, { status: 400, message: "Note ID is required" });

  const { title, content, category } = req.body;
  if (!title && !content && !category)
    return sendErrorResponse(res, { status: 400, message: "At least one field is required for update" });

  const updatedNote = await updateExistingNote(
    noteId,
    req.user._id,
    title,
    content,
    category
  );
  if (!updatedNote)
    return sendErrorResponse(res, { status: 404, message: "Note not found or unauthorized" });

  return res.status(200).json({ success: true, note: updatedNote });
});

/**
 * Delete a note
 */
export const deleteNote = handleRequest(async (req, res) => {
  if (!req.user || !req.user._id)
    return sendErrorResponse(res, { status: 401, message: "Unauthorized" });

  const noteId = req.params.id;
  if (!noteId) return sendErrorResponse(res, { status: 400, message: "Note ID is required" });

  const deletedNote = await deleteNoteById(noteId, req.user._id);
  if (!deletedNote)
    return sendErrorResponse(res, { status: 404, message: "Note not found or unauthorized" });

  return res
    .status(200)
    .json({ success: true, message: "Note deleted successfully" });
});


// // src/controllers/notes.controller.ts
// import { RequestHandler } from 'express';
// import { NoteService } from '../services/note.service';
// import { z } from 'zod';
// import { validateRequest } from '../middleware/validation.middleware';
// import { NotFoundError } from '../utils/errorHandler';

// // Zod schemas for validation
// export const createNoteSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   content: z.string().min(1, "Content is required"),
//   categoryId: z.string().min(1, "Category ID is required")
// });

// export const updateNoteSchema = createNoteSchema.partial();

// // Controller methods

// export const getAllNotes: RequestHandler = async (req, res, next) => {
//   try {
//     const notes = await NoteService.getAllNotes();
//     res.json(notes);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getNoteById: RequestHandler = async (req, res, next) => {
//   try {
//     const note = await NoteService.getNoteById(req.params.id);
//     res.json(note);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateNote: RequestHandler = async (req, res, next) => {
//   try {
//     const note = await NoteService.updateNote(req.params.id, req.body);
//     res.json(note);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteNote: RequestHandler = async (req, res, next) => {
//   try {
//     await NoteService.deleteNote(req.params.id);
//     res.status(204).send();
//   } catch (error) {
//     next(error);
//   }
// };

// export const createNoteByCategory: RequestHandler = async (req, res, next) => {
//   try {
//     const note = await NoteService.createNote(req.body.categoryId);
//     res.status(201).json(note);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createNote: RequestHandler = async (req, res, next) => {
//   try {
//     const note = await NoteService.createNote(req.body.categoryId);
//     res.status(201).json(note);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getNotesByCategory: RequestHandler = async (req, res, next) => {
//   try {
//     if (!req.params.categoryId) {
//       return next(new NotFoundError('Category ID is required'));
//     }

//     const notes = await NoteService.getNotesByCategory(req.params.categoryId);

//     if (!notes) {
//       return next(new NotFoundError('No notes found'));
//     }

//     res.json(notes);
//   } catch (error) {
//     next(error);
//   }
// };

// // Route configuration
// export const noteRoutes = [
//   {
//     path: '/',
//     method: 'get',
//     handler: getAllNotes
//   },
//   {
//     path: '/:id',
//     method: 'get',
//     handler: getNoteById
//   },
//   {
//     path: '/:id',
//     method: 'post',
//     middleware: [validateRequest(createNoteSchema)],
//     handler: createNoteByCategory
//   },
//   {
//     path: '/:id',
//     method: 'post',
//     middleware: [validateRequest(createNoteSchema)],
//     handler: createNote
//   },
//   {
//     path: '/:id',
//     method: 'put',
//     middleware: [validateRequest(updateNoteSchema)],
//     handler: updateNote
//   },
//   {
//     path: '/:id',
//     method: 'delete',
//     handler: deleteNote
//   },
//   {
//     path: '/categories/:categoryId',
//     method: 'get',
//     handler: getNotesByCategory
//   }
// ];



// import { RequestHandler, Request, Response, NextFunction } from 'express';
// import Note from '../models/note.model';
// import { Category } from '../models/category.model'
// import { NotFoundError, ValidationError } from '../utils/errorHandler';
// import { z } from  'zod';

// // Zod schemas for validation
// export const noteSchema = z.object({
//   title: z.string().min(1),
//   content: z.string().min(1),
//   category: z.string().optional()
// });

// export const updateNoteSchema = noteSchema.partial();

// // Controller Methods

// // Get all notes
// export const getAllNotes = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//       const notes = await Note.find().sort({ updatedAt: -1 }).lean();

//       if (!notes) {
//           return next(new NotFoundError('No notes found'));
//       }

//       res.json({
//           status: 'success',
//           results: notes.length,
//           data: {
//               notes
//           }
//       });
//   } catch (error) {
//       next(error);
//   }
// };

// // Get a specific note
// export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//       const note = await Note.findById(req.params.id).lean();

//       if (!note) {
//           return next(new NotFoundError(`Note with ID ${req.params.id} not found`));
//       }

//       res.json({ status: 'success', data: { note } });
//   } catch (error) {
//       next(error);
//   }
// };

// // Create a new note
// export const createNote: RequestHandler = async (req, res, next) => {
//   try {
//       const { title, content, category } = req.body;

//       if (!title || !content) {
//           return next(new ValidationError('Title and content are required'));
//       }

//       const categoryExistsPromise = category ? Category.findById(category) : Promise.resolve(null);

//       const [categoryExists] = await Promise.all([categoryExistsPromise]);

//       if (category && !categoryExists) {
//           return next(new NotFoundError(`Category with ID ${category} not found`));
//       }

//       const newNote = await Note.create({
//           title,
//           content,
//           category: categoryExists ? categoryExists._id : undefined
//       });

//       res.status(201).json({
//           status: 'success',
//           data: { note: newNote }
//       });
//   } catch (error) {
//       next(error);
//   }
// };

// // Delete a note
// export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//       const note = await Note.findByIdAndDelete(req.params.id);

//       if (!note) {
//           return next(new NotFoundError(`Note with ID ${req.params.id} not found`));
//       }

//       res.status(204).json({ status: 'success', data: null });
//   } catch (error) {
//       next(error);
//   }
// };

// export const getNotesByCategory: RequestHandler = async (req, res, next) => {
//   try {
//       const category = await Category.findById(req.params.categoryId);
//       if (!category) throw new NotFoundError('Category not found');
  
//       const notes = await Note.find({ category: req.params.categoryId })
//           .populate('category')

//       res.json(notes);
//   } catch (error) {
//       next(error);
//   }
// };

// export const updateNote: RequestHandler = async (req, res, next) => {
//   try {
//       const note = await Note.findByIdAndUpdate(
//           req.params.id,
//           { new: true, runValidators: true }
//       ).populate('category');

//       if (!note) throw new NotFoundError('Note not found');
//       res.json(note);
//   } catch (error) {
//       next(error);
//   }
// };
