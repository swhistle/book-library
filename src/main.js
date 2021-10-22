const express = require('express');
const userRouter = require('./routes/user');
const booksRouter = require('./routes/books');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/api/user', userRouter);

app.use('/api/books', booksRouter);

app.listen(PORT);