require('reflect-metadata');
const {Container} = require('inversify');
const BooksRepository = require('./modules/book')

const container = new Container();
container.bind(BooksRepository).toSelf();

module.exports = {container};