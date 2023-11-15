import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../../../constants/CONSTANTS";

const initialState = {
  credits: []
}

export const getCreditsMovies = createAsyncThunk(
  'credits/getCreditsMovies',
  async (id, { dispatch }) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${KEY}`)
    dispatch(setCredits(response.data.cast))
  }
)

export const creditsSlice = createSlice({
  name: 'credits',
  initialState,
  reducers: {
    setCredits: (state, action) => {
      state.credits = action.payload
    }
  }
})

export const { setCredits } = creditsSlice.actions;
export default creditsSlice.reducer;