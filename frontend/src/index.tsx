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
import { DAILIES, SELF } from "./api/queries";
import { Self } from "./api/__generated__/Self";
// import * as serviceWorker from "./../archive/serviceWorker";
import "./styles/sanitise.css";
import "./styles/globals.css";
import { motion } from "framer-motion";
import { Home } from "./stories/Home/Home";
import { Dailies } from "./api/__generated__/Dailies";
import { GridContainer } from "./stories/GridContainer/GridContainer";

const Index = () => {
  const {
    loading: sloading,
    error: serror,
    data: sdata,
  } = useQuery<Self>(SELF);

  const {
    loading: dloading,
    error: derror,
    data: ddata,
    refetch,
  } = useQuery<Dailies>(DAILIES);

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
        <Header user={sdata?.self} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" render={() => <Home />} />
          <Route
            path="/thoughts"
            render={() => (
              <GridContainer data={ddata} refetchData={() => refetch()} />
            )}
          />
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
