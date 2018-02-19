import express from 'express';
import bodyParser from 'body-parser';
import { 
    graphqlExpress, 
    graphiqlExpress,
} from 'apollo-server-express';
import schema from './schema';

const PORT = 8080;
const app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}));
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port. Graphql enpoint -> /graphql`);
});
