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

    static async getBook(id: string) {
        try {
            return Book.findById(id);
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async createBook({title, description, authors, fileCover, fileName}: any) {
        try {
            const newBook = new Book({title, description, authors, fileCover, fileName});

            return newBook.save();
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    static async deleteBook(id: string) {
        try {
            return Book.findByIdAndDelete(id);
        } catch (e) {
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
            console.log(e);
            return null;
        }
    }
}

module.exports = BooksRepository;