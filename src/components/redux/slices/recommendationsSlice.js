import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../../../constants/CONSTANTS";

const initialState = {
  recommendations: [],
}

export const getRecommendationsMovies = createAsyncThunk(
  'recommendations/getRecommendationsMovies',
  async (id, { dispatch }) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/recommendations?api_key=${KEY}`)
    dispatch(setRecommendationsMovies(response.data.results));
  }
)

export const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    setRecommendationsMovies: (state, action) => {
      state.recommendations = action.payload
    }
  }
})

export const { setRecommendationsMovies } = recommendationsSlice.actions;
export default recommendationsSlice.reducer