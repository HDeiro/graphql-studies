let {graphql, buildSchema} = require('graphql');

// Builds a schema via graphql schema language
let schema = buildSchema (`
    type Query {
        hello: String
    }
`);

// Creates a provider witha  function solver for an API endpoint
let root = {
    hello: _ => 'Hello World'
}

// Run Graphql query `{hello}` and print the response
graphql(schema, `{ hello }`, root).then(console.log);

