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
import { setSubjects } from "../features/search/searchSlice";

export function SubjectSelector() {
  const [metadata, setMetadata] = useState<Array<User>>([]);
  const selectorInit = useAppSelector(initSelector);
  const dispatch = useAppDispatch();

  const aggs = selectorInit?.metadata;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    //  if (e == null) return;
    console.log(e.target.value);
    dispatch(setSubjects(e.target.value));
  };

  return (
    <>
      <Typography className={styles.legendLabel}>נושאים</Typography>
      <div className={styles.aggsGroupBox}>
        <br />
        <Box sx={{ flexGrow: 1 }}>
          {aggs.map((a) => (
            <div key={a.id}>
              <Checkbox
                value={a.email}
                className={styles.aggCheck}
                onChange={(e) => onChange(e)}
              />
              {a.email}
            </div>
          ))}
        </Box>
      </div>
    </>
  );
}
