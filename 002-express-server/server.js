const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

// Build Schema
const schema = buildSchema(`
    type Query {
        hello: String,
        number: Float
    }
`);

// API Endpoint Provider
const root = {
    hello: _ => `Hello world!`,
    number: _ => Math.random()
}

// Express Configs
const app = express();

app.use('/graphql', graphqlHttp({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000);
console.log('GraphQL API at localhost:4000/graphql')

