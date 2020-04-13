const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://root:YTCRMoQ8inyrG1QU@blogger-y1lir.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('Server running on port 4000')
});