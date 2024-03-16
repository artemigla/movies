import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: []
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        getMovies: (state, { payload }) => {
            state.url = payload;
        }
    }
});

export const { getMovies } = mainSlice.actions;
export default mainSlice.reducer;