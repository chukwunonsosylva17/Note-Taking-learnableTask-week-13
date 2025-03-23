import { Document } from 'mongoose';
import { IUser } from '../interfaces/auth.interface';
import { ICategory } from '../interfaces/category.interface';
import {  INote } from '../interfaces/note.interface';


export type createUserInput = {
    email: IUser['email'];
    password: IUser['password'];
    username: IUser['username'];
};

export type updateUserInput = Partial<createUserInput>;

export type CreateNoteInput = {
    title: string;
    content: string;
    categoryId: ICategory['_id'];
};

export type UpdateNoteInput = Partial<CreateNoteInput> & {
    updatedAt?: Date;
};

export type CreateCategoryInput = {
    name: string;
    color?: string;
};

export type UpdateCategoryInput = Partial<CreateCategoryInput>;

export type NoteDocument = Document<unknown, any, INote> & INote;
export type CategoryDocument = Document<unknown, any, ICategory> & ICategory;
