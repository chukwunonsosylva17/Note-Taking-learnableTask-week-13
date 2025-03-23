import mongoose from "mongoose";
import Note from "../models/note.model";

/**
 * Fetch all notes for a specific user.
 */
export const getAllNotes = async (userId: string) => {
  try {
    return await Note.find({ user: userId }).populate("category");
  } catch (error) {
    console.error(` Error fetching notes for user ${userId}:`, error);
    throw error;
  }
};

/**
 * Fetch a single note by ID and user.
 */
export const getNoteById = async (id: string, userId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(` Invalid Note ID: ${id}`);
      return null;
    }

    return await Note.findOne({ _id: id, user: userId }).populate("category");
  } catch (error) {
    console.error(` Error fetching note ${id}:`, error);
    throw error;
  }
};

/**
 * Fetch notes belonging to a specific category for a user.
 */
export const getNotesByCategory = async (
  categoryId: string,
  userId: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      console.error(` Invalid Category ID: ${categoryId}`);
      return [];
    }

    return await Note.find({ category: categoryId, user: userId }).populate(
      "category"
    );
  } catch (error) {
    console.error(` Error fetching notes for category ${categoryId}:`, error);
    throw error;
  }
};

/**
 * Create a new note.
 */
export const createNewNote = async (
  title: string,
  content: string,
  categoryId: string,
  userId: string
) => {
  try {
    if (!title || !content) {
      console.error(" Title and content are required.");
      return null;
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      console.error(` Invalid Category ID: ${categoryId}`);
      return null;
    }

    const newNote = new Note({
      title,
      content,
      category: categoryId,
      user: userId,
    });
    return await newNote.save();
  } catch (error) {
    console.error(" Error creating new note:", error);
    throw error;
  }
};

/**
 * Update an existing note.
 */
export const updateExistingNote = async (
  id: string,
  userId: string,
  title?: string,
  content?: string,
  categoryId?: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(` Invalid Note ID: ${id}`);
      return null;
    }

    const updateData: Partial<{
      title: string;
      content: string;
      category: mongoose.Types.ObjectId;
    }> = {};
    if (title) updateData.title = title;
    if (content) updateData.content = content;
    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
      updateData.category = new mongoose.Types.ObjectId(categoryId);
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: id, user: userId },
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate("category");

    if (!updatedNote) {
      console.error(` Note not found or unauthorized access: ${id}`);
      return null;
    }

    return updatedNote;
  } catch (error) {
    console.error(` Error updating note ${id}:`, error);
    throw error;
  }
};

/**
 * Delete a note by ID.
 */
export const deleteNoteById = async (id: string, userId: string) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error(` Invalid Note ID: ${id}`);
      return null;
    }

    const deletedNote = await Note.findOneAndDelete({ _id: id, user: userId });

    if (!deletedNote) {
      console.error(` Note not found or unauthorized access: ${id}`);
      return null;
    }

    return deletedNote;
  } catch (error) {
    console.error(` Error deleting note ${id}:`, error);
    throw error;
  }
};

// import Category from '../models/note.model';
// import Note from '../models/note.model'
// import { CreateNoteInput, UpdateNoteInput, NoteDocument } from './type.service';
// import { INote } from '../interfaces/noteInterface'
// import { NotFoundError, ValidationError } from '../utils/errorHandler';


// export class NoteService {
//     /**
//      * Create a new note with category validation
//      */
//     static async createNote(input: CreateNoteInput): Promise<NoteDocument> {
//         const category = await Category.findById(input.categoryId);
//         if (!category) {
//             throw new ValidationError('Invalid category ID');
//         }

//         const note = new Note({
//             title: input.title,
//             content: input.content,
//             category: input.categoryId
//         });

//         await note.save();
//         return note.populate('category');
//     }

//     /**
//      * Get all notes with category population
//      */
//     static async getAllNotes(): Promise<NoteDocument[]> {
//         return Note.find()
//             .populate('category')
//             .sort({ createdAt: -1 })
//             .exec();
//     }

//     /**
//      * Get single note by ID
//      */
//     static async getNoteById(id: string): Promise<NoteDocument> {
//         const note = await Note.findById(id).populate('category');
//         if (!note) throw new NotFoundError('Note not found');
//         return note;
//     }

//     /**
//      * Update existing note
//      */
//     static async updateNote(
//         id: string,
//         input: UpdateNoteInput
//     ): Promise<NoteDocument> {
//         const update: Partial<INote> = {
//             ...input,
//             updatedAt: new Date()
//         };

//         if (input.categoryId) {
//             const category = await Category.findById(input.categoryId);
//             if (!category) throw new ValidationError('Invalid category ID');
//             update.category = input.categoryId;
//         }

//         const note = await Note.findByIdAndUpdate(id, update, {
//             new: true,
//             runValidators: true
//         }).populate('category');

//         if (!note) throw new NotFoundError('Note not found');
//         return note;
//     }

//     /**
//      * Delete a note
//      */
//     static async deleteNote(id: string): Promise<void> {
//         const result = await Note.findByIdAndDelete(id);
//         if (!result) throw new NotFoundError('Note not found');
//     }

//     /**
//      * Get notes by category ID
//      */
//     static async getNotesByCategory(categoryId: string): Promise<NoteDocument[]> {
//         const category = await Category.findById(categoryId);
//         if (!category) throw new NotFoundError('Category not found');

//         return Note.find({ category: categoryId })
//             .populate('category')
//             .exec();
//     }

//     static async getNoteCount(): Promise<number> {
//         return Note.countDocuments().exec();
//     }

//     static async getDatabaseTimestamp(): Promise<Date> {
//         const result = await Note.findOne().sort({ createdAt: -1 });
//         return result?.createdAt || new Date();
//     }
// }