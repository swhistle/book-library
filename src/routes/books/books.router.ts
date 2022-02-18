import { Router } from 'express';
import { BooksService } from '../../modules/book/books.service';
import { container } from '../../config';

const router = Router();

router.get('/', async (req, res) => {
    const booksService = container.get(BooksService);
    const books = await booksService.getBooks();

    if (!books) {
        res.status(500);
        return;
    }

    res.render('books/index', {
        title: 'Book Library',
        books: books,
    });
});

router.get('/create', (req, res) => {
    res.render('books/create', {
        title: 'Book Library | Add a new book',
        book: {},
    });
});

router.post('/create', async (req, res) => {
    const { title, description, authors, fileCover, fileName } = req.body;
    const booksService = container.get(BooksService);

    if (!title || !description || !authors || !fileCover || !fileName) {
        res.status(400);
        res.send('Bad request');
        return;
    }

    const newBook = await booksService.createBook({
        title,
        description,
        authors,
        fileCover,
        fileName,
    });

    if (!newBook) {
        res.status(500);
        return;
    }

    res.status(201);
    res.redirect('/books');
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const booksService = container.get(BooksService);
    const book = await booksService.getBook(id);

    if (!book) {
        res.status(404).redirect('/404');
        return;
    }

    res.render('books/view', {
        title: 'Book Library | View the book',
        book: book,
    })
});

router.get('/update/:id', async (req, res) => {
    const {id} = req.params;
    const booksService = container.get(BooksService);
    const book = await booksService.getBook(id);

    if (!book) {
        res.status(404);
        res.redirect('/404');
        return;
    }

    res.render('books/update', {
        title: 'Book Library | Update the book',
        book: book,
    })
});

router.post('/update/:id', async (req, res) => {
    const { id } = req.params;
    const booksService = container.get(BooksService);
    const { title, description, authors, fileCover, fileName } = req.body;

    const booForUpdate = await booksService.updateBook(id, {
        title,
        description,
        authors,
        fileCover,
        fileName,
    });

    if (!booForUpdate) {
        res.status(404);
        res.redirect('/404');
        return;
    }

    res.status(202);
    res.redirect(`/books/${id}`);
});

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const booksService = container.get(BooksService);

    const booForDelete = await booksService.deleteBook(id);

    if (!booForDelete) {
        res.status(404);
        res.redirect('/404');
        return;
    }

    res.redirect('/books');
});

export default router;