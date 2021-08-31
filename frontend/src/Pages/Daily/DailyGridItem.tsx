import React from "react";
import { convertDate } from "../../helpers/Date";

interface DailyGridItemProps {
  id: number;
  summary: string;
  dateCreated: string;
}

export const DailyGridItem = (props: DailyGridItemProps) => {
  return (
    <div
      style={{
        border: "1px solid black",
        minWidth: "100%",
        // height: "500px",
        padding: "0px 20px",
      }}
    >
      <h3>{convertDate(props.dateCreated)}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.3fr 1fr",
          columnGap: "20px",
          justifyContent: "space-evenly",
        }}
      >
        <div>summary</div>
        <div>{props.summary}</div>
      </div>
    </div>
  );
};
