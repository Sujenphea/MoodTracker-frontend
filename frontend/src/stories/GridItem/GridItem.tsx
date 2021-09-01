import React, { Props, useState } from "react";
import { IconButton } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { ADD_DAILY, EDIT_DAILY } from "../../api/mutations";
import { EditDaily } from "../../api/__generated__/EditDaily";
import { convertDate, getDateToday } from "../../helpers/Date";
import { useEffect } from "react";
import { AddDaily } from "../../api/__generated__/AddDaily";

export interface GridItemProps {
  id?: number;
  summary?: string;
  dateCreated?: string;
  isEditing?: boolean;
  isToday?: boolean;
  didSubmit?: () => void;
}

export const GridItem = (props: GridItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(props.summary);
  const [editDaily] = useMutation<EditDaily>(EDIT_DAILY);
  const [addDaily] = useMutation<AddDaily>(ADD_DAILY);

  useEffect(() => {
    if (props.isEditing) {
      setIsEditing(true);
    }
  }, [props.isEditing]);

  const handleEdit = () => {
    setIsEditing((v) => {
      return !v;
    });
  };

  const handleSubmit = async () => {
    if (currentText === "" || currentText === props.summary) {
      setIsEditing(false);
      return;
    }

    if (props.isToday && props.summary === undefined) {
      addDaily({
        variables: {
          summary: currentText,
        },
      })
        .then(() => {
          if (props.didSubmit) {
            props.didSubmit();
          }
        })
        .catch((e) => {
          console.log(e);
        });

      setIsEditing(false);
      return;
    }

    try {
      editDaily({
        variables: {
          id: props.id,
          summary: currentText,
        },
      });
      console.log("submitting");
    } catch (e) {
      console.log(e);
    }

    setIsEditing(false);
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
        <h3>{convertDate(props.dateCreated ?? getDateToday())}</h3>
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
