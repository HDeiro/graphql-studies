const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

class Message {
  constructor(id, {content, author}) {
      this.id = id;
      this.content = content;
      this.author = author;
  }
}

const schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }

  type Query {
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`);

const fakeDatabase = {};

const rootValue = {
  getMessage: ({ id }) => {
    if (!fakeDatabase[id])
      throw new Error (`There is no message with ID ${id}`);
    return new Message(id, fakeDatabase[id]);
  },
  createMessage: ({ input }) => {
    let id = require('crypto').randomBytes(10).toString('hex');
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  updateMessage: ({ id, input }) => {
    if (!fakeDatabase[id])
      throw new Error(`No messages exists with ID ${id}`);
    fakeDatabase[id] = input;
    return new Message(id, input);
  }
}

const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');

/**
  ###### QUERY EXAMPLE ######

  mutation {
    createMessage(input: { author: "Hugo", content: "Hello GraphQL" }) { id author }
  }

  ###########################
*/