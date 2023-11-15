import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../../../constants/CONSTANTS";

const initialState = {
  detail: {}
}

export const getDetailMovie = createAsyncThunk(
  'detail/getDetailMovie',
  async (id, { dispatch }) => {
    const response = await axios.get(`${BASE_URL}movie/${id}?api_key=${KEY}`)
    dispatch(setDetail(response.data))
    return response.data
  }
)

const detailSlice = createSlice({
  name: 'detail',
  initialState,
  reducers: {
    setDetail: (state, { payload }) => {
      state.detail = payload
    }
  }
})

export const { setDetail } = detailSlice.actions;
export default detailSlice.reducer;