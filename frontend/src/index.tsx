import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  gql,
  InMemoryCache,
  useMutation,
} from "@apollo/client";
import graphQLClient from "./GraphQLClient";
import { LOGIN } from "./api/mutations";
import { Login } from "./api/__generated__/Login";
import { Home } from "./Pages/Home";
// import * as serviceWorker from "./../archive/serviceWorker";

const Index = () => {
  return <div>{Home()}</div>;
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
