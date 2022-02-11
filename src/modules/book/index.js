const Book = require('../../models/book');

class BooksRepository {
    static async getBooks() {
        try {
            return Book.find().select('-__v');
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async getBook(id) {
        try {
            return Book.findById(id);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async createBook({title, description, authors, fileCover, fileName}) {
        try {
            const newBook = new Book({title, description, authors, fileCover, fileName});

            return newBook.save();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async deleteBook(id) {
        try {
            return Book.findByIdAndDelete(id);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async updateBook(id, params) {
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

module.exports = BooksRepository;