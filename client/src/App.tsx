import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import { Grid, Container, Paper, Button } from "@mui/material";

import { styled } from "@mui/material/styles";
import Header from "./components/Header";
import SearchPanel from "./components/SearchPanel";
import Results from "./components/Results";
import ParentCard from "./components/ParentCard";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  return (
    <Container maxWidth={false}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={2}>
          <Paper>
            <SearchPanel />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper>
            <Results />
          </Paper>
        </Grid>
        <Grid item xs={12} md={2}>
          <Paper>
            <Header />
            <ParentCard />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
