import { ChangeEvent, useEffect, useState } from "react";
import { TextField, FormControl, Typography, Button } from "@mui/material";
import styles from "./TermBox.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../store/store";
import { SearchSelector, setTerm } from "../features/search/searchSlice";
import searchSlice from "../features/search/searchSlice";
//import "./SearchPanel.css";
export function TermBox() {
  //const [term, setTerm] = useState<string>();
  const selectorSearch = useAppSelector(SearchSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // handleFetchInit();
  }, []);

  // function handleFetchInit() {
  //   dispatch(fetchInit());
  // }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e == null) return;
    console.log(e.target.value);
    dispatch(setTerm(e.target.value));
  };
  return (
    <>
      <Typography className={styles.legendLabel}>תאור וכותרת</Typography>
      <TextField
        inputProps={{
          style: {
            height: "70px",
            margin: "-5px -5px -5px -5px",
          },
        }}
        onChange={onChange}
        id="outlined-multiline-flexible"
        variant="outlined"
        label=""
        multiline
        maxRows={8}
        value={selectorSearch.term}
      />
    </>
  );
}
