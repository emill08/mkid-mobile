const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const userSchema = require("./schemas/userSchema");
const productSchema = require("./schemas/productSchema");

const server = new ApolloServer({
  typeDefs: [userSchema.typeDefs, productSchema.typeDefs],
  resolvers: [userSchema.resolvers, productSchema.resolvers],
  introspection: true,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
}).then(({ url }) => console.log(`🚀  Server ready at: ${url}`));

// console.log(`🚀  Server ready at: ${url}`);
