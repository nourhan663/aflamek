import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSearchSeries = createAsyncThunk(
  "get all search series ",
  async (series, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = await axios({
        method: "GET",
        url: "https://api.themoviedb.org/3/search/tv",
        params: {
          include_adult: "false",
          language: "en-US",
          page: "1",
          query: series,
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
  seriesSearch: "",
  series: [],
};

const searchSeriesSlice = createSlice({
  name: "details",
  initialState: data,
  reducers: {
    inputSearch: (state, e) => {
      state.seriesSearch = e;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchSeries.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSearchSeries.fulfilled, (state, action) => {
      state.loading = false;
      state.series = action.payload.results;
    });
    builder.addCase(getSearchSeries.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const searchseries = searchSeriesSlice.reducer;
export const { inputSearch } = searchSeriesSlice.actions;
