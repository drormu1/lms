import React, { useState } from "react";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  ResultsSelector,
  setSelectedRow,
  setPaginationData,
  TotalSelector,
  fetchSearch,
} from "../features/search/searchSlice";
import { heIL } from "@mui/x-data-grid";
import { heIL as pickersHeIL } from "@mui/x-date-pickers/locales";
import { heIL as coreHeIL } from "@mui/material/locale";
import { TextField } from "@mui/material";
import { Config } from "../../../shared/Config";

// const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 90,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
// ];

const columns: GridColDef[] = [
  { field: "id", headerName: "מזהה", width: 230 },
  { field: "name", headerName: "שם", width: 130 },
  { field: "rank", headerName: "דרגה", width: 130 },
  { field: "city", headerName: "עיר", width: 130 },
];

export default function Results() {
  const [filter, setFilter] = useState("");

  const dispatch = useAppDispatch();
  const resultsSelector = useAppSelector(ResultsSelector);
  const totalSelector = useAppSelector(TotalSelector);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    console.log(`Movie "${params.row.id}" clicked`);
    dispatch(setSelectedRow(params.row.id));
  };

  ///

  const [rowCountState, setRowCountState] = React.useState(totalSelector || 0);

  React.useEffect(() => {
    setRowCountState((prevRowCountState) =>
      totalSelector !== undefined ? totalSelector : prevRowCountState
    );
  }, [totalSelector, setRowCountState]);

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: Config.pageSize || 100,
  });

  React.useEffect(() => {
    dispatch(setPaginationData(paginationModel));
    dispatch(fetchSearch(null));
  }, [paginationModel]);

  ///

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <div style={{ marginBottom: "10px" }}>
        <TextField
          dir="rtl"
          sx={{
            width: "45ch",
            padding: "1px",
          }}
          id="outlined-basic"
          placeholder="סנן"
          size="small"
          variant="outlined"
          InputLabelProps={{ shrink: false }}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <DataGrid
        localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
        rows={resultsSelector?.filter(
          (r) =>
            r.name.includes(filter) ||
            r.city.includes(filter) ||
            r.rank.includes(filter)
        )}
        onRowClick={handleRowClick}
        columns={columns}
        // initialState={{
        //   pagination: {
        //     paginationModel: { page: 0, pageSize: Config.pageSize || 100 },
        //   },
        // }}
        rowCount={rowCountState}
        pageSizeOptions={[Config.pageSize, Config.pageSize / 10]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={setPaginationModel}
      />
    </div>
  );
}
