import 'reflect-metadata';
import { injectable } from 'inversify';
import { IBook } from '../../models/book/book.interface';

@injectable()
export abstract class IBooksRepository {
    abstract getBooks(): Promise<IBook[] | null>;
    abstract getBook(id: string): Promise<IBook | null>;
    abstract createBook(book: IBook): Promise<IBook | null>;
    abstract deleteBook(id: string): Promise<IBook | null>;
    abstract updateBook(id: string, params: IBook): Promise<IBook | null>;
}