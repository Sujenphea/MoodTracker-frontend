import { useQuery } from "@apollo/client";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import { Link } from "react-router-dom";
import { SELF } from "../../api/queries";
import { Self } from "../../api/__generated__/Self";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: "black",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      height: "80vh",
      flexDirection: "column",
    },
    nameAnimation: {
      background:
        "linear-gradient(130deg, rgba(255, 255, 255, 0.5) 0%, #fff 50%)",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      width: "0%",
      overflow: "hidden",
      whiteSpace: "nowrap",
      animation: "typing 1s steps(40, end)",
      animationFillMode: "forwards",
    },
  })
);

export const Home = () => {
  const classes = useStyles();
  const { data } = useQuery<Self>(SELF);

  return (
    <div className={classes.root}>
      <h1 className={classes.nameAnimation}>
        WELCOME {data?.self.name.toUpperCase() ?? ""}
      </h1>
      <Link to="/Thoughts">
        <h3>Ready to record your daily review?</h3>
      </Link>
    </div>
  );
};
