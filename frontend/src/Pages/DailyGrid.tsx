import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useEffect } from "react";
import { DAILIES } from "../api/queries";
import { Dailies, Dailies_dailies_nodes } from "../api/__generated__/Dailies";
import { IsToday } from "../helpers/Date";
import { GridItem } from "../stories/GridItem/GridItem";

interface DailyGridProps {
  data: Dailies | undefined;
  refetchData: () => void;
}

export const DailyGrid = (props: DailyGridProps) => {
  // const { loading, error, data, refetch } = useQuery<Dailies>(DAILIES);
  const [writtenToday, setWrittenToday] = useState(false);
  const [dailies, setDailies] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (!props.data || !props.data.dailies || !props.data.dailies.nodes) {
      return;
    }

    if (IsToday(props.data.dailies.nodes[0].dateCreated)) {
      setWrittenToday(true);
    }

    let res: JSX.Element[] = [];

    props.data.dailies.nodes.map((daily: Dailies_dailies_nodes) => {
      res = res.concat(
        <GridItem
          key={Number.parseInt(daily.id)}
          id={Number.parseInt(daily.id)}
          summary={daily.summary}
          dateCreated={daily.dateCreated}
        />
      );
    });

    setDailies(res);
  }, [props.data]);

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
          <GridItem
            isToday={true}
            isEditing={true}
            didSubmit={() => props.refetchData()}
          />
        </div>
      )}

      {dailies}
    </div>
  );
};
