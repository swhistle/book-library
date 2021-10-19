const { v4: uuid } = require('uuid');

class Book {
    constructor(title = '', description = '', authors = '', fileCover='', id = uuid()) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.authors = authors;
        this.fileCover = fileCover;
    }
}

module.exports.Book = Book;