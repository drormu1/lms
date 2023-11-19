import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export interface User {
    id: number,
    name: string,
    email: string
}
export interface InitState {
    loading: boolean;
    metadata: Metadata | undefined;
    error: string | undefined;
}
const initialState: InitState = {
    loading: false,
    metadata: undefined,
    error: undefined,
}

export interface Metadata {
    userId: string | undefined;
    subjects: Array<string>;
    comments: Array<string>;

}

export const fetchInit = createAsyncThunk(
    "init/fetchInit",
    () => {
        const url = import.meta.env.VITE_API_URL as string;
        const res = fetch(`${url}/init`).then(data => data.json());
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
        builder.addCase(fetchInit.fulfilled, (state, action: PayloadAction<Metadata>) => {
            state.loading = false;
            state.metadata = action.payload;
        });
        builder.addCase(fetchInit.rejected, (state, action) => {
            state.loading = false;
            state.metadata = undefined;
            state.error = action.error.message;
        });
    },
    reducers: {}
})
export const initSelector = (state: RootState) => state.initReducer;
export default initSlice.reducer;