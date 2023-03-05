import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/movieSlice";
import detailReducer from "./reducers/detailSlice";

export default configureStore({
  reducer: {
    movies: moviesReducer,
    detail: detailReducer,
  },
});
