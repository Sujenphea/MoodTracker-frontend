import { useQuery } from "@apollo/client";
import React from "react";
import { DAILIES } from "../../api/queries";
import {
  Dailies,
  Dailies_dailies_nodes,
} from "../../api/__generated__/Dailies";
import { DailyGridItem } from "./DailyGridItem";

export const DailyGrid = () => {
  const { loading, error, data } = useQuery<Dailies>(DAILIES);
  if (loading) {
    console.log("loading");
  }

  if (error) {
    console.log("client", error.clientErrors);
    console.log("graphQLErrors", error.graphQLErrors);
    console.log("extraInfo", error.extraInfo);
    console.log("name", error.name);
    console.log("message", error.message);
    console.log("networkError", error.networkError);
  }

  if (data) {
    if (data.dailies) {
      if (data.dailies.nodes) {
      }
    }
  }
  const getGrid = (): JSX.Element[] => {
    if (loading || error || !data || !data!.dailies || !data!.dailies!.nodes) {
      return [];
    }

    let res: JSX.Element[] = [];

    data.dailies.nodes.map((daily: Dailies_dailies_nodes) => {
      res = res.concat(
        <DailyGridItem
          id={Number.parseInt(daily.id)}
          summary={daily.summary}
          dateCreated={daily.dateCreated}
        />
      );
    });

    return res;
  };

  return (
    <div
      style={{
        display: "grid",
        gridColumn: "1",
        alignItems: "center",
        justifyContent: "center",
        rowGap: "30px",
        border: "1px solid blue",
        // gridTemplateRows: "minmax(300px, auto)",
        gridTemplateColumns: "minmax(50%, auto)" /* width */,
      }}
    >
      {getGrid()}
      {/* <DailyGridItem id={1} summary={"hello"} /> */}
    </div>
  );
};
