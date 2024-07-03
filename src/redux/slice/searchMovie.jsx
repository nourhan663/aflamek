import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSearchMovie = createAsyncThunk(
  "get all search movies",
  async (movie, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/movie",
        params: {
          query: movie,
          include_adult: "false",
          language: "en-US",
          page: "1",
        },
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
  loading: true,
  movieSearch: "",
  movies: [],
};

const searchMoviesSlice = createSlice({
  name: "details",
  initialState: data,
  reducers: {
    inputSearch: (state, e) => {
      state.movieSearch = e;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchMovie.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSearchMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.movies = action.payload.results;
    });
    builder.addCase(getSearchMovie.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const searchMovie = searchMoviesSlice.reducer;
export const { inputSearch } = searchMoviesSlice.actions;
