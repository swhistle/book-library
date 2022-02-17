// @ts-ignore
const {injectable} = require('inversify');
// @ts-ignore
require('reflect-metadata');
// @ts-ignore
const IBooksRepository = require('../modules/book/books.repository');
// @ts-ignore
const Book = require('../models/book');

@injectable()
// @ts-ignore
class MongoBooksRepository implements IBooksRepository {
    async getBooks() {
        try {
            return Book.find().select('-__v');
        } catch (e) {
            // @ts-ignore
            console.log(e);
            return null;
        }
    }

    async getBook(id: string) {
        try {
            return Book.findById(id);
        } catch (e) {
            // @ts-ignore
            console.log(e);
            return null;
        }
    }

    async createBook({title, description, authors, fileCover, fileName}: any) {
        try {
            const newBook = new Book({title, description, authors, fileCover, fileName});

            return newBook.save();
        } catch (e) {
            // @ts-ignore
            console.log(e);
            return null;
        }
    }

    async deleteBook(id: string) {
        try {
            return Book.findByIdAndDelete(id);
        } catch (e) {
            // @ts-ignore
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
            // @ts-ignore
            console.log(e);
            return null;
        }
    }
}

// @ts-ignore
module.exports = MongoBooksRepository;