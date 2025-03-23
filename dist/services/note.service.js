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
exports.deleteNoteById = exports.updateExistingNote = exports.createNewNote = exports.getNotesByCategory = exports.getNoteById = exports.getAllNotes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const note_model_1 = __importDefault(require("../models/note.model"));
const getAllNotes = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield note_model_1.default.find({ user: userId }).populate("category");
    return notes.length > 0 ? notes : [];
});
exports.getAllNotes = getAllNotes;
const getNoteById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        console.error(" Invalid ObjectId:", id);
        return null;
    }
    return yield note_model_1.default.findOne({ _id: id, user: userId }).populate("category");
});
exports.getNoteById = getNoteById;
const getNotesByCategory = (categoryId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            console.error(" Invalid category ID:", categoryId);
            return [];
        }
        return yield note_model_1.default.find({ category: categoryId, user: userId }).populate("category");
    }
    catch (error) {
        console.error(" Error fetching notes by category:", error);
        throw error;
    }
});
exports.getNotesByCategory = getNotesByCategory;
const createNewNote = (title, content, categoryId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            console.error(" Invalid category ID:", categoryId);
            return null;
        }
        const newNote = new note_model_1.default({
            title,
            content,
            category: categoryId,
            user: userId,
        });
        return yield newNote.save();
    }
    catch (error) {
        console.error(" Error creating new note:", error);
        throw error;
    }
});
exports.createNewNote = createNewNote;
const updateExistingNote = (id, userId, title, content, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            console.error(" Invalid ObjectId:", id);
            return null;
        }
        const updateData = {};
        if (title)
            updateData.title = title;
        if (content)
            updateData.content = content;
        if (categoryId && mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            updateData.category = categoryId;
        }
        return yield note_model_1.default.findOneAndUpdate({ _id: id, user: userId }, { $set: updateData }, { new: true, runValidators: true }).populate("category");
    }
    catch (error) {
        console.error(" Error updating note:", error);
        throw error;
    }
});
exports.updateExistingNote = updateExistingNote;
const deleteNoteById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        console.error(" Invalid ObjectId:", id);
        return null;
    }
    return yield note_model_1.default.findOneAndDelete({ _id: id, user: userId });
});
exports.deleteNoteById = deleteNoteById;
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
