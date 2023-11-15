import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../../../constants/CONSTANTS";

const initialState = {
  video: {},
  isLoading: false
}

export const getVideoThunk = createAsyncThunk(
  'video/getVideoThunk',
  async (id, { dispatch }) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${KEY}&append_to_response=videos`)
    dispatch(setVideo(response.data))
  }
)

export const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setVideo: (state, { payload }) => {
      state.video = payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload
    }
  }
})

export const { setVideo, setLoading } = videoSlice.actions;
export default videoSlice.reducer;