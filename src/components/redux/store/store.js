import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import mainSlice from "../slices/mainSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
  },
  middleware: [thunk]
})