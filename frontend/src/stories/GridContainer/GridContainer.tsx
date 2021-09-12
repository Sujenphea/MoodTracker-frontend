import { useQuery } from "@apollo/client";
import { createStyles, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { DAILIESBYUSERID } from "../../api/queries";
// import { DAILIESBYUSERID } from "../../api/queries";
import {
  DailiesByUserId,
  DailiesByUserId_dailiesByUserId,
} from "../../api/__generated__/DailiesByUserId";
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
  userId: string;
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
    console.log("user id", props.userId);
  }, [props.userId]);

  useEffect(() => {
    console.log("dloading", dloading);
  }, [dloading]);

  useEffect(() => {
    console.log("derror", derror);
  }, [derror]);

  useEffect(() => {
    console.log("ddata", ddata);
    if (ddata) {
      console.log(ddata.dailiesByUserId);
    }
    if (
      !ddata ||
      !ddata.dailiesByUserId ||
      !ddata.dailiesByUserId ||
      ddata.dailiesByUserId == null
    ) {
      return;
    }

    if (ddata.dailiesByUserId.length === 0) {
      return;
    }

    if (IsToday(ddata.dailiesByUserId[0]!.dateCreated)) {
      setWrittenToday(true);
    }

    let res: JSX.Element[] = [];

    ddata.dailiesByUserId.forEach(
      (daily: DailiesByUserId_dailiesByUserId | null) => {
        res = res.concat(
          <GridItem
            key={Number.parseInt(daily!.id)}
            id={daily!.id}
            description={daily!.description}
            dateCreated={daily!.dateCreated}
          />
        );
      }
    );

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
