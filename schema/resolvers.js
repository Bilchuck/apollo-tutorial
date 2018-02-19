import casual from 'casual';

const resolvers = {
    Query: {
        author: (root, args) => ({id: 1, fullName: 'Full name'}), 
        allAuthors: (root, args) => [{id: 1, fullName: 'Full name'}], 
    },
    Author: {
        books: author => [
            { id: 1, title: 'title 1', description: 'description 1' },
            { id: 2, title: 'title 2', description: 'description 2' },
        ]
    },
    Book: {
        author: book => ({ id: 1, fillName: 'Full name' }),
    },
}

export default resolvers;
