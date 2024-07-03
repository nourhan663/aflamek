import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCredits = createAsyncThunk(
  "get credits",
  async (movieid, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
      const data = await axios({
        method: "GET",
        url: `https://api.themoviedb.org/3/movie/${movieid}/credits`,
        params: { language: "en-US" },
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
  creditsCast: [],
  creditCrew: [],
  loading: true,
  error: null,
};

const creditSlice = createSlice({
  name: "credits",
  initialState: data,
  extraReducers: (builder) => {
    builder.addCase(getCredits.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getCredits.fulfilled, (state, action) => {
      state.loading = false;
      state.creditsCast = action.payload.cast;
      state.creditCrew = action.payload.crew;
    });
    builder.addCase(getCredits.rejected, (state, action) => {
      state.loading = false;
      state.error = action.message;
    });
  },
});

export const credits = creditSlice.reducer;
