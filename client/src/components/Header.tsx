import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useState, useEffect } from "react";
import { fetchInit, metadataSelector } from "../features/init/initSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { AsyncThunkAction, Dispatch, AnyAction } from "@reduxjs/toolkit";
import styles from "./Header.module.scss";

export default function Header() {
  const selectorMetadata = useAppSelector(metadataSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    handleFetchInit();
  }, []);

  function handleFetchInit() {
    dispatch(fetchInit());
  }

  // const myInitFunction = () => {
  //   console.log("Component initialized");
  //   // You can perform any initialization logic here
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {import.meta.env.VITE_APP_TITLE}
            <br />
            {selectorMetadata?.userId}
          </Typography>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
