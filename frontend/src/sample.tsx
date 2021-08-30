import { useQuery } from "@apollo/client";
import React from "react";
import { DAILIES } from "./api/queries";
import { Dailies, Dailies_dailies_nodes } from "./api/__generated__/Dailies";

export const Sample = () => {
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
        data.dailies.nodes.map((daily: Dailies_dailies_nodes) => {
          console.log("-------");
          console.log(daily.id);
          console.log(daily.summary);
          console.log("-------");
        });
      }
    }
  }

  return <div>Sample</div>;
};
