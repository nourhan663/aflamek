import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovieKeywords = createAsyncThunk(
  "get Movie Keywords",
  async (movieid, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieid}/keywords`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmJiNzBjZDlkMGFkZTE4ZWQ1YmYyMWJkMTI4ZDZmMyIsIm5iZiI6MTcxOTI1NzEwMy4wODczOSwic3ViIjoiNjVjYjQwNDcxYzA5ZmIwMTMwMzdhZDY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.1UfK8i6aMeoCcl4OzIDIndIkfj7CNvCX5RPBmcfv2Z8",
        },
      });
      return data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const data = {
  movieKeywords: [],
  loading: true,
};

const keyWordsSlice = createSlice({
  name: "details",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getMovieKeywords.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovieKeywords.fulfilled, (state, action) => {
      state.loading = false;
      state.movieKeywords = action.payload;
    });
    builder.addCase(getMovieKeywords.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const moviesKeywords = keyWordsSlice.reducer;
