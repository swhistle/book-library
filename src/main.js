"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Book = require('../../models/book');
class BooksRepository {
    static getBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Book.find().select('-__v');
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    static getBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Book.findById(id);
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    static createBook({ title, description, authors, fileCover, fileName }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newBook = new Book({ title, description, authors, fileCover, fileName });
                return newBook.save();
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    static deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Book.findByIdAndDelete(id);
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
    static updateBook(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return Book.findByIdAndUpdate(id, Object.assign({}, params));
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
    }
}
module.exports = BooksRepository;
//# sourceMappingURL=main.js.map