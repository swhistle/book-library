const express = require('express');
const router = express.Router();

const Book = require('../../models/book');

router.get('/', async (req, res) => {
    const books = await Book.find().select('-__v');

    try {
        res.render('books/index', {
            title: 'Book Library',
            books: books,
        });
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

router.get('/create', (req, res) => {
    res.render("books/create", {
        title: 'Book Library | Add a new book',
        book: {},
    });
});

router.post('/create', async (req, res) => {
    const { title, description, authors, fileCover, favorite, fileName } = req.body;

    if (!title || !description || !authors || !fileCover) {
        res.status(400);
        res.send('Bad request');
        return;
    }

    const newBook = new Book({
        title,
        description,
        authors,
        favorite,
        fileCover,
        fileName,
    });

    try {
        await newBook.save();

        res.status(201);
        res.redirect('/books');
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const book = await Book.findById(id).select('-__v');

    try {
        res.render('books/view', {
            title: 'Book Library | View the book',
            book: book,
        })
    } catch (e) {
        console.log(e);
        res.status(404).redirect('/404');
    }
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    const book = await Book.findById(id).select('-__v');

    try {
       res.render('books/update', {
           title: 'Book Library | Update the book',
           book: book,
       })
    } catch (e) {
        console.log(e);
        res.status(404);
        res.redirect('/404');
    }
});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, authors, fileCover, favorite, fileName } = req.body;

    try {
        await Book.findByIdAndUpdate(id, {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        });
        res.status(202);
        res.redirect(`/books/${id}`);
    } catch (e) {
        console.log(e);
        res.status(404);
        res.redirect('/404');
    }
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Book.deleteOne({_id: id});
        res.redirect('/books');

    } catch (e) {
        console.log(e);
        res.status(404);
        res.redirect('/404');
    }
});

module.exports = router;