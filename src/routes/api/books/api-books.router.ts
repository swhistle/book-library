import { Router } from 'express';
import { BookModel } from '../../../models/book/book.model';

const router = Router();

router.get('/', async (req, res) => {
    const books = await BookModel.find().select('-__v');

    try {
        res.send(books);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await BookModel.findById(id).select('-__v');
        res.send(book);
    } catch (e) {
        console.log(e);
        res.status(404);
        res.send('404 | not found');
    }
});

router.post('/', async (req, res) => {
    const { title, description, authors, fileCover, favorite, fileName } = req.body;

    if (!title || !description || !authors || !fileCover) {
        res.status(400);
        res.send('Bad request');
        return;
    }

    const newBook = new BookModel({
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
        res.send(newBook);
    } catch (e) {
        console.log(e);
        res.status(500);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, authors, fileCover, favorite, fileName } = req.body;

    try {
        await BookModel.findByIdAndUpdate(id, {
            title,
            description,
            authors,
            favorite,
            fileCover,
            fileName,
        })
        res.send(true);
        res.status(202);
    } catch (e) {
        console.log(e);
        res.status(404);
        res.send('404 | not found');
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await BookModel.deleteOne({_id: id});
        res.send(true);

    } catch (e) {
        console.log(e);
        res.status(404);
        res.send('404 | not found');
    }
});

export default router;