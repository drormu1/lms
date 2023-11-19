import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState, useEffect, ChangeEvent } from "react";
import { User, fetchInit, initSelector } from "../features/init/initSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AsyncThunkAction, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { Checkbox } from "@mui/material";
import styles from "./SubjectSelector.module.scss";
import { SearchSelector, setSubjects } from "../features/search/searchSlice";
import { getGridSingleSelectOperators } from "@mui/x-data-grid";

export function SubjectSelector() {
  const [metadata, setMetadata] = useState<Array<User>>([]);
  const selectorInit = useAppSelector(initSelector);
  const selectorSearch = useAppSelector(SearchSelector);

  const dispatch = useAppDispatch();

  const subjects = selectorInit?.metadata?.subjects || [];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    //  if (e == null) return;

    console.log(e.target.value);
    dispatch(setSubjects(e.target.id));
  };

  const isSelected = (a: string) => {
    return selectorSearch?.selectedSubjects?.includes(a);
  };

  return (
    <>
      <Typography className={styles.legendLabel}>נושאים</Typography>
      <div className={styles.aggsGroupBox}>
        <br />
        <Box sx={{ flexGrow: 1 }}>
          {subjects.map((a) => (
            <div key={a}>
              <Checkbox
                checked={isSelected(a)}
                className={styles.aggCheck}
                id={a}
                name={a}
                onChange={(e) => onChange(e)}
              />
              {a}
            </div>
          ))}
        </Box>
      </div>
    </>
  );
}
