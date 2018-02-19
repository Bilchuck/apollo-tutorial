import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import casual from 'casual';
import fetch from 'node-fetch';
import _ from 'lodash';

mongoose.Promise = global.Promise;
const db = new Sequelize({
    dialect: 'sqlite',
    storage: './library.sqlite',
});
const mongo = mongoose.connect('mongodb://localhost:27017', {
    useMongoClient: true,
});

const ViewsSchema = mongoose.Schema({
    bookId: Number,
    views: Number,
});

const View = mongoose.model('views', ViewsSchema);

const AuthorModel = db.define('author', {
    fullName: Sequelize.STRING,
});

const BookModel = db.define('book', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
});

AuthorModel.hasMany(BookModel);
BookModel.belongsTo(AuthorModel);

casual.seed(111); // same generated data by `111` seed

db.sync({force: true}).then(() => {
    _.times(10, () => 
        AuthorModel.create({
            fullName: casual.full_name,
        }).then(author => 
            author.createBook({
                title: `A book by ${author.fullName}`,
                description: casual.sentences(3),
            })
        ).then(book => 
            View.update(
                { bookId: book.id },
                { views: casual.integer(0, 100) },
                { upsert: true },
            )
        )
    );
});

const Author = db.models.author;
const Book = db.models.book;

const FortuneCookie = {
    getOne: () => fetch(`http://fortunecookieapi.herokuapp.com/v1/cookie`)
                    .then(res => res.json())
                    .then(res => res[0].fortune.message)
}

export { 
    Author, 
    View, 
    FortuneCookie,
};
