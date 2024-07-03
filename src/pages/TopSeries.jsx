import React from "react";
import ReactStars from "react-stars";
import "./topMovie.css";
import { useNavigate } from "react-router-dom";

const TopSeries = ({ seriesData }) => {
  const filterSeries = seriesData.filter((series) => series.vote_average > 5);
  const navigate = useNavigate();

  return (
    <div className="container mx-auto mt-10 px-7 text-center">
      <h2 className="mb-10 text-3xl font-bold text-light-blue-300">
        TOP SERIES
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 topMovie-card">
        {seriesData &&
          filterSeries.map((series, index) => (
            <div
              className="card bg-base-100 shadow-xl w-[18em] sm:w-auto md:w-auto lg:w-auto"
              key={index}
            >
              <figure>
                <img
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body px-4">
                <h2 className="card-title flex items-start">
                  TITLE:
                  <span className="text-light-blue-400">
                    {series.original_name}
                  </span>
                </h2>

                <div className="flex justify-between items-center">
                  <h5>
                    RATE:
                    <span className="text-light-blue-400 ms-1">
                      {series.vote_average}
                    </span>
                  </h5>
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      color2={"#ffd700"}
                      value={series.vote_average / 2}
                      edit={false}
                    />
                  </div>
                </div>

                <div className="card-actions justify-center">
                  <button
                    className="btn btn-outline btn-info font-light"
                    on
                    onClick={() => navigate(`/series/${series.id}`)}
                  >
                    DETAILS
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopSeries;
