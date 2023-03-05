import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDetail = createAsyncThunk(
  "detail/fetchDetail",
  async ({ id, language }) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=${language}`
    );
    const data = await response.json();
    return data;
  }
);

export const fetchCredit = createAsyncThunk(
  "credit/fechCredit",
  async ({ id }) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    return data;
  }
);
