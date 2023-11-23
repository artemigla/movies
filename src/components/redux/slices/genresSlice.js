import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../../../constants/CONSTANTS";

const initialState = {
    genres: []
}

export const getGenreApi = createAsyncThunk(
    'genres/getGenreApi',
    async (id, { dispatch }) => {
        const response = await axios.get(`${BASE_URL}movie/${id}?api_key=${KEY}`)
        console.log('response.data', response.data);
        dispatch(setGenres(response.data))
    }
)

export const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {
        setGenres: (state, action) => {
            state.genres = action.payload
        }
    }
})

export const { setGenres } = genresSlice.actions;
export default genresSlice.reducer;