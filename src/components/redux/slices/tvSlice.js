// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// import { BASE_URL, KEY } from "../../../constants/CONSTANTS";

// const initialState = {
//     tvshow: []
// }

// export const getTvShow = createAsyncThunk(
//     'tvshow/getTvShow',
//     async (_, {dispatch}) => {
//         const response = await axios.get(`${BASE_URL}discover/tv?api_key=${KEY}`)
//         dispatch(setTvshow(response.data.results));
//     }
// )

// export const tvSlice = createSlice({
//     name: 'tvshow',
//     initialState,
//     reducers: {
//         setTvshow: (state, action) => {
//             state.tvshow = action.payload;
//         }
//     }
// })

// export const {setTvshow} = tvSlice.actions;
// export default tvSlice.reducer;