import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface User {
    id: number,
    name: string,
    email: string
}
export interface InitState {
    loading: boolean;
    metadata: Array<User>;
    error: string | undefined;
}
const initialState: InitState = {
    loading: false,
    metadata: [],
    error: undefined,
}
export const fetchInit = createAsyncThunk(
    "init/fetchInit",
    () => {
        const res = fetch('https://jsonplaceholder.typicode.com/users').then(data => data.json());
        return res;
    }
)
const initSlice = createSlice({
    name: 'init',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchInit.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchInit.fulfilled, (state, action: PayloadAction<Array<User>>) => {
            state.loading = false;
            state.metadata = action.payload;
        });
        builder.addCase(fetchInit.rejected, (state, action) => {
            state.loading = false;
            state.metadata = [];
            state.error = action.error.message;
        });
    },
    reducers: {}
})
export const initSelector = (state: RootState) => state.initReducer;
export default initSlice.reducer;