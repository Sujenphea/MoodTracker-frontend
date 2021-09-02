import { useQuery } from "@apollo/client";
import { createStyles, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { classicNameResolver } from "typescript";
import { DAILIES } from "../../api/queries";
import {
  Dailies,
  Dailies_dailies_nodes,
} from "../../api/__generated__/Dailies";
import { IsToday } from "../../helpers/Date";
import { GridItem } from "../GridItem/GridItem";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "grid",
      gridColumn: "1",
      alignItems: "center",
      justifyContent: "center",
      rowGap: "20px",
      border: "1px solid blue",
      gridTemplateColumns: "50%" /* width */,
    },
    todayGrid: {
      marginTop: "20px",
    },
  })
);

export interface GridContainerProps {
  data: Dailies | undefined;
  refetchData: () => void;
}

export const GridContainer = (props: GridContainerProps) => {
  const [writtenToday, setWrittenToday] = useState(false);
  const [dailies, setDailies] = useState<JSX.Element[]>([]);
  const classes = useStyles();

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
    <div className={classes.root}>
      {writtenToday ? (
        <div></div>
      ) : (
        <div className={classes.todayGrid}>
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
