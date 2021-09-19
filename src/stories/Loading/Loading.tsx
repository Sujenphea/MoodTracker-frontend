/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useAppSelector } from "../../redux/hooks";
import backgroundDark from "../../assets/backgroundDark.jpg";
import backgroundLight from "../../assets/backgroundLight.jpg";

export const Loading = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.value);

  const backgroundStyle = css({
    backgroundImage: `url(${isDarkMode ? backgroundDark : backgroundLight})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "93vh",
    width: "100vw",
    transition: "background 0.2s ease-in-out",
  });

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
    <div css={backgroundStyle}>
      <div css={rootStyle}>
        <h1 css={titleStyle}>LOADING</h1>
      </div>
    </div>
  );
};
