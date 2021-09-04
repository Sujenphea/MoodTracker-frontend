import { useQuery } from "@apollo/client";
import { createStyles, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { DAILIESBYUSERID } from "../../api/queries";
import { Dailies_dailies_nodes } from "../../api/__generated__/Dailies";
import { DailiesByUserId } from "../../api/__generated__/DailiesByUserId";
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
      gridTemplateColumns: "50%" /* width */,
    },
    todayGrid: {
      marginTop: "20px",
    },
  })
);

export interface GridContainerProps {
  userId: number;
}

export const GridContainer = (props: GridContainerProps) => {
  const [writtenToday, setWrittenToday] = useState(false);
  const [dailies, setDailies] = useState<JSX.Element[]>([]);
  const classes = useStyles();

  // get data

  const {
    loading: dloading,
    error: derror,
    data: ddata,
    refetch,
  } = useQuery<DailiesByUserId>(DAILIESBYUSERID, {
    variables: { id: props.userId },
  });

  useEffect(() => {
    if (!ddata || !ddata.dailiesByUserId || !ddata.dailiesByUserId.nodes) {
      return;
    }

    if (ddata.dailiesByUserId.nodes.length === 0) {
      return;
    }

    if (IsToday(ddata.dailiesByUserId.nodes[0].dateCreated)) {
      setWrittenToday(true);
    }

    let res: JSX.Element[] = [];

    ddata.dailiesByUserId.nodes.forEach((daily: Dailies_dailies_nodes) => {
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
  }, [ddata]);

  return (
    <div className={classes.root}>
      {writtenToday ? (
        <div></div>
      ) : (
        <div className={classes.todayGrid}>
          <GridItem
            isToday={true}
            isEditing={true}
            didSubmit={() => {
              refetch();
            }}
          />
        </div>
      )}

      {dailies}
    </div>
  );
};
