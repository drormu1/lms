import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState, useEffect, ChangeEvent } from "react";
import { fetchInit, initSelector } from "../features/init/initSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AsyncThunkAction, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { Checkbox, TextField } from "@mui/material";
import styles from "./MultiSelect.module.scss";
import { SearchSelector, setAggs } from "../features/search/searchSlice";
import { getGridSingleSelectOperators } from "@mui/x-data-grid";
import _ from "lodash";

export function MultiSelect(props: any) {
  //const [metadata, setMetadata] = useState<Array<User>>([]);
  const selectorInit = useAppSelector(initSelector);
  const selectorSearch = useAppSelector(SearchSelector);

  const dispatch = useAppDispatch();

  const [minifier, setMinifer] = useState<string>("");
  // const [values, setValues] = useState<Array<string>>([]);
  // setValues(selectorInit?.metadata?.aggregations[props.agg] || []);
  let values = selectorInit?.metadata?.aggregations[props.agg] || [];
  console.log("values: MultiSelect " + values.length);
  // useEffect(() => {
  //   if (!_.isEmpty(minifier)) {
  //     //setValues(values.filter((str: string) => str.includes(minifier)));
  //     values = values.filter((str: string) => str.includes(minifier));
  //   }
  //   // else {
  //   //   setValues(selectorInit?.metadata?.aggregations[props.agg] || []);
  //   // }
  // }, [minifier]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    //  if (e == null) return;

    console.log(e.target.value);
    dispatch(setAggs({ agg: props.agg, value: e.target.id }));
  };

  const isSelected = (a: string) => {
    if (
      Object.keys(selectorSearch?.selectedAggs).length > 0 &&
      selectorSearch?.selectedAggs[props.agg]?.length > 0
    ) {
      //console.log("a: " + a);
      return selectorSearch?.selectedAggs[props.agg]?.includes(a);
    } else return false;
  };

  return (
    <>
      <div>
        <span className={styles.legendLabel}>
          {props.title}({values.length})
        </span>
        <input
          id="filter_{props.agg}"
          placeholder="מקד"
          style={{
            float: "left",
            border: "1px solid rgba(0, 0, 0, .1)",
            borderRadius: "3px",
            marginBottom: "3px",
          }}
          value={minifier}
          onChange={(e) => setMinifer(e.target.value)}
        />
      </div>
      <div className={styles.aggsGroupBox}>
        <br />
        <Box sx={{ flexGrow: 1 }}>
          {values
            .filter((str: string) => str.includes(minifier))
            .map((a) => (
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
