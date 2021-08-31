import { useQuery } from "@apollo/client";
import React from "react";
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
      <Header user={data?.self} />
      <h1>Hello world</h1>
      {DailyGrid()}
    </div>
  );
};
