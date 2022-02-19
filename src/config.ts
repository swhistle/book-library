import 'reflect-metadata';
import { Container } from 'inversify';
import { IBooksRepository } from './modules/book/books.repository';
import { MongoBooksRepository } from './infrastructure/books.mongo.repository';
import { BooksService } from './modules/book/books.service';

export const container = new Container();

container.bind(IBooksRepository).to(MongoBooksRepository);

container.bind(BooksService).toSelf();