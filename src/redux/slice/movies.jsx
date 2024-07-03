import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovies = createAsyncThunk(
  "get all movies",
  async (pageNumber = 1, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/popular",
        params: { language: "en-US", page: pageNumber },
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmJiNzBjZDlkMGFkZTE4ZWQ1YmYyMWJkMTI4ZDZmMyIsInN1YiI6IjY1Y2I0MDQ3MWMwOWZiMDEzMDM3YWQ2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6-DCPLuzuW-Sl_h6WCs1VeoS5n4fAD_bAZ3EDfex8d0",
        },
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
const data = {
  moviesData: [],
  loadingMovies: true,
  error: null,
  pageNumber: 1,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState: data,
  reducers: {
    increment: (state) => {
      state.pageNumber < 500 && state.pageNumber++;
    },
    decrement: (state) => {
      state.pageNumber > 1 && state.pageNumber--;
    },
    firstPage: (state) => {
      state.pageNumber = 1;
    },
    lastPage: (state) => {
      state.pageNumber = 500;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state, action) => {
      state.loadingMovies = true;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.loadingMovies = false;
      state.moviesData = action.payload.results;
    });
    builder.addCase(getMovies.rejected, (state, action) => {
      state.loadingMovies = false;
      state.error = action.payload.message;
    });
  },
});

export const movies = moviesSlice.reducer;
export const { increment, decrement, firstPage, lastPage } =
  moviesSlice.actions;
