import casual from 'casual';
import { Author, View } from './connectors';

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
        views: book => View.findOne({ bookId: book.id }).then(v => v.views),
    },
}

export default resolvers;
