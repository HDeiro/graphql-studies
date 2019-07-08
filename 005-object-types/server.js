const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

class RandomDie {
  constructor(numSides = 6) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({numRolls}) {
    return [...' '.repeat(numRolls)].map(_ => this.rollOnce());
  }
}

const schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);

const rootValue = {
  getDie: ({ numSides }) => new RandomDie(numSides)
}

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');