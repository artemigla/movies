import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../../../constants/CONSTANTS";

const initialState = {
  actors: []
}

export const getActorsMovies = createAsyncThunk(
  'credits/getActorsMovies',
  async (id, { dispatch }) => {
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${KEY}`)
    dispatch(setActors(response.data.cast))
  }
)

export const actorsSlice = createSlice({
  name: 'credits',
  initialState,
  reducers: {
    setActors: (state, action) => {
      state.actors = action.payload
    }
  }
})

export const { setActors } = actorsSlice.actions;
export default actorsSlice.reducer;