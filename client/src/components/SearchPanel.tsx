import { useState } from "react";
import {
  Grid,
  Container,
  Paper,
  Button,
  TextField,
  List,
  ListItemText,
  ListItem,
  OutlinedInput,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  SelectChangeEvent,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { makeStyles } from "@mui/styles";

import { ButtonsBar } from "./ButtonsBar";
import { TermBox } from "./TermBox";
import { MultiSelect } from "./MultiSelect";
//import "./SearchPanel.css";

function SearchPanel() {
  const classes = useStyles();
  const [count, setCount] = useState(0);
  const [personName, setPersonName] = useState<string[]>([]);

  // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  // // const MenuProps = {
  // //   PaperProps: {
  // //     style: {
  // //       maxHeight: 300,
  // //       width: 280,
  // //     },
  // //   },
  // // };

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, width: 280 }}>
          <ButtonsBar></ButtonsBar>

          <TermBox></TermBox>
          <br />
          {/* <CitiesBox></CitiesBox> */}
          <MultiSelect title="ערים" agg="birth_city"></MultiSelect>
          <MultiSelect title="דרגות" agg="rank"></MultiSelect>
          <ButtonsBar></ButtonsBar>
        </FormControl>
      </div>

      <FormControl sx={{ m: 1, width: 280 }}></FormControl>

      {/* <div style={{ clear: "both", height: 500 }}>
        <FormControl sx={{ m: 1, width: 280 }}>
          <InputLabel id="subject">בחר נושא</InputLabel>
          <Select
            labelId="subject-label"
            id="subject"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="בחר נושא" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
            variant="outlined"
            open
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Divider />
      <div className="card" style={{ clear: "both" }}>
        <div>count is {count}</div>
        <Button
          onClick={() => setCount((count) => count + 1)}
          variant="contained"
        >
          חפש
        </Button>
      </div> */}
    </>
  );
}

export default SearchPanel;

const useStyles = makeStyles((theme) => ({}));
