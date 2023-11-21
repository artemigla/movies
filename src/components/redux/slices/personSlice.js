import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, KEY } from "../../../constants/CONSTANTS";

const initialState = {
    person: {}
}

export const getPersonApi = createAsyncThunk(
    'person/getPersonApi',
    async (id, { dispatch }) => {
        const response = await axios.get(`${BASE_URL}/person/${id}?api_key=${KEY}`)
        dispatch(setPerson(response.data));
    }
)

export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        setPerson: (state, action) => {
            state.person = action.payload
        }
    }
})

export const { setPerson } = personSlice.actions;
export default personSlice.reducer;