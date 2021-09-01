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
      height: "65px",
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

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const history = useHistory();
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
        history.push("/home");
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
