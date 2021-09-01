import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ReactDOM from "react-dom";
import { ApolloProvider, useQuery } from "@apollo/client";
import graphQLClient from "./GraphQLClient";

import { Header } from "./stories/Header/Header";
import { SELF } from "./api/queries";
import { Self } from "./api/__generated__/Self";
import { DailyGrid } from "./pages/DailyGrid";
// import * as serviceWorker from "./../archive/serviceWorker";
import "./styles/sanitise.css";
import "./styles/globals.css";
import { motion } from "framer-motion";
import { Home } from "./stories/Home/Home";

const Index = () => {
  const { loading, error, data } = useQuery<Self>(SELF);
  return (
    <div>
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
        }}
      >
        {/* <Provider store={store}> */}
        <Header user={data?.self} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" render={() => <Home />} />
          <Route path="/thoughts" render={() => <DailyGrid />} />
        </Switch>
        {/* </Provider> */}
      </motion.div>
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
