import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loding from "./Loding";

const MovieRecommendations = () => {
  const { movieRecommendations, loading } = useSelector(
    (state) => state.movieRecommendations
  );
  const navigate = useNavigate();

  if (loading) {
    return (
      <div>
        <Loding />
      </div>
    );
  }

  return (
    <div className="mt-10 ms-2">
      <div className="text-2xl text-blue-300">RECOMMENDATIONS</div>
      <div className="max-w-[60em] h-[65vh] bg-black flex gap-4 overflow-auto">
        {movieRecommendations.results &&
          movieRecommendations.results.map((movie, index) => (
            <div
              key={index}
              className=" bg-gray-900 p-2"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=""
                className="max-w-[15em] border-spacing-y-52 rounded-md"
              />
              <div className="text-blue-300">{movie.original_title}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieRecommendations;
