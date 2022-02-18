require('reflect-metadata');
const {Container} = require('inversify');
const IBooksRepository = require('./modules/book/books.repository');
const MongoBooksRepository = require('./infrastructure/books.mongo.repository')
const BooksService = require('./modules/book/books.service')

const container = new Container();

container.bind(IBooksRepository).to(MongoBooksRepository);

container.bind(BooksService).toSelf();

module.exports = {container};