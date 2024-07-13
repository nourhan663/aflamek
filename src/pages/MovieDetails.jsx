import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCredits } from "../redux/slice/credits";
import { getDetails } from "../redux/slice/movieDetails";
import { MdNoteAdd } from "react-icons/md";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import Loding from "../components/Loding";
import MovieCast from "../components/MovieCast";
import AsideMovieDetail from "../components/AsideMovieDetail";
import { getMovieExternalId } from "./../redux/slice/movieExternalId";
import { getMovieKeywords } from "../redux/slice/moviesKeywords";
import { getMovieReview } from "./../redux/slice/movieReview";
import MovieReview from "../components/MovieReview";
import MovieMedia from "./../components/MovieMedia";
import { getMovieVideos } from "./../redux/slice/movieVideos";
import { getMoviebackdrops_posters } from "./../redux/slice/movieBackDrops_posters";
import { getMovieRecommendations } from "./../redux/slice/movieRecommendations";
import MovieRecommendations from "./../components/MovieRecommendations";
import YouTube from "react-youtube";
import { useRef } from "react";

const MovieDetails = () => {
  const [showVideo, setShowVideo] = useState(false);
  const divRef = useRef(null);

  const { loading, creditsCast, creditCrew } = useSelector(
    (state) => state.credits
  );
  const { movieDetails } = useSelector((state) => state.movieDetail);
  const { movieVideos } = useSelector((state) => state.movieVideos);
  const dispatch = useDispatch();
  const { movieid } = useParams();
  const hours = Math.floor(movieDetails.runtime / 60);
  const mintues = movieDetails.runtime - hours * 60;

  const Production =
    creditCrew &&
    creditCrew.filter(
      (details) => details.known_for_department == "Production"
    );
  const Directing =
    creditCrew &&
    creditCrew.filter((details) => details.known_for_department == "Directing");

  const opts = {
    height: "450",
    width: "425",
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  const showTrailer = () => {
    setShowVideo(true);
  };

  useEffect(() => {
    dispatch(getCredits(movieid));
  }, [movieid]);

  useEffect(() => {
    dispatch(getDetails(movieid));
  }, [movieid]);

  useEffect(() => {
    dispatch(getMovieExternalId(movieid));
  }, [movieid]);

  useEffect(() => {
    dispatch(getMovieKeywords(movieid));
  }, [movieid]);

  useEffect(() => {
    dispatch(getMovieReview(movieid));
  }, [movieid]);

  useEffect(() => {
    dispatch(getMovieVideos(movieid));
  }, [movieid]);

  useEffect(() => {
    dispatch(getMoviebackdrops_posters(movieid));
  }, [movieid]);

  useEffect(() => {
    dispatch(getMovieRecommendations(movieid));
  }, [movieid]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setShowVideo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading == true) {
    return (
      <div>
        <Loding />
      </div>
    );
  }

  return (
    <div>
      <div
        className=" bg-cover mt-10 pb-9 relative"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path})`,
        }}
      >
        {/* trailer */}
        {showVideo &
          (movieVideos.results && movieVideos.results.length != 0) && (
          <div
            className={
              showVideo
                ? "fixed z-50 w-[100%] h-[100%] flex justify-center items-center bg-[rgba(0,0,0,.6)] "
                : "hidden"
            }
          >
            {movieVideos.results &&
              movieVideos.results.slice(0, 1).map((movie, index) => (
                <div ref={divRef}>
                  <YouTube
                    key={index}
                    videoId={movie.key}
                    opts={opts}
                    onReady={onReady}
                  />
                </div>
              ))}
          </div>
        )}

        <div className="pt-[4em] flex flex-col items-center container mx-auto">
          <h1 className="text-light-blue-300 font-bold text-3xl mb-5">
            Movie Details
          </h1>
          <div className="flex sm:flex-col md:flex-row lg:flex-row flex-col items-center">
            <div
              className="flex justify-center"
              style={{ width: "-webkit-fill-available" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                alt=""
                width=""
                className="sm:w-[60%] md:w-[100%] lg:w-[70%] w-[60%] "
              />
            </div>

            <div className="ms-7 text-white flex flex-col justify-evenly">
              <h1 className=" font-bold text-3xl">{movieDetails.title}</h1>
              <div>
                <span>
                  {movieDetails.release_date}({movieDetails.original_language})
                </span>
                <span>
                  👉
                  {movieDetails.genres &&
                    movieDetails.genres.map((detail, index) => (
                      <span key={index}>{detail.name},</span>
                    ))}
                  {hours}h {mintues}min 👈
                </span>
              </div>
              <div className="my-5">
                <span className="text-light-blue-300 font-bold text-3xl">
                  Overview :
                </span>
                <span>{movieDetails.overview}</span>
              </div>
              <div>
                <div className="text-light-blue-300 font-bold text-3xl">
                  Casting :
                </div>
                <div className="flex flex-col ">
                  <div className="flex justify-evenly my-5">
                    <div className="flex flex-col items-center">
                      <h1 className="text-xl">
                        {creditsCast &&
                          creditsCast.map(
                            (detail, index) =>
                              index == 0 && (
                                <span key={index}>{detail.name}</span>
                              )
                          )}
                      </h1>
                      <p className="text-yellow-800 font-bold">Acting</p>
                    </div>
                    <div>||</div>
                    <div className="flex flex-col items-center">
                      <h1 className="text-xl">
                        {creditsCast &&
                          creditsCast.map(
                            (detail, index) =>
                              index == 1 && (
                                <span key={index}>{detail.name}</span>
                              )
                          )}
                      </h1>
                      <p className="text-yellow-800 font-bold">Acting</p>
                    </div>
                  </div>
                  <div className="flex justify-evenly ">
                    <div className="flex flex-col items-center">
                      <h1 className="text-xl">
                        {Production &&
                          Production.map(
                            (detail, index) =>
                              index == 0 && (
                                <span key={index}>{detail.name}</span>
                              )
                          )}
                      </h1>
                      <p className="text-yellow-800 font-bold">Production</p>
                    </div>
                    <div>||</div>
                    <div className="flex flex-col items-center">
                      <h1 className="text-xl">
                        {Directing &&
                          Directing.map(
                            (detail, index) =>
                              index == 0 && (
                                <span key={index}>{detail.name}</span>
                              )
                          )}
                      </h1>
                      <p className="text-yellow-800 font-bold">Directing</p>
                    </div>
                    <div>||</div>
                    <div className="flex flex-col items-center">
                      <h1 className="text-xl">
                        {Production &&
                          Production.map(
                            (detail, index) =>
                              index == 1 && (
                                <span key={index}>{detail.name}</span>
                              )
                          )}
                      </h1>
                      <p className="text-yellow-800 font-bold">Production</p>
                    </div>
                  </div>
                  <div className="flex justify-evenly my-5">
                    <div className="flex flex-col items-center">
                      <MdNoteAdd className="text-green-800 size-7" />
                      <h1>Add To WatchList</h1>
                    </div>
                    <div>||</div>
                    <div className="flex flex-col items-center">
                      <MdOutlineStarBorderPurple500 className="text-yellow-800 size-7" />
                      <h1>Rate Movie</h1>
                    </div>
                    <div className="flex flex-col items-center">
                      <SiYoutubemusic
                        className="text-red-800 size-7 hover:cursor-pointer"
                        onClick={showTrailer}
                      />

                      <h1>Play Trailer</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container m-auto flex lg:flex-col xl:flex-row md:flex-col sm:flex-col flex-col justify-between">
        <div>
          <MovieCast />
          <MovieReview movieDetails={movieDetails} />
          <MovieMedia />
          <MovieRecommendations />
        </div>
        <div>
          <AsideMovieDetail />
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
