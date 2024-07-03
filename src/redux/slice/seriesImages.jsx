import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getseriesbackdrops_posters = createAsyncThunk(
  "get series backdrops_posters",
  async (seriesId, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/tv/${seriesId}/images`,
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
  seriesPostersAndBackDrops: [],
  loading: true,
};

const seriesPostersAndBackDropsSlice = createSlice({
  name: "details",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getseriesbackdrops_posters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getseriesbackdrops_posters.fulfilled, (state, action) => {
      state.loading = false;
      state.seriesPostersAndBackDrops = action.payload;
    });
    builder.addCase(getseriesbackdrops_posters.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const seriesPostersAndBackDrops = seriesPostersAndBackDropsSlice.reducer;
