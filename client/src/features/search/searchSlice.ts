import { Paper } from '@mui/material';
import { fetchInit } from './../init/initSlice';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { ISearchState } from '../../../../shared/ISearchState';

import { ISearchRequest } from '../../../../shared/ISearchRequest';
import { ISearchResponse } from '../../../../shared/ISearchResponse';

import axios from 'axios';
import { ConstructionOutlined } from '@mui/icons-material';
import { BaseThunkAPI, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';

const initialState: ISearchState = {
    results: [],
    term: "כהן",

    total: 0,
    page: 0,
    size: 100,
    selectedRowInGrid: '',
    selectedAggs: {},

}

export const fetchSearch = createAsyncThunk(
    "search/fetchSearch",

    async (req2: any, thunkApi: any) => {
        try {
            const url = import.meta.env.VITE_API_URL as string;
            var state = thunkApi.getState();
            var req: ISearchRequest = {
                term: state.search.term,
                page: state.search.page,
                size: state.search.size,
                selectedAggs: state.search.selectedAggs
            }
            const response = await axios.post(`${url}/search`, req);
            console.log('searchRequest:', req)
            return response.data
        } catch (err) {
            console.log('searchRequest err:', err);
        }
    }
)

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {

        setTerm: (state, action: PayloadAction<string>) => {
            console.log('term : ' + action.payload);
            state.term = action.payload;
        },


        setAggs: (state, action: PayloadAction<any>) => {
            console.log('checked : ' + action.payload);
            const val = action.payload.value;
            const agg = action.payload.agg;

            if (!state?.selectedAggs[agg] || state?.selectedAggs[agg].length == 0) {
                state.selectedAggs[agg] = [val] as any;
            }
            else {
                var existVal = state?.selectedAggs[agg].indexOf(val);
                existVal < 0 ? state?.selectedAggs[agg].push(val) : state?.selectedAggs[agg].splice(existVal, 1);
            }


        },

        clearAllAggs: (state) => {

            state.selectedAggs = {};
            state.term = '';
            //state.results = [];
        },
        setSelectedRow: (state, action: PayloadAction<string>) => {
            state.selectedRowInGrid = action.payload;

        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearch.pending, (state) => {
            // state.loading = true;
        });
        builder.addCase(fetchSearch.fulfilled, (state, action: PayloadAction<ISearchResponse>) => {
            //state.loading = false;
            state.results = action.payload.results;
            state.total = action.payload.total;
        });
        builder.addCase(fetchSearch.rejected, (state, action) => {

            //state.loading = false;
            state.total = 0;
            state.results = [];
            //state.selectedRow = undefined;
            //state.error = action.error.message;
        });
    },

})
export const ResultsSelector = (state: RootState) => state.search.results;
export const TotalSelector = (state: RootState) => state.search.total;
export const PageSelector = (state: RootState) => state.search.page;
export const SizeSelector = (state: RootState) => state.search.size;
export const SelectedRowSelector = (state: RootState) => state.search.selectedRowInGrid;
export const SelectedAggsSelector = (state: RootState) => state.search.selectedAggs;
export const TermSelector = (state: RootState) => state.search.term;

//export const SearchSelector = (state: RootState) => state.searchReducer;
export const { setTerm, clearAllAggs, setSelectedRow, setAggs } = searchSlice.actions;
export default searchSlice.reducer;


// () => {


//     // const url = import.meta.env.VITE_API_URL as string;
//     // const res = fetch(`${url}/search`).then(data => data.json());
//     // //  const res = fetch('https://dummyjson.com/products').then(data => data.json()).then(data => data.map((item: any) => item.name));
//     // return res;
// }
// axios
//     .post(url, data, {
//         headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json;charset=UTF-8",
//         },
//     })
//     .then(({ data }) => {
//         console.log(data);
//     });

//GET
// async (data) => {
//     try {
//         const url = import.meta.env.VITE_API_URL as string;
//         const response = await axios.get(`${url}/search`)
//         return response.data
//     } catch (err) {
//         // custom error
//     }
// }