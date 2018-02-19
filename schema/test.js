import { 
    makeExecutableSchema, 
    addMockFunctionsToSchema,
} from 'graphql-tools';
import mocks from './test-mock';

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
        name: String
        author: Author
    }
`;
const schema = makeExecutableSchema({typeDefs});

addMockFunctionsToSchema({schema, mocks})

export default schema;