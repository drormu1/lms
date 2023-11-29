import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState, useEffect, ChangeEvent } from "react";
import { fetchInit, initSelector } from "../features/init/initSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AsyncThunkAction, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { Checkbox } from "@mui/material";
import styles from "./MultiSelect.module.scss";
import { SearchSelector, setAggs } from "../features/search/searchSlice";
import { getGridSingleSelectOperators } from "@mui/x-data-grid";

export function MultiSelect(props: any) {
  //const [metadata, setMetadata] = useState<Array<User>>([]);
  const selectorInit = useAppSelector(initSelector);
  const selectorSearch = useAppSelector(SearchSelector);

  const dispatch = useAppDispatch();

  const values = selectorInit?.metadata?.aggregations[props.agg] || [];
  //console.log("values" + values);

  //const cities = selectorInit?.metadata?.aggregations.cities || [];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    //  if (e == null) return;

    console.log(e.target.value);
    dispatch(setAggs({ agg: props.agg, value: e.target.id }));
  };

  const isSelected = (a: string) => {
    const agg = props.agg;
    return selectorSearch?.selectedAggs[agg]?.includes(a);
  };

  return (
    <>
      <Typography className={styles.legendLabel}>{props.title}</Typography>
      <div className={styles.aggsGroupBox}>
        <br />
        <Box sx={{ flexGrow: 1 }}>
          {values.map((a) => (
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
