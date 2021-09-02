/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import React, { useRef, useState } from "react";
import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";
import { useMutation } from "@apollo/client";
import { ADD_DAILY, EDIT_DAILY } from "../../api/mutations";
import { EditDaily } from "../../api/__generated__/EditDaily";
import { convertDate, getDateToday } from "../../helpers/Date";
import { useEffect } from "react";
import { AddDaily } from "../../api/__generated__/AddDaily";

export interface GridItemProps {
  isDarkMode: boolean;
  id?: number;
  summary?: string;
  dateCreated?: string;
  isEditing?: boolean;
  isToday?: boolean;
  didSubmit?: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      cursor: "pointer",
    },
    textField: {
      display: "inline",
      width: "100%",
      wordBreak: "break-word",
    },
  })
);

export const GridItem = (props: GridItemProps) => {
  const rootStyle = css({
    background: props.isDarkMode
      ? "rgba(50,50,50,0.8)"
      : "rgba(250,250,250,0.8)",
    borderRadius: "10px",
    // border: "1px solid black",
    minWidth: "100%",
    maxWidth: "100%",
    minHeight: "200px",
    padding: "0px 20px",
    marginTop: "20px",
  });

  const summaryStyle = css({
    color: props.isDarkMode
      ? "rgba(200, 200, 200, 0.88)"
      : "rgba(100, 100, 100, 0.7)",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentText, setCurrentText] = useState(props.summary);
  const [editDaily] = useMutation<EditDaily>(EDIT_DAILY);
  const [addDaily] = useMutation<AddDaily>(ADD_DAILY);

  const textfieldRef = useRef<HTMLSpanElement>(null);
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
    <div css={rootStyle}>
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
        <Box
          css={summaryStyle}
          display={{ xs: "none", sm: "none", md: "block" }}
        >
          summary
        </Box>
        {isEditing ? (
          <form>
            <span
              role="textbox"
              contentEditable
              ref={textfieldRef}
              suppressContentEditableWarning
              className={classes.textField}
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
