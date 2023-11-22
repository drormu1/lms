import * as React from "react";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../store/store";
import { SearchSelector, setSelectedRow } from "../features/search/searchSlice";

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
  { field: "id", headerName: "מזהה", width: 130 },
  { field: "name", headerName: "שם", width: 130 },
  { field: "rank", headerName: "דרגה", width: 130 },
  { field: "city", headerName: "עיר", width: 130 },
];

export default function Results() {
  const dispatch = useAppDispatch();
  const selectorSearch = useAppSelector(SearchSelector);
  const results = selectorSearch?.results || [];

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    console.log(`Movie "${params.row.id}" clicked`);
    dispatch(setSelectedRow(params.row.id));
  };

  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <DataGrid
        rows={results}
        onRowClick={handleRowClick}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 100]}
      />
    </div>
  );
}
