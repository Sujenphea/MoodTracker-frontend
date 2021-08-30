import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
} from "@apollo/client";
import graphQLClient from "./GraphQLClient";
import { Sample } from "./sample";
// import * as serviceWorker from "./../archive/serviceWorker";

const Index = () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  return (
    <div>
      <div>Hello World</div>
      {Sample()}
    </div>
  );
};

ReactDOM.render(
  <Router>
    <ApolloProvider client={graphQLClient}>
      <React.StrictMode>
        <Index />
      </React.StrictMode>
    </ApolloProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
