import axios from "axios";
import { BASE_URL } from "../constants/CONSTANTS";

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            params,
        });

        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
};