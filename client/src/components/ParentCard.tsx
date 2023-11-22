import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SearchSelector } from "../features/search/searchSlice";
import { useAppSelector } from "../store/store";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

export default function ParentCard() {
  const selectorSearch = useAppSelector(SearchSelector);

  const rowId =
    selectorSearch?.selectedRow != undefined
      ? selectorSearch?.selectedRow
      : undefined;
  const row = selectorSearch?.results?.find((row) => row.id == rowId);

  useEffect(() => {
    console.log("rowId " + rowId);
  }, [rowId]);

  return (
    <Box sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
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
  );
}
