import { configureStore } from "@reduxjs/toolkit";
import { movies } from "./../slice/movies";
import { series } from "./../slice/series";
import { credits } from "./../slice/credits";
import { movieDetail } from "./../slice/movieDetails";
import { seriesDetail } from "./../slice/seriesDetail";
import { seriesCredits } from "./../slice/seriesCredits";
import { searchMovie } from "./../slice/searchMovie";
import { searchseries } from "../slice/searchSeries";
import { movieExternalId } from "../slice/movieExternalId";
import { moviesKeywords } from "../slice/moviesKeywords";
import { movieReview } from "../slice/movieReview";
import { moviePostersAndBackDrops } from "../slice/movieBackDrops_posters";
import { movieVideos } from "../slice/movieVideos";
import { movieRecommendations } from "../slice/movieRecommendations";
import { seriesReview } from "../slice/seriesReview";
import { seriesExternalId } from "../slice/seriesExternalId";
import { seriesKeywords } from "../slice/seriesKeywords";
import { seriesVideos } from "../slice/seriesVideos";
import { seriesPostersAndBackDrops } from "../slice/seriesImages";
import { seriesRecommendations } from "../slice/seriesRecommendarion";

const store = configureStore({
  reducer: {
    movies,
    series,
    credits,
    movieDetail,
    seriesDetail,
    seriesCredits,
    searchMovie,
    searchseries,
    movieExternalId,
    moviesKeywords,
    movieReview,
    moviePostersAndBackDrops,
    movieVideos,
    movieRecommendations,
    seriesReview,
    seriesExternalId,
    seriesKeywords,
    seriesVideos,
    seriesPostersAndBackDrops,
    seriesRecommendations,
  },
});
export default store;
