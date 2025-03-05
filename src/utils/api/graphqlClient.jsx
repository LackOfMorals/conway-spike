/* 
Apollo client

*/

import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_URI = import.meta.env.VITE_GRAPHQL_URL;
const GRAPHQL_URL_API_KEY = import.meta.env.VITE_GRAPHQL_URL_API_KEY;

export const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
  headers: {
    "x-api-key": GRAPHQL_URL_API_KEY,
  },
});
