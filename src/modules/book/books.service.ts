// @ts-ignore
const IBooksRepository = require('./books.repository');
// @ts-ignore
const {injectable} = require('inversify');

@injectable()
class BooksService {
    // @ts-ignore
    constructor(private readonly repository: IBooksRepository) {}

    getBooks(): Promise<IBook[] | null> {
        return this.repository.getBooks();
    }

    getBook(id: string): Promise<IBook | null> {
        return this.repository.getBook(id);
    }

    createBook({title, description, authors, fileCover, fileName}: any): Promise<IBook | null> {
        return this.repository.createBook({title, description, authors, fileCover, fileName});
    }

    deleteBook(id: string): Promise<IBook | null> {
        return this.repository.deleteBook(id);
    }

    updateBook(id: string, params: any): Promise<IBook | null> {
        return this.repository.updateBook(id, params);
    }
}

// @ts-ignore
module.exports = BooksService;