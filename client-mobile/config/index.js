import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://mkid-c2.ezwx.xyz",
  cache: new InMemoryCache(),
});

export default client;
