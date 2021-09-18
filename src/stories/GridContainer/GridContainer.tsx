import { createStyles, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  DailiesByUserId,
  DailiesByUserId_dailiesByUserId,
} from "../../api/__generated__/DailiesByUserId";
import { IsToday } from "../../helpers/Date";
import { sortDailies } from "../../helpers/SortDailies";
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
  dailies: DailiesByUserId | undefined;
  refetchData: () => void;
}

export const GridContainer = (props: GridContainerProps) => {
  const [writtenToday, setWrittenToday] = useState(false);
  const [dailies, setDailies] = useState<JSX.Element[]>([]);
  const classes = useStyles();

  useEffect(() => {
    if (
      props.dailies === undefined ||
      props.dailies.dailiesByUserId === null ||
      props.dailies.dailiesByUserId!.length === 0
    ) {
      return;
    }

    const sortedDailies = sortDailies(props.dailies!.dailiesByUserId!);

    if (IsToday(sortedDailies[0]!.dateCreated)) {
      setWrittenToday(true);
    }

    let res: JSX.Element[] = [];

    sortedDailies.forEach((daily: DailiesByUserId_dailiesByUserId | null) => {
      res = res.concat(
        <GridItem
          key={daily!.id}
          id={daily!.id}
          description={daily!.description}
          dateCreated={daily!.dateCreated}
        />
      );
    });

    setDailies(res);
  }, [props.dailies]);

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
              props.refetchData();
            }}
          />
        </div>
      )}

      {dailies}
    </div>
  );
};
