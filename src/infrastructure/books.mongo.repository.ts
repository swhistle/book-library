import 'reflect-metadata';
import { injectable } from 'inversify';
import { IBooksRepository } from '../modules/book/books.repository';
import Book from '../models/book/book.model';

@injectable()
export class MongoBooksRepository implements IBooksRepository {
    async getBooks() {
        try {
            return Book.find().select('-__v');
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getBook(id: string) {
        try {
            return Book.findById(id);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async createBook({title, description, authors, fileCover, fileName}: any) {
        try {
            const newBook = new Book({title, description, authors, fileCover, fileName});

            return newBook.save();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async deleteBook(id: string) {
        try {
            return Book.findByIdAndDelete(id);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async updateBook(id: string, params: any) {
        try {
            return Book.findByIdAndUpdate(id, {
                ...params,
            });
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}