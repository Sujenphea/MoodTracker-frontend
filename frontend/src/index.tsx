/** @jsx jsx */
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ReactDOM from "react-dom";
import { ApolloProvider, useQuery } from "@apollo/client";
import graphQLClient from "./GraphQLClient";

import { css, jsx, Global } from "@emotion/react";
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
import darkModeIconBlack from "./assets/darkModeIconBlack.png";
import darkModeIconWhite from "./assets/darkModeIconWhite.png";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { toggle } from "./redux/reducers/darkModeSlice";
import { QuoteType } from "./helpers/Quote";

const Index = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.value);
  const dispatch = useAppDispatch();
  const [quote, setQuote] = useState<QuoteType | undefined>(undefined);

  useEffect(() => {
    fetch("https://localhost:5001/api/GetLogo")
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        setQuote(res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);

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

  const darkModeToggleStyle = css({
    position: "absolute",
    right: "30px",
    top: "90px",
  });

  return (
    <div>
      <Global
        styles={{
          body: {
            backgroundColor: isDarkMode ? "#121212" : "#f0f0f0",
            transition: "background 0.5s",
            // primary: "#BB86FC",
            // secondary: "#03DAC6",
            // error: "#CF6679",
            color: isDarkMode
              ? "rgba(255, 255, 255, 0.88)"
              : "rgba(70, 70, 70, 0.87)",
          },
        }}
      />
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
        <Header user={sdata?.self} />
        <div
          css={darkModeToggleStyle}
          onClick={() => {
            dispatch(toggle());
          }}
        >
          <img
            src={isDarkMode ? darkModeIconWhite : darkModeIconBlack}
            alt="dark mode toggle"
          ></img>
        </div>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route
            path="/home"
            render={() => (
              <Home
                quote={quote?.quoteText ?? ""}
                author={quote?.quoteAuthor ?? ""}
              />
            )}
          />
          <Route
            path="/thoughts"
            render={() => (
              <GridContainer data={ddata} refetchData={() => refetch()} />
            )}
          />
        </Switch>
      </motion.div>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ApolloProvider client={graphQLClient}>
        <React.StrictMode>
          <Index />
        </React.StrictMode>
      </ApolloProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
