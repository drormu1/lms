import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";


export interface SearchState {
    results: Array<string>;
    term: string;
    page: number;
    size: number;
    subjects: Array<string>;
    selectedSubjects: Array<string>;


}
const initialState: SearchState = {
    results: [],
    term: '',
    selectedSubjects: [],

    page: 0,
    size: 10,
    subjects: [],

}




export const fetchSearch = createAsyncThunk(
    "search/fetchSearch",
    () => {
        const res = fetch('https://dummyjson.com/products').then(data => data.json());
        return res;
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
        setSubjects: (state, action: PayloadAction<string>) => {
            const key = action.payload;
            var existKey = state.selectedSubjects.indexOf(key);
            existKey ? state.selectedSubjects.push(key) : state.selectedSubjects.splice(existKey, 1);
            console.log('subject : ' + action.payload);
        },

        clearAllAggs: (state) => {
            state.selectedSubjects = [];
            state.term = '';
        },

        submitAggs: (state) => {
            // state.selectedSubjects = [];
            // state.term = '';
        },
    },
})
export const SearchSelector = (state: RootState) => state.searchReducer;
export const { setTerm, setSubjects, clearAllAggs, submitAggs } = searchSlice.actions;
export default searchSlice.reducer;