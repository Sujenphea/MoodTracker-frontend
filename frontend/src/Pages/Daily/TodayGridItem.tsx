import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { DAILY } from "../../api/fragments";
import { ADD_DAILY } from "../../api/mutations";
import { AddDaily } from "../../api/__generated__/AddDaily";
import { convertDate } from "../../helpers/Date";

export const TodayGridItem = () => {
  const [summary, setSummary] = useState("");
  const [addDaily] = useMutation<AddDaily>(ADD_DAILY);

  const getDateToday = () => {
    const today = new Date(Date.now());

    // modify date to include padding
    let date = today.getDate().toString();
    if (date.length === 1) {
      date = "0" + date;
    }

    // month is 0-indexed
    return date + "." + (today.getMonth() + 1) + "." + today.getFullYear();
  };

  const handleSubmit = async () => {
    if (summary === "") {
      return;
    }

    try {
      await addDaily({
        variables: {
          summary: summary,
        },
      });
      console.log("submitting");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        border: "1px solid black",
        minWidth: "100%",
        maxWidth: "100%",
        minHeight: "200px",
        padding: "0px 20px",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>{convertDate(getDateToday())}</h3>
        <button
          style={{ padding: "10px" }}
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.3fr 1fr",
          columnGap: "20px",
          justifyContent: "space-evenly",
        }}
      >
        <div>summary</div>
        <form>
          <span
            role="textbox"
            contentEditable
            style={{
              display: "inline",
              width: "100%",
              wordBreak: "break-word",
            }}
            defaultValue={summary}
            onInput={(v) => {
              setSummary(v.currentTarget.textContent ?? "");
            }}
          ></span>
        </form>
      </div>
    </div>
  );
};
