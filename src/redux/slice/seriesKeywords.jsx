import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSeriesKeywords = createAsyncThunk(
  "get Series Keywords",
  async (seriesId, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesId}/keywords`,
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
  seriesKeywords: [],
  loading: true,
};

const serieskeyWordsSlice = createSlice({
  name: "details",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getSeriesKeywords.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSeriesKeywords.fulfilled, (state, action) => {
      state.loading = false;
      state.seriesKeywords = action.payload;
    });
    builder.addCase(getSeriesKeywords.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const seriesKeywords = serieskeyWordsSlice.reducer;
