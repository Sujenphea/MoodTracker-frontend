import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { DAILIES, SELF } from "../api/queries";
import { Dailies, Dailies_dailies_nodes } from "../api/__generated__/Dailies";
import { Self } from "../api/__generated__/Self";
import { Header } from "../stories/Header/Header";
import { DailyGrid } from "./Daily/DailyGrid";
import { DailyGridItem } from "./Daily/DailyGridItem";

export const Home = () => {
  const { loading, error, data } = useQuery<Self>(SELF);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          height: "80vh",
          flexDirection: "column",
        }}
      >
        <h1>WELCOME {data?.self.name.toUpperCase() ?? ""}</h1>
        <Link to="/Thoughts">
          <h3>Ready to record your daily review?</h3>
        </Link>
      </div>

      {/* {DailyGrid()} */}
    </div>
  );
};
