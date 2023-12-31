import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState, useEffect, ChangeEvent } from "react";
import { fetchInit, metadataSelector } from "../features/init/initSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AsyncThunkAction, Dispatch, AnyAction } from "@reduxjs/toolkit";
import { Checkbox, TextField } from "@mui/material";
import styles from "./MultiSelect.module.scss";
import {
  AggsSelector,
  ResultsSelector,
  SelectedAggsSelector,
  setAggs,
  TotalSelector,
} from "../features/search/searchSlice";
import { getGridSingleSelectOperators } from "@mui/x-data-grid";
import _ from "lodash";

export function MultiSelect(props: any) {
  //const [metadata, setMetadata] = useState<Array<User>>([]);
  const selectorMetadata = useAppSelector(metadataSelector);
  const selectedAggsSelector = useAppSelector(SelectedAggsSelector);
  const aggsSelector = useAppSelector(AggsSelector);
  const resultSelector = useAppSelector(ResultsSelector);

  const dispatch = useAppDispatch();

  const [minifier, setMinifer] = useState<string>("");
  // const [values, setValues] = useState<Array<string>>([]);
  // setValues(selectorInit?.metadata?.aggregations[props.agg] || []);
  let values = selectorMetadata?.aggregations[props.agg] || [];
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
      !_.isEmpty(selectedAggsSelector) &&
      selectedAggsSelector[props.agg]?.length > 0
    ) {
      //console.log("a: " + a);
      return selectedAggsSelector[props.agg]?.includes(a);
    } else {
      return false;
    }
  };

  const getCount = (a: string) => {
    if (_.isEmpty(aggsSelector) || _.isEmpty(resultSelector)) return "";
    //const agg = aggsSelector["aggs_"].find((agg: any) => agg.key === a);
    const count = aggsSelector["aggs_" + props.agg].buckets.find(
      (agg: any) => agg.key === a
    )?.doc_count;
    if (count == null || count == 0) return "";
    return `(${count})`;
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
                <span className={styles.aggCount}>{getCount(a)}</span>
              </div>
            ))}
        </Box>
      </div>
    </>
  );
}
