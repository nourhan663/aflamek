import React, { useEffect } from "react";
import HomeHeader from "./HomeHeader";
import MoviesSlider from "./MoviesSlider";
import SeriesSlider from "./SeriesSlider";
import TopMovies from "./TopMovies";
import TopSeries from "./TopSeries";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "./../redux/slice/movies";
import { getSeries } from "../redux/slice/series";

const HomePage = () => {
  const { loadingMovies, moviesData } = useSelector((state) => state.movies);
  const { loadingSeries, seriesData } = useSelector((state) => state.series);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, []);

  useEffect(() => {
    dispatch(getSeries());
  }, []);
  return (
    <div>
      <HomeHeader />
      <MoviesSlider loadingMovies={loadingMovies} moviesData={moviesData} />
      <SeriesSlider loadingSeries={loadingSeries} seriesData={seriesData} />
      <TopMovies moviesData={moviesData} />
      <TopSeries seriesData={seriesData} />
    </div>
  );
};

export default HomePage;
