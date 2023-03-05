import { createSlice } from "@reduxjs/toolkit";
import { fetchDetail, fetchCredit } from "../thunks/detailThunks";

const detailSlice = createSlice({
  name: "detail",
  initialState: {
    movie: {},
    cast: [],
    crew: [],
    imdbRating: 0,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movie = action.payload;
        state.imdbRating = action.payload.vote_average.toFixed(1);
      })
      .addCase(fetchDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCredit.fulfilled, (state, action) => {
        state.cast = action.payload.cast;
        state.crew = action.payload.crew.filter(
          (member) => member.job === "Director" || member.job === "Writer"
        );
      });
  },
});

export default detailSlice.reducer;
