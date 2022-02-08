const Book = require('../../models/book');

class BooksRepository {
    static async getBooks(params) {
        try {
            return await Book.find(params).select('-__v');
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async getBook(id) {
        try {
            return await Book.findById(id);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async createBook(title, description, authors, favorite, fileCover, fileName) {
        try {
            const newBook = new Book({title, description, authors, favorite, fileCover, fileName});

            return newBook.save();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async deleteBook(id) {
        try {
            return await Book.findByIdAndDelete(id);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async updateBook(id, params) {
        try {
            return await Book.findByIdAndUpdate(id, {
                ...params,
            });
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

module.exports = BooksRepository;