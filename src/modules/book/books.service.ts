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

    createBook(data: IBook): Promise<IBook | null> {
        return this.repository.createBook(data);
    }

    deleteBook(id: string): Promise<IBook | null> {
        return this.repository.deleteBook(id);
    }

    updateBook(id: string, params: IBook): Promise<IBook | null> {
        return this.repository.updateBook(id, params);
    }
}