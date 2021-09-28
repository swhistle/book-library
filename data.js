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

const BOOKS = [
    {
        title: "Iliad",
        description: 'The Iliad is an epic poem written by the Greek poet Homer. It tells the story of the last year of the Trojan War fought between the city of Troy and the Greeks.',
        authors: "Homer",
        fileCover: "soft",
    },
    {
        title: "The Clouds",
        description: 'The Clouds is a Greek comedy play written by the playwright Aristophanes. A lampooning of intellectual fashions in classical Athens, it was originally produced at the City Dionysia in 423 BC and was not as well received as the author had hoped, coming last of the three plays competing at the festival that year. It was revised between 420 and 417 BC and was thereafter circulated in manuscript form.',
        authors: "Aristophanes",
        fileCover: "soft",
    }
];

const store = {
    books: BOOKS.map(book => new Book(book.title, book.description, book.authors, book.fileCover)),
};

module.exports.store = store;
module.exports.Book = Book;