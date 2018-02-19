import { 
    makeExecutableSchema, 
    addMockFunctionsToSchema,
} from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
    type Query {
        author(fullName: String): Author
        allAuthors: [Author]
        getFortuneCookies: String # comment
    }
    type Author {
        id: Int
        fullName: String
        books: [Book]
    }
    type Book {
        id: Int
        title: String
        description: String
        author: Author
        views: Int
    }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;