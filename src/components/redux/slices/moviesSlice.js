import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY, PAGE } from "../../../constants/CONSTANTS";

const initialState = {
  movies: [],
}

export const getMoviesApi = createAsyncThunk(
  'movies/getMoviesApi',
  async (_, { dispatch }) => {
    const response = await axios.get(`${BASE_URL}movie/popular?`, {
      params: {
        api_key: KEY,
        page: PAGE
      }
    })
    dispatch(setMovies(response.data.results))
  }
)

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload
    },
  },
})

export const { setMovies } = moviesSlice.actions;
export default moviesSlice.reducer;