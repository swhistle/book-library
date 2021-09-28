const express = require('express');
const { Book, store } = require('./data');

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

    if (book) {
        res.send(book);
        return;
    }

    res.status(404);
    res.send('404 | not found');
});

app.post('/api/books', (req, res) => {
    const { title, description, authors, fileCover } = req.body;

    if (title && description && authors && fileCover) {
        const newBook = new Book(title, description, authors, fileCover);
        res.status(201);
        res.send(newBook);
        return;
    }

    res.status(400);
    res.send('Bad request');
});

app.listen(PORT);