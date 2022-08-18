const { ApolloServer } = require('apollo-server')
const { typeDefs } = require('./data/schema')
const { resolvers } = require('./data/resolvers')

const port = process.env.PORT || 9090;

const server = new ApolloServer({ resolvers, typeDefs });

server.listen({ port }, () => console.log(`Server Running: http://localhost:${port}`));
