import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import videoSlice from "../slices/videoSlice";
import mainSlice from "../slices/mainSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
    video: videoSlice,
  },
  middleware: [thunk]
})