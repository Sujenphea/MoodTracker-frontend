import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { DAILIES } from "../../api/queries";
import {
  Dailies,
  Dailies_dailies_nodes,
} from "../../api/__generated__/Dailies";
import { IsToday } from "../../helpers/Date";
import { DailyGridItem } from "./DailyGridItem";
import { TodayGridItem } from "./TodayGridItem";

export const DailyGrid = () => {
  const { loading, error, data } = useQuery<Dailies>(DAILIES);
  const [writtenToday, setWrittenToday] = useState(false);

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
      // if (i === 0 && IsToday(daily.dateCreated)) {
      //   setWrittenToday(true);
      // }

      res = res.concat(
        <DailyGridItem
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
        rowGap: "30px",
        border: "1px solid blue",
        // gridTemplateRows: "minmax(300px, auto)",
        gridTemplateColumns: "50%" /* width */,
      }}
    >
      {writtenToday ? <div></div> : <TodayGridItem />}

      {getGrid()}
      {/* <DailyGridItem id={1} summary={"hello"} /> */}
    </div>
  );
};
