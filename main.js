const express = require('express');
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

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.post('/api/user/login', (req, res) => {
    const user = { id: 1, mail: "test@mail.ru" };
    res.status(201);
    res.send(user);
});

app.get('/api/books', (req, res) => {
    res.send(store.books);
});

app.get('/api/books/:id', (req, res) => {
    const { id } = req.params;

    const book = store.books.find(item => item.id === id);

    if (!book) {
        res.status(404);
        res.send('404 | not found');
        return;
    }

    res.send(book);
});

app.post('/api/books', (req, res) => {
    const { title, description, authors, fileCover } = req.body;

    if (!title || !description || !authors || !fileCover) {
        res.status(400);
        res.send('Bad request');
        return;
    }

    const newBook = new Book(title, description, authors, fileCover);
    store.books.push(newBook);
    res.status(201);
    res.send(newBook);
});

app.put('/api/books/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, authors, fileCover } = req.body;

    const updatedBookId = store.books.findIndex(item => item.id === id);

    if (updatedBookId === -1) {
        res.status(404);
        res.send('404 | not found');
        return;
    }

    const bookForUpdate = store.books[updatedBookId];

    const updatedBook = {
        ...bookForUpdate,
        title: title || bookForUpdate.title,
        description: description || bookForUpdate.description,
        authors: authors || bookForUpdate.authors,
        fileCover: fileCover || bookForUpdate.fileCover,
    };

    store.books.splice(updatedBookId, 1, updatedBook);
    res.send(updatedBook);
});

app.delete('/api/books/:id', (req, res) => {
    const { id } = req.params;

    const deletedBookId = store.books.findIndex(item => item.id === id);

    if (deletedBookId === -1) {
        res.status(404);
        res.send('404 | not found');
        return;
    }

    store.books.splice(deletedBookId, 1);
    res.send(true);
});

app.listen(PORT);