const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');

const booksRouter = require('./routes/books');
const booksApiRouter = require('./routes/api/books');
const userApiRouter = require('./routes/api/user');

const PORT = process.env.PORT || 3000;
const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'password123';
const NameDB = process.env.DB_NAME || 'book_library';
const HostDB = process.env.DB_HOST || 'mongo://localhost:27017';

mongoose.connect(HostDB, {
    user: UserDB,
    pass: PasswordDB,
    dbName: NameDB,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

function verify(username, password, done) {
    User.findOne({username: username}, function (err, user) {
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

const options = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false,
}

const app = express();

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
passport.serializeUser(function (user, cb) {
    cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
    User.findById(id, function (err, user) {
        if (err) { return cb(err) }
        cb(null, user);
    });
});

//  Добавление стратегии для использования
passport.use('local', new LocalStrategy(options, verify));

app.use('/books', booksRouter);
app.use('/api/books', booksApiRouter);
app.use('/api/user', userApiRouter);

app.listen(PORT);