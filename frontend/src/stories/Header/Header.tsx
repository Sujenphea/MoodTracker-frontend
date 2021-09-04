/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Self_self } from "../../api/__generated__/Self";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

export interface HeaderProps {
  user: Self_self | undefined;
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
  const isDarkMode = useAppSelector((state) => state.darkMode.value);
  const classes = useStyles();

  const titleStyle = css({
    display: "flex",
    flexGrow: 1,
    marginRight: "200px",
    color: isDarkMode ? "rgba(255, 255, 255, 0.88)" : "rgba(70, 70, 70, 0.87)",
  });

  const buttonStyle = css({
    color: isDarkMode ? "rgba(255, 255, 255, 0.88)" : "rgba(70, 70, 70, 0.87)",
  });

  const appBarStyle = css({
    backgroundColor: "transparent",
    boxShadow: isDarkMode ? "0 4px 2px -2px #444" : "0 4px 2px -2px #ddd",
    height: "65px",
    justifyContent: "center",
  });

  return (
    <div className={classes.root}>
      <AppBar css={appBarStyle} position="static">
        <Toolbar className={classes.toolBar}>
          <Link to="/home">
            <Typography css={titleStyle} variant="h5" noWrap>
              Moodiful
            </Typography>
          </Link>

          {props.user == null ? (
            <Button
              css={buttonStyle}
              href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user`}
            >
              Login
            </Button>
          ) : (
            <div className={classes.userInformation}>
              <Link to="/home" color="inherit">
                <Avatar alt="user-avatar" />
                {/* {user.name} */}
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
