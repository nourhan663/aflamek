import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovieRecommendations = createAsyncThunk(
  "get Movie Recommendations",
  async (movieid, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieid}/recommendations`,
        params: { language: "en-US", page: "1" },
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
  movieRecommendations: [],
  loading: true,
};

const movieRecommendationsSlice = createSlice({
  name: "details",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getMovieRecommendations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovieRecommendations.fulfilled, (state, action) => {
      state.loading = false;
      state.movieRecommendations = action.payload;
    });
    builder.addCase(getMovieRecommendations.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const movieRecommendations = movieRecommendationsSlice.reducer;
