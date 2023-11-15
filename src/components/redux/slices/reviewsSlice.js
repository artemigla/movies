import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../../../constants/CONSTANTS";

const initialState = {
  reviews: []
}

export const getReviewsToMovies = createAsyncThunk(
  'reviews/getReviewsToMovies',
  async (id, { dispatch }) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/reviews?api_key=${KEY}`)
    dispatch(setReviewsToMovies(response.data.results))
  }
)

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setReviewsToMovies: (state, action) => {
      state.reviews = action.payload;
    }
  }
})

export const { setReviewsToMovies } = reviewsSlice.actions;
export default reviewsSlice.reducer;