/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Self_self } from "../../api/__generated__/Self";
import { LOGIN } from "../../api/mutations";
import { Login } from "../../api/__generated__/Login";
import { PinDropSharp } from "@material-ui/icons";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export interface HeaderProps {
  user: Self_self | undefined;
  isDarkMode: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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

export const Header = (props: HeaderProps) => {
  const titleStyle = css({
    display: "flex",
    flexGrow: 1,
    marginRight: "200px",
    color: props.isDarkMode
      ? "rgba(255, 255, 255, 0.88)"
      : "rgba(70, 70, 70, 0.87)",
  });

  const buttonStyle = css({
    color: props.isDarkMode
      ? "rgba(255, 255, 255, 0.88)"
      : "rgba(70, 70, 70, 0.87)",
  });

  const appBarStyle = css({
    backgroundColor: "transparent",
    boxShadow: props.isDarkMode ? "0 4px 2px -2px #444" : "0 4px 2px -2px #ddd",
    height: "65px",
  });

  const classes = useStyles();
  const query = useQuery();
  const [login] = useMutation<Login>(LOGIN);

  useEffect(() => {
    const loginMethod = async () => {
      const code = query.get("code");
      if (code != null) {
        try {
          const { data } = await login({ variables: { code } });

          if (data != null) {
            localStorage.setItem("token", data.login.jwt);
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    loginMethod();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <AppBar css={appBarStyle} position="static">
        <Toolbar className={classes.toolBar}>
          <IconButton href="/home">
            <Typography css={titleStyle} variant="h5" noWrap>
              Moodiful
            </Typography>
          </IconButton>

          {props.user == null ? (
            <Button
              css={buttonStyle}
              href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`}
            >
              Login
            </Button>
          ) : (
            <div className={classes.userInformation}>
              <Button color="inherit" href="/submit">
                <Avatar alt="user-avatar" />
                {/* {user.name} */}
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
