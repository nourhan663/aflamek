import React, { useEffect } from "react";
import ReactStars from "react-stars";
import "./topMovie.css";
import {
  decrement,
  firstPage,
  getMovies,
  increment,
  lastPage,
} from "./../redux/slice/movies";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loding from "../components/Loding";

const Movies = () => {
  const { loadingMovies, moviesData, pageNumber } = useSelector(
    (state) => state.movies
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovies(pageNumber));
  }, [pageNumber]);

  if (loadingMovies == true) {
    return (
      <div>
        <Loding />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-7 text-center mt-[9em]">
      <div className="mb-10">
        <h2 className="mb-5 text-3xl font-bold ">MOVIES</h2>
        <h2 className="text-3xl font-bold ">
          PAGE NUMBER
          <span className="text-light-blue-300 mx-2">{pageNumber}</span>FROM
          <span className="text-light-blue-300 mx-2">500</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 topMovie-card">
        {moviesData &&
          moviesData.map((movie, index) => (
            <div
              className="card bg-base-100 shadow-xl w-[18em] sm:w-auto md:w-auto lg:w-auto"
              key={index}
            >
              <figure>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body px-4">
                <h2 className="card-title flex items-start">
                  TITLE:
                  <span className="text-light-blue-400">
                    {movie.original_title}
                  </span>
                </h2>

                <div className="flex justify-between items-center">
                  <h5>
                    RATE:
                    <span className="text-light-blue-400">
                      {movie.vote_average}
                    </span>
                  </h5>
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      color2={"#ffd700"}
                      value={movie.vote_average / 2}
                      edit={false}
                    />
                  </div>
                </div>

                <div className="card-actions justify-center">
                  <button
                    className="btn btn-outline btn-info font-light"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  >
                    DETAILS
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="join mt-10">
        <button className="join-item btn" onClick={() => dispatch(firstPage())}>
          ««
        </button>
        <button className="join-item btn" onClick={() => dispatch(decrement())}>
          «
        </button>
        <button className="join-item btn">Page {pageNumber}</button>
        <button className="join-item btn" onClick={() => dispatch(increment())}>
          »
        </button>
        <button className="join-item btn" onClick={() => dispatch(lastPage())}>
          »»
        </button>
      </div>
    </div>
  );
};

export default Movies;