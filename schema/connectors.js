import Sequelize from 'sequelize';
import casual from 'casual';
import _ from 'lodash';

const db = new Sequelize({
    dialect: 'sqlite',
    storage: './library.sqlite',
});

const AuthorModel = db.define('author', {
    fullName: Sequelize.STRING,
});

const BookModel = db.define('book', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
});

AuthorModel.hasMany(BookModel);
BookModel.hasMany(AuthorModel);

casual.seed(111); // same generated data by `111` seed

db.sync({force: true}).then(() => {
    _.times(10, () => 
        AuthorModel.create({
            fullName: casual.full_name,
        }).then(author => 
            author.createBook({
                title: `A book by ${authon.fullName}`,
                description: casual.sentences(3),
            })
        )
    );
});

const Author = db.models.author;
const Book = db.models.book;

export default { Author, Book };
