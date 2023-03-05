import { createSlice } from "@reduxjs/toolkit";
import { fetchTrendMovies, fetchSearchMovies } from "../thunks/movieThunks";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    trendMovies: [],
    searchMovies: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrendMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.trendMovies = action.payload;
      })
      .addCase(fetchTrendMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }) // build seacrh movies 
      .addCase(fetchSearchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchMovies = action.payload;
      })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
