import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import Loding from "./../components/Loding";

const MoviesSlider = ({ moviesData, loadingMovies }) => {
  const navigate = useNavigate();
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loadingMovies) {
    return (
      <div>
        <Loding />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-7 text-center">
      <h2 className="mb-10 text-3xl font-bold text-light-blue-300">MOVIES</h2>
      <Slider {...settings} className="w-[-webkit-fill-available] ">
        {moviesData &&
          moviesData.map((movie, index) => (
            <div key={index}>
              <div
                className="mx-4 rounded-lg hover:cursor-pointer"
                onClick={() => navigate(`/movie/${movie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt=""
                />
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default MoviesSlider;
