import 'reflect-metadata';
import { injectable } from 'inversify';
import { IBooksRepository } from '../modules/book/books.repository';
import { BookModel } from '../models/book/book.model';
import { IBook } from '../models/book/book.interface';

@injectable()
export class MongoBooksRepository implements IBooksRepository {
    async getBooks() {
        try {
            return BookModel.find().select('-__v');
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async getBook(id: string) {
        try {
            return BookModel.findById(id);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async createBook(data: IBook) {
        try {
            const newBook = new BookModel(data);

            return newBook.save();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async deleteBook(id: string) {
        try {
            return BookModel.findByIdAndDelete(id);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    async updateBook(id: string, params: IBook) {
        try {
            return BookModel.findByIdAndUpdate(id, {
                ...params,
            });
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}