import React from "react";

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
        // padding: "20px",
      }}
    >
      <h3>{props.summary}</h3>
      <h3>{props.dateCreated}</h3>
    </div>
  );
};
