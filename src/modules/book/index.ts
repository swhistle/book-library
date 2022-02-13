// @ts-ignore
const {injectable} = require('inversify');
// @ts-ignore
require('reflect-metadata');
// @ts-ignore
const Book = require('../../models/book');

@injectable()
class BooksRepository {
    static async getBooks() {
        try {
            return Book.find().select('-__v');
        } catch (e) {
            // @ts-ignore
            console.log(e);
            return null;
        }
    }

    static async getBook(id: string) {
        try {
            return Book.findById(id);
        } catch (e) {
            // @ts-ignore
            console.log(e);
            return null;
        }
    }

    static async createBook({title, description, authors, fileCover, fileName}: any) {
        try {
            const newBook = new Book({title, description, authors, fileCover, fileName});

            return newBook.save();
        } catch (e) {
            // @ts-ignore
            console.log(e);
            return null;
        }
    }

    static async deleteBook(id: string) {
        try {
            return Book.findByIdAndDelete(id);
        } catch (e) {
            // @ts-ignore
            console.log(e);
            return null;
        }
    }

    static async updateBook(id: string, params: any) {
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
module.exports = BooksRepository;