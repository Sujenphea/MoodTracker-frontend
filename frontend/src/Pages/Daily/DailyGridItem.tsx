import { useMutation } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { EDIT_DAILY } from "../../api/mutations";
import { EditDaily } from "../../api/__generated__/EditDaily";
import { convertDate } from "../../helpers/Date";

interface DailyGridItemProps {
  id: number;
  summary: string;
  dateCreated: string;
}

export const DailyGridItem = (props: DailyGridItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(props.summary);
  const [editDaily] = useMutation<EditDaily>(EDIT_DAILY);

  const handleEdit = () => {
    setIsEditing((v) => {
      return !v;
    });
  };

  const handleSubmit = async () => {
    if (currentText === "" || currentText === props.summary) {
      return;
    }

    setIsEditing(false);

    try {
      await editDaily({
        variables: {
          id: props.id,
          summary: currentText,
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
        marginTop: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>{convertDate(props.dateCreated)}</h3>
        {isEditing ? (
          <button style={{ padding: "10px" }} onClick={() => handleSubmit()}>
            Submit
          </button>
        ) : (
          <button style={{ padding: "10px" }} onClick={() => handleEdit()}>
            Edit
          </button>
        )}
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
        {isEditing ? (
          <form>
            <span
              role="textbox"
              contentEditable
              suppressContentEditableWarning
              style={{
                display: "inline",
                width: "100%",
                wordBreak: "break-word",
              }}
              onInput={(v) => setCurrentText(v.currentTarget.textContent ?? "")}
            >
              {props.summary}
            </span>
          </form>
        ) : (
          <div>{currentText}</div>
        )}
      </div>
    </div>
  );
};
