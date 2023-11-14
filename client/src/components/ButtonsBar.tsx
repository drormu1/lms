import { useState } from "react";
import { TextField, FormControl, Typography, Button } from "@mui/material";
import SubjectSelector from "./SubjectSelector";
import styles from "./ButtonsBar.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
//import "./SearchPanel.css";
export function ButtonsBar() {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 280, display: "inline-block" }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={styles.button}
          startIcon={<SearchIcon titleAccess="נקה סננים " />}
        >
          &nbsp;הפעל סננים
        </Button>
        &nbsp;
        <Button
          variant="contained"
          color="primary"
          className={styles.button}
          size="small"
          style={{ background: "rgba(63,81,181,0.5)", float: "left" }}
          startIcon={<DeleteIcon titleAccess="נקה סננים" />}
        >
          &nbsp;נקה סננים
        </Button>
      </FormControl>
    </div>
  );
}
