import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { DAILIES } from "../api/queries";
import { Dailies, Dailies_dailies_nodes } from "../api/__generated__/Dailies";
import { IsToday } from "../helpers/Date";
import { GridItem } from "../stories/GridItem/GridItem";

export const DailyGrid = () => {
  const { loading, error, data } = useQuery<Dailies>(DAILIES);
  const [writtenToday, setWrittenToday] = useState(false);
  // const [dailies, setDailies] = useState()

  useEffect(() => {
    if (loading || error || !data || !data!.dailies || !data!.dailies!.nodes) {
      return;
    }

    if (IsToday(data.dailies.nodes[0].dateCreated)) {
      setWrittenToday(true);
    }
  }, [data]);

  const getGrid = (): JSX.Element[] => {
    if (loading || error || !data || !data!.dailies || !data!.dailies!.nodes) {
      return [];
    }

    let res: JSX.Element[] = [];

    data.dailies.nodes.map((daily: Dailies_dailies_nodes) => {
      res = res.concat(
        <GridItem
          key={Number.parseInt(daily.id)}
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
        rowGap: "20px",
        border: "1px solid blue",
        gridTemplateColumns: "50%" /* width */,
      }}
    >
      {writtenToday ? (
        <div></div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          <GridItem isToday={true} isEditing={true} />
        </div>
      )}

      {getGrid()}
    </div>
  );
};
