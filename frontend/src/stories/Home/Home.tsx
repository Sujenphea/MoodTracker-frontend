/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { SELF } from "../../api/queries";
import { Self } from "../../api/__generated__/Self";
import { useAppSelector } from "../../redux/hooks";

export const Home = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.value);
  const { data } = useQuery<Self>(SELF);

  const rootStyle = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "80vh",
    flexDirection: "column",
  });

  const titleStyle = css({
    background: isDarkMode
      ? "linear-gradient(130deg, rgba(255, 255, 255, 0.5) 0%, #fff 50%)"
      : "linear-gradient(130deg, rgba(0,0,0,0.2), rgba(0,0,0,1.0) 100%)",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    width: "0",
    overflow: "hidden",
    whiteSpace: "nowrap",
    animation: "typing 1s steps(90, end)",
    animationFillMode: "forwards",
  });

  return (
    <div css={rootStyle}>
      <h1 css={titleStyle}>WELCOME {data?.self.name.toUpperCase() ?? ""}</h1>
      <Link to="/Thoughts">
        <h3>Ready to record your daily review?</h3>
      </Link>
    </div>
  );
};
