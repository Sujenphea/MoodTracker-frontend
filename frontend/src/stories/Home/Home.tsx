/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { SELF } from "../../api/queries";
import { Self } from "../../api/__generated__/Self";
import { useAppSelector } from "../../redux/hooks";

export interface HomeProps {
  quote: string;
  author: string;
}

export const Home = (props: HomeProps) => {
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

  const quoteStyle = css({
    maxWidth: "70vw",
    padding: "20px 10px",
    position: "absolute",
    bottom: "10vh",
    borderRadius: "10px",
    color: isDarkMode
      ? "rgba(200, 200, 200, 0.88)"
      : "rgba(100, 100, 100, 0.7)",
    background: isDarkMode ? "rgba(50,50,50,0.8)" : "rgba(250,250,250,0.8)",
    "@media (max-width: 600px), (max-height: 700px)": {
      display: "none",
    },
  });

  return (
    <div css={rootStyle}>
      <h1 css={titleStyle}>WELCOME {data?.self?.name?.toUpperCase() ?? ""}</h1>
      <Link to="/Thoughts">
        <h3>Ready to record your daily review?</h3>
      </Link>
      <p css={quoteStyle}>
        "{props.quote.toUpperCase()}" - {props.author.toUpperCase()}
      </p>
    </div>
  );
};
