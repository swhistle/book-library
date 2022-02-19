import { Schema, model, Document } from 'mongoose';
import { IBook } from './book.interface';

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        default: "",
    },
    authors: {
        type: String,
        required: true,
        default: "",
    },
    fileCover: {
        type: String,
        required: true,
        default: "",
    },
    fileName: {
        type: String,
        default: "",
    }
});

export const BookModel = model<Document & IBook>('Book', bookSchema);