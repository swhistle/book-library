import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import PassportLocal, { IStrategyOptionsWithRequest } from 'passport-local';

import User from './models/user/user.model';
import { onBookReviewsConnection } from './webSockets/book-reviews/book-reviews.websocket';

import booksRouter from './routes/books/books.router';
import booksApiRouter from './routes/api/books/api-books.router';
import userApiRouter from './routes/api/user/api-user.router';

const LocalStrategy = PassportLocal.Strategy;

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'password123';
const NameDB = process.env.DB_NAME || 'book_library';
const HostDB = process.env.DB_HOST || 'mongo://localhost:27017';

// @ts-ignore
mongoose.connect(HostDB, {
    user: UserDB,
    pass: PasswordDB,
    dbName: NameDB,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

function verify(username: any, password: any, done: any) {
    User.findOne({username: username}, function (err: any, user: any) {
        console.log('user', user);
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false);
        }

        if (user.password !== password) {
            return done(null, false);
        }

        // `user` будет сохранен в `req.user`
        return done(null, user);
    });
}

const options: IStrategyOptionsWithRequest = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
}

const app = express();
const server = new http.Server(app);
const io = new Server(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Конфигурирование Passport для сохранения пользователя в сессии
passport.serializeUser(function (user: any, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err: any, user: any) {
        if (err) { return cb(err) }
        cb(null, user);
    });
});

//  Добавление стратегии для использования
passport.use('local', new LocalStrategy(options, verify));

app.get('/', (req, res) => res.redirect('/books'));
app.use('/books', booksRouter);
app.use('/api/books', booksApiRouter);
app.use('/api/user', userApiRouter);

io.of('/reviews').on('connection', (socket: any) => {
    onBookReviewsConnection(io, socket);
});

server.listen(PORT);