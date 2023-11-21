import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../../../constants/CONSTANTS";

const initialState = {
    detailtv: {}
}

export const getDetailTvThunk = createAsyncThunk(
    'detailtv/getDetailTvThunk',
    async (id, { dispatch }) => {
        const response = await axios.get(`${BASE_URL}/tv/${id}?api_key=${KEY}`)
        dispatch(setDetailTv(response.data))
    }
)

export const detailtvSlice = createSlice({
    name: 'detailtv',
    initialState,
    reducers: {
        setDetailTv: (state, action) => {
            state.detailtv = action.payload
        }
    }
})

export const { setDetailTv } = detailtvSlice.actions;
export default detailtvSlice.reducer