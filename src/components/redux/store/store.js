import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import creditsSlice from "../slices/creditsSlice";
import detailSlice from "../slices/detailSlice";
import moviesSlice from "../slices/moviesSlice";
import recommendationsSlice from "../slices/recommendationsSlice";
import reviewsSlice from "../slices/reviewsSlice";
import videoSlice from "../slices/videoSlice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    detail: detailSlice,
    video: videoSlice,
    reviews: reviewsSlice,
    credits: creditsSlice,
    recommendations: recommendationsSlice,
  },
  middleware: [thunk]
})