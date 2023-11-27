import { Paper } from '@mui/material';
import { fetchInit } from './../init/initSlice';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { ISearchState } from '../../../../shared/ISearchState';
import { ISearchRequest } from '../../../../shared/ISearchRequest';
import { ISearchResponse } from '../../../../shared/ISearchResponse';

import axios from 'axios';

const initialState: ISearchState = {
    results: [],
    term: "כהן",
    selectedCities: [],
    total: 0,
    page: 0,
    size: 10,
    selectedRowInGrid: 0
}

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

export const fetchSearch = createAsyncThunk(
    "search/fetchSearch",

    async (searchRequest: ISearchRequest) => {
        try {
            // const searchRequest: ISearchRequest = {
            //     page: searchReq.page,
            //     size: searchReq.size,
            //     selectedSubjects: searchReq.selectedSubjects,
            //     term: searchReq.term

            // };

            const url = import.meta.env.VITE_API_URL as string;

            const response = await axios.post(`${url}/search`, searchRequest as ISearchRequest)
            return response.data
        } catch (err) {
            // custom error
        }
    }
)

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



const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {

        setTerm: (state, action: PayloadAction<string>) => {
            console.log('term : ' + action.payload);
            state.term = action.payload;
        },
        setCities: (state, action: PayloadAction<string>) => {
            const key = action.payload;
            var existKey = state.selectedCities.indexOf(key);
            existKey ? state.selectedCities.push(key) : state.selectedCities.splice(existKey, 1);
            console.log('subject : ' + action.payload);
        },

        clearAllAggs: (state) => {
            state.selectedCities = [];
            state.term = '';
            state.results = [];
        },
        setSelectedRow: (state, action: PayloadAction<number>) => {
            state.selectedRowInGrid = action.payload;

        },

        // submitAggs: (state) => {
        //     fetchSearch()
        //     debugger

        //     // state.selectedSubjects = [];
        //     // state.term = '';
        // },


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
export const SearchSelector = (state: RootState) => state.searchReducer;
export const { setTerm, setCities, clearAllAggs, setSelectedRow } = searchSlice.actions;
export default searchSlice.reducer;