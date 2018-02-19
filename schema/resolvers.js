import casual from 'casual';
import { Author } from './connectors';

const resolvers = {
    Query: {
        author: (_, args) => Author.find({where: args}), 
        allAuthors: _ => Author.findAll(), 
    },
    Author: {
        books: author => author.getBooks()
    },
    Book: {
        author: book => book.getAuthors(),
    },
}

export default resolvers;
