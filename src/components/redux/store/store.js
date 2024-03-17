import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import actorsSlice from "../slices/actorsSlice";
import recommendationsSlice from "../slices/recommendationsSlice";
import reviewsSlice from "../slices/reviewsSlice";
import videoSlice from "../slices/videoSlice";
import personSlice from "../slices/personSlice";
import mainSlice from "../slices/mainSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    video: videoSlice,
    reviews: reviewsSlice,
    actors: actorsSlice,
    recommendations: recommendationsSlice,
    person: personSlice,
  },
  middleware: [thunk]
})