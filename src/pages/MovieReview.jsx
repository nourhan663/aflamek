import React, { useEffect } from "react";
import { getMovieReview } from "./../redux/slice/movieReview";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineStar } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import ShowMoreText from "react-show-more-text";
import Loding from "../components/Loding";

const MovieReview = () => {
  const { movieReview, loading } = useSelector((state) => state.movieReview);
  const { movieDetails } = useSelector((state) => state.movieDetail);
  const { movieid } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getMovieReview(movieid));
  }, [movieid]);

  if (loading) {
    return (
      <div>
        <Loding />
      </div>
    );
  }
  return (
    <div className="mt-[4.5em]">
      <div className="bg-black w-full mb-7">
        <div className="container m-auto flex gap-7 items-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt=""
            width=""
            className="w-[8em]"
          />
          <div>
            <div className="text-2xl font-bold ">
              {movieDetails.original_title}
              <span className="text-blue-300">
                ({movieDetails.release_date})
              </span>
            </div>
            <Link onClick={() => navigate(-1)}>
              <FaArrowLeftLong className="inline-block me-1" />
              Back to main
            </Link>
          </div>
        </div>
      </div>
      <div className="container m-auto">
        {movieReview &&
          movieReview.results.map((movie, index) => (
            <div
              key={index}
              className="w-full p-4 bg-black flex mb-5 md:flex-col sm:flex-col lg:flex-row flex-col items-center
            gap-7 "
            >
              <div className="w-[4em] h-[4em] rounded-full bg-gray-100 flex justify-center items-center font-bold text-2xl text-black">
                R
              </div>
              <div className="max-w-[70em]">
                <div>
                  <span className="text-white text-2xl font-bold">
                    A Review written by
                  </span>
                  <span className="text-2xl text-light-blue-300 font-bold mx-2">
                    {movie.author}
                  </span>
                  <span className="border-white px-3 border-2 rounded-md text-white ">
                    <MdOutlineStar className="inline-block" />
                    {movie.author_details.rating}.0
                  </span>
                </div>
                <div className="text-xl mt-2">
                  <span className="text-white">Written by </span>
                  <span className="text-light-blue-300 ">{movie.author}</span>
                  <span className="text-white mx-2">on</span>
                  <span className="text-light-blue-300 ">
                    {movie.created_at}
                  </span>
                </div>
                <div className="mt-4 text-blue-700 text-2xl font-bold ">
                  Content :-
                </div>
                <ShowMoreText
                  lines={2}
                  more="Show more"
                  less="Show less"
                  anchorClass="text-light-blue-400 underline decoration-1"
                  className="cursor-pointer"
                >
                  {movie.content}
                </ShowMoreText>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieReview;
