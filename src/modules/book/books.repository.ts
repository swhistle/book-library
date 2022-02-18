// @ts-ignore
import { injectable } from 'inversify';
// @ts-ignore
const { IBook } = require('../../models/book/book-interface');

@injectable()
abstract class IBooksRepository {
    abstract getBooks(): Promise<IBook[] | null>;
    abstract getBook(id: string): Promise<IBook | null>;
    abstract createBook(book: IBook): Promise<IBook | null>;
    abstract deleteBook(id: string): Promise<IBook | null>;
    abstract updateBook(id: string, params: any): Promise<IBook | null>;
}

// @ts-ignore
module.exports = IBooksRepository;