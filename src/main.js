const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const booksRouter = require('./routes/books');

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'password123';
const NameDB = process.env.DB_NAME || 'book_library';
const HostDB = process.env.DB_HOST || 'mongo://localhost:27017';

const app = express();

async function start() {
    try {
        await mongoose.connect(HostDB, {
            user: UserDB,
            pass: PasswordDB,
            dbName: NameDB,
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        app.listen(PORT);
    } catch (e) {
        console.log(e)
    }
}

app.use(express.json());

app.use('/api/user', userRouter);

app.use('/api/books', booksRouter);

start();