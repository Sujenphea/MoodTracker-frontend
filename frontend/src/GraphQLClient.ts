import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import https from "https";

const httpLink = createHttpLink({
  uri: "http://localhost:5000/graphql",
  fetchOptions: {
    agent: new https.Agent({ rejectUnauthorized: false }),
  },
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwiZXhwIjoxNjM4MDcwNjI1LCJpc3MiOiJNU0EtWWVhcmJvb2siLCJhdWQiOiJNU0EtU3R1ZGVudCJ9.Ay8QsMaGxHWeFbNoU1kmulAgvYrHRR0p-l27qEiYVjw";
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const graphQLClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default graphQLClient;
