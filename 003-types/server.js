/*
    GraphQl Scalar Types
    - String
    - Int
    - Float
    - Boolean
    - ID
*/
const express = require('express');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

// ! = Non-nulable value
// [Int] = List of integer
const schema = buildSchema(`
    type Query {
        quoteOfTheDay: String
        random: Float!
        rollThreeDice: [Int]
    }
`);

const root = {
    quoteOfTheDay: _ => Math.random() < 0.5 ? 'Take it easy' : 'Hakuna Matata',
    random: _ => Math.random(),
    rollThreeDice: _ => [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
}

const app = express();
app.use('/graphql', graphqlHttp({
    schema,
    rootValue: root,
    graphiql: false
}));
app.listen(4000);

console.log('Running GraphQL API Server at localhost:4000/graphql');