import { useState } from "react";
import { TextField, FormControl, Typography, Button } from "@mui/material";

import styles from "./ButtonsBar.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../store/store";
import { clearAllAggs, fetchSearch } from "../features/search/searchSlice";
import { ISearchRequest } from "../../../shared/ISearchRequest";
//import "./SearchPanel.css";
export function ButtonsBar() {
  const dispatch = useAppDispatch();
  //const searchState = useAppSelector(SearchSelector);

  const clearAggs = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    //  if (e == null) return;
    console.log("clearAggs " + e.target);
    dispatch(clearAllAggs());
  };

  const submitAllAggs = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    //  if (e == null) return;
    console.log("submitAggs " + e.target);
    // var request: ISearchRequest = {
    //   term: searchState.term,
    //   selectedAggs: searchState.selectedAggs,
    //   page: searchState.page,
    //   size: searchState.size,
    // };
    dispatch(fetchSearch(null));
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 280, display: "inline-block" }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={styles.button}
          startIcon={<SearchIcon titleAccess="הפעל סננים " />}
          onClick={submitAllAggs}
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
          onClick={clearAggs}
        >
          &nbsp;נקה סננים
        </Button>
      </FormControl>
    </div>
  );
}
function dispatch(arg0: { type: string }) {
  throw new Error("Function not implemented.");
}
