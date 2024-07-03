import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getMovieExternalId = createAsyncThunk(
  "get all external id",
  async (movieId, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieId}/external_ids`,
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
  loading: true,
  extenalId: [],
};

const movieExternalIdSlice = createSlice({
  name: "ExternalId",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getMovieExternalId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMovieExternalId.fulfilled, (state, action) => {
      state.loading = false;
      state.extenalId = action.payload;
    });
    builder.addCase(getMovieExternalId.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const movieExternalId = movieExternalIdSlice.reducer;
