/** @jsx jsx */
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import ReactDOM from "react-dom";
import { ApolloProvider, useMutation, useQuery } from "@apollo/client";
import graphQLClient from "./GraphQLClient";

import { css, jsx, Global } from "@emotion/react";
import { Header } from "./stories/Header/Header";
import { DAILIESBYUSERID, SELF } from "./api/queries";
import { Self } from "./api/__generated__/Self";
// import * as serviceWorker from "./../archive/serviceWorker";
import "./styles/sanitise.css";
import "./styles/globals.css";
import { motion } from "framer-motion";
import { Home } from "./stories/Home/Home";
import { GridContainer } from "./stories/GridContainer/GridContainer";
import darkModeIconBlack from "./assets/darkModeIconBlack.png";
import darkModeIconWhite from "./assets/darkModeIconWhite.png";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { toggle } from "./redux/reducers/darkModeSlice";
import { QuoteType } from "./helpers/Quote";
import { useLocation } from "react-router-dom";
import { LOGIN } from "./api/mutations";
import { Login } from "./api/__generated__/Login";
import { DailiesByUserId } from "./api/__generated__/DailiesByUserId";
import { Loading } from "./stories/Loading/Loading";
import { TransitionGroup, CSSTransition } from "react-transition-group";

function useQueryCode() {
  return new URLSearchParams(useLocation().search);
}

const Index = () => {
  // quote
  const [quote, setQuote] = useState<QuoteType | undefined>(undefined);

  // redux
  const isDarkMode = useAppSelector((state) => state.darkMode.value);
  const dispatch = useAppDispatch();

  // login
  const query = useQueryCode();
  const [login] = useMutation<Login>(LOGIN);
  const [userId, setUserId] = useState("");

  let location = useLocation();

  // dailies
  const {
    loading: dloading,
    error: derror,
    data: ddata,
    refetch: refetchDailies,
  } = useQuery<DailiesByUserId>(DAILIESBYUSERID, {
    variables: { id: userId },
  });
  // const [dailies, setDailies] = useState<DailiesByUserId>();

  // user info
  const {
    loading: sloading,
    error: serror,
    data: sdata,
  } = useQuery<Self>(SELF);

  // get login info
  useEffect(() => {
    const loginMethod = async () => {
      const code = query.get("code");

      if (code == null) return;

      try {
        const { data } = await login({ variables: { code } });

        if (data == null) return;
        localStorage.setItem("token", data.login ? data.login.jwt! : "");
      } catch (e) {
        console.log(e);
      }
    };
    loginMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setUserId(sdata ? sdata.self!.id : "");
  }, [sdata]);

  // refetch dailies
  useEffect(() => {
    refetchDailies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  // Get Quote from public API
  useEffect(() => {
    fetch("https://moodtracker-cosmos-backend.azurewebsites.net/api/GetQuote")
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
        <div style={{ display: sloading ? "block" : "none" }}>
          <Loading />
        </div>
        <div style={{ display: sloading ? "none" : "block" }}>
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="fade" timeout={300}>
              <Switch location={location}>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route
                  path="/home"
                  children={
                    <Home
                      quote={quote?.quoteText ?? ""}
                      author={quote?.quoteAuthor ?? ""}
                    />
                  }
                />
                <Route
                  path="/thoughts"
                  children={
                    <GridContainer
                      dailies={ddata}
                      refetchData={() => {
                        refetchDailies();
                      }}
                    />
                  }
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        </div>
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
