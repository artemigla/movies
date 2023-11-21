import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import actorsSlice from "../slices/actorsSlice";
import detailSlice from "../slices/detailSlice";
import moviesSlice from "../slices/moviesSlice";
import recommendationsSlice from "../slices/recommendationsSlice";
import reviewsSlice from "../slices/reviewsSlice";
import videoSlice from "../slices/videoSlice";
import tvSlice from "../slices/tvSlice";
import genresSlice from "../slices/genresSlice";
import personSlice from "../slices/personSlice";
import detailtvSlice from "../slices/detailtvSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    detail: detailSlice,
    video: videoSlice,
    reviews: reviewsSlice,
    actors: actorsSlice,
    recommendations: recommendationsSlice,
    tvshow: tvSlice,
    genres: genresSlice,
    person: personSlice,
    detailtv: detailtvSlice
  },
  middleware: [thunk]
})