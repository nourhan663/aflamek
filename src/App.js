import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import NotFound from "./pages/NotFound";
import ContactUs from "./pages/ContactUs";
import MovieDetails from "./pages/MovieDetails";
import SeriesDetail from "./pages/SeriesDetail";
import MovieReview from "./pages/MovieReview";
import SeriesReviews from "./pages/SeriesReviews";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/movie/:movieid" element={<MovieDetails />} />
        <Route path="/series/:seriesid" element={<SeriesDetail />} />
        <Route path="/movie/:movieid/reviews" element={<MovieReview />} />
        <Route path="/series/:seriesid/reviews" element={<SeriesReviews />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
