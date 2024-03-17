import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    url: {}
}

export const mainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        getApiConfiguration: (state, { payload }) => {
            state.url = payload;
        }
    }
});

export const { getApiConfiguration } = mainSlice.actions;
export default mainSlice.reducer;