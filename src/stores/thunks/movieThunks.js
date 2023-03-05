import { createAsyncThunk } from "@reduxjs/toolkit";
export const fetchTrendMovies = createAsyncThunk(
  "movies/fetchTrendMovies",
  async ({ language }) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const data = await response.json();
    return data.results;
  }
);

export const fetchSearchMovies = createAsyncThunk(
  "movies/fetchSearchMovies",
  async ({ language, search }) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=${language}&query=${search}`
    );
    const data = await response.json();
    return data.results;
  }
);
