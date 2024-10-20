import axios from "axios";
import { BASE_URL, TMDB_TOKEN } from "../constants/CONSTANTS";

const headers = {
    accept: 'application/json',
    Authorization: 'Bearer' + TMDB_TOKEN
}
export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        return err;
    }
};