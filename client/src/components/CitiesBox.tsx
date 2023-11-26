import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState, useEffect, ChangeEvent } from "react";
import { fetchInit, initSelector } from "../features/init/initSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AsyncThunkAction, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { Checkbox } from "@mui/material";
import styles from "./CitiesBox.module.scss";
import { SearchSelector, setCities } from "../features/search/searchSlice";
import { getGridSingleSelectOperators } from "@mui/x-data-grid";

export function CitiesBox() {
  //const [metadata, setMetadata] = useState<Array<User>>([]);
  const selectorInit = useAppSelector(initSelector);
  const selectorSearch = useAppSelector(SearchSelector);

  const dispatch = useAppDispatch();

  const cities = selectorInit?.metadata?.aggregations.cities || [];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    //  if (e == null) return;

    console.log(e.target.value);
    dispatch(setCities(e.target.id));
  };

  const isSelected = (a: string) => {
    return selectorSearch?.selectedCities?.includes(a);
  };

  return (
    <>
      <Typography className={styles.legendLabel}>cities</Typography>
      <div className={styles.aggsGroupBox}>
        <br />
        <Box sx={{ flexGrow: 1 }}>
          {cities.map((a) => (
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
