import React, { useState } from "react";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      border: "1px solid black",
      minWidth: "100%",
      maxWidth: "100%",
      minHeight: "200px",
      padding: "0px 20px",
      marginTop: "20px",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    textArea: {
      display: "grid",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "1fr",
      },
      [theme.breakpoints.up("md")]: {
        gridTemplateColumns: "0.3fr 1fr",
      },

      columnGap: "20px",
      justifyContent: "space-evenly",
    },
    shortDate: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
      [theme.breakpoints.down("sm")]: {
        display: "block",
      },
    },
    longDate: {
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    button: {
      padding: "10px",
      border: "none",
      backgroundColor: "transparent",
      shadow: "none",
      color: "inherit",
      font: "inherit",
    },
  })
);

export const GridItem = (props: GridItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(props.summary);
  const [editDaily] = useMutation<EditDaily>(EDIT_DAILY);
  const [addDaily] = useMutation<AddDaily>(ADD_DAILY);
  const classes = useStyles();

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
    <div className={classes.root}>
      <div className={classes.topBar}>
        <h3 className={classes.longDate}>
          {convertDate(props.dateCreated ?? getDateToday())}
        </h3>
        <h3 className={classes.shortDate}>
          {props.dateCreated ?? getDateToday()}
        </h3>
        {isEditing ? (
          <button className={classes.button} onClick={() => handleSubmit()}>
            Submit
          </button>
        ) : (
          <button className={classes.button} onClick={() => handleEdit()}>
            Edit
          </button>
        )}
      </div>

      <div className={classes.textArea}>
        <Box display={{ xs: "none", sm: "none", md: "block" }}>summary</Box>
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
