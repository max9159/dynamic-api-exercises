var http = require('http');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} = require('apollo-server-core');
const { typeDefs } = require('./data/schema');
const { resolvers } = require('./data/resolvers');

async function startApolloServer() {

  const app = express();
  const httpServer = http.createServer(app);
  const port = process.env.PORT || 9090;

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();

  // Additional middleware can be mounted at this point to run before Apollo.
  // app.use('*', jwtCheck, requireAuth, checkScope);

  // Mount Apollo middleware here.
  server.applyMiddleware({ app, path: '/api/salaries' });
  await new Promise(resolve => httpServer.listen({ port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}
startApolloServer();