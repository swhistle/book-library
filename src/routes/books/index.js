const express = require('express');
const router = express.Router();
const fileUpload = require('../../middleware/fileUpload');

const {BOOKS} = require('../../data');
const {Book} = require('../../models');

const store = {
    books: BOOKS.map(book => new Book(book.title, book.description, book.authors, book.fileCover, book.fileName)),
};

router.get('/', (req, res) => {
    res.send(store.books);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    const book = store.books.find(item => item.id === id);

    if (!book) {
        res.status(404);
        res.send('404 | not found');
        return;
    }

    res.send(book);
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.post('/upload',
    fileUpload.single('new-book'),
    (req, res) => {
    if (req.file) {
        const {path} = req.file;
        console.log('path', path);
        res.json(path);
    } else {
        res.json(null);
    }
});

router.get('/:id/download', (req, res) => {
    const { id } = req.params;

    const downloadBookId = store.books.findIndex(item => item.id === id);

    if (downloadBookId === -1) {
        res.status(404);
    }

    const downloadBook = store.books[downloadBookId];

    const filePath = `${__dirname}/../../${downloadBook.fileName}`;

    res.download(filePath, 'book.txt', err => {
        if (err) {
            res.status(404);
        }
    });
});

module.exports = router;