import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  SelectedRowSelector,
  ResultsSelector,
} from "../features/search/searchSlice";
import { useAppSelector } from "../store/store";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";
import _ from "lodash";

export default function ParentCard() {
  const selectedRodSelector = useAppSelector(SelectedRowSelector);
  const resultsSelector = useAppSelector(ResultsSelector);

  const rowId: string = selectedRodSelector;

  const row = !_.isEmpty(resultsSelector)
    ? _.find(resultsSelector, (a) => a.id === rowId)
    : null;
  console.log("rowId: " + rowId);
  // useEffect(() => {
  //   //console.log("rowId: " + rowId);
  // }, [rowId]);

  return (
    <>
      {row ? (
        <Box sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {row?.id} - {row?.email}
            </Typography>
            <Typography variant="h5" component="div">
              {row?.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
            <Typography variant="body2">
              <br />
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Box>
      ) : null}
    </>
  );
}
