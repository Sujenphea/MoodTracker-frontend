/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useAppSelector } from "../../redux/hooks";
import { GithubIcon } from "../SocialIcon/SocialIcon.stories";
import githubLight from "../../assets/logos/github_light.png";
import githubDark from "../../assets/logos/github_dark.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    smallDevices: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
    largeDevices: {
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  })
);

export const Footer = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.value);
  const classes = useStyles();

  const appBarStyle = css({
    backgroundColor: isDarkMode ? "#121212" : "#f0f0f0",
    boxShadow: isDarkMode ? "0 4px 2px -2px #444" : "0 4px 2px -2px #ddd",
    minHeight: "25px",
    height: "4vh",
    color: isDarkMode ? "rgba(255, 255, 255, 0.50)" : "rgba(70, 70, 70, 0.87)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "5px",
    paddingRight: "10px",
    fontSize: "13px",
  });

  return (
    <footer css={appBarStyle}>
      <div className={classes.largeDevices}>
        Copyright © Su Jen Phea, 2021. All rights reserved
      </div>
      <div className={classes.smallDevices}>© Su Jen Phea, 2021</div>
      <GithubIcon
        name={"GitHub"}
        url={"https://github.com/Sujenphea/MoodTracker-frontend"}
        logo={isDarkMode ? githubLight : githubDark}
      />
    </footer>
  );
};
