import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  Drawer,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import logo from "../../assets/logos/msa_full_neg.svg";
import { useHistory, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Self_self } from "../../api/__generated__/Self";
import { LOGIN } from "../../api/mutations";
import { Login } from "../../api/__generated__/Login";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export interface HeaderProps {
  user?: Self_self;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: "#676767",
      minHeight: "65px",
    },
    title: {
      display: "flex",
      flexGrow: 1,
      marginRight: "200px",
      color: "white",
    },
    inputRoot: {
      color: "inherit",
    },
    userInformation: {
      display: "flex",
      // marginLeft: "20px",
    },
    flexEnd: {
      justifyContent: "space-between",
      alignItems: "center",
      display: "flex",
    },
    toolBar: {
      justifyContent: "space-between",
      alignItems: "center",
      display: "flex",
    },
  })
);

const CLIENT_ID = "9c00f9b1edf177359d2d";
const REDIRECT_URI = "http://localhost:8000/";

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const classes = useStyles();
  const query = useQuery();
  const [login] = useMutation<Login>(LOGIN);

  useEffect(() => {
    const loginMethod = async () => {
      const code = query.get("code");
      console.log("get code", code);
      if (code != null) {
        try {
          const { data } = await login({ variables: { code } });
          console.log("data", data);
          if (data != null) {
            localStorage.setItem("token", data.login.jwt);
          }
        } catch (e) {
          console.log(e);
        }
        // history.push("/home");
      }
    };
    loginMethod();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar className={classes.toolBar}>
          <IconButton href="/home">
            <Typography className={classes.title} variant="h5" noWrap>
              Moodiful
            </Typography>
          </IconButton>

          {user == null ? (
            <Button
              color="inherit"
              href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`}
              // href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
            >
              Login
            </Button>
          ) : (
            <div className={classes.userInformation}>
              <Avatar alt="user-avatar" />
              <Button color="inherit" href="/submit">
                {user.name}
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
