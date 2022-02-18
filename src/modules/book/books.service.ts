import 'reflect-metadata';
import { injectable } from 'inversify';
import { IBooksRepository } from './books.repository';
import { IBook } from '../../models/book/book.interface';

@injectable()
export class BooksService {
    constructor(private readonly repository: IBooksRepository) {}

    getBooks(): Promise<IBook[] | null> {
        return this.repository.getBooks();
    }

    getBook(id: string): Promise<IBook | null> {
        return this.repository.getBook(id);
    }

    createBook({title, description, authors, fileCover, fileName}: any): Promise<IBook | null> {
        return this.repository.createBook({title, description, authors, fileCover, fileName});
    }

    deleteBook(id: string): Promise<IBook | null> {
        return this.repository.deleteBook(id);
    }

    updateBook(id: string, params: any): Promise<IBook | null> {
        return this.repository.updateBook(id, params);
    }
}