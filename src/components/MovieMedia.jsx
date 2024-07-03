import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";
import Loding from "./Loding";

const MovieMedia = () => {
  const { moviePostersAndBackDrops, loading } = useSelector(
    (state) => state.moviePostersAndBackDrops
  );
  const { movieVideos } = useSelector((state) => state.movieVideos);
  const [video, setVideo] = useState(true);
  const [backdrops, setBackdrops] = useState(false);
  const [posters, setPosters] = useState(false);

  const vidoeClick = () => {
    setPosters(false);
    setBackdrops(false);
    setVideo(true);
  };
  const backdropsClick = () => {
    setPosters(false);
    setBackdrops(true);
    setVideo(false);
  };
  const postersClick = () => {
    setPosters(true);
    setBackdrops(false);
    setVideo(false);
  };

  const opts = {
    height: "350",
    width: "370",
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  if (loading) {
    return (
      <div>
        <Loding />
      </div>
    );
  }
  return (
    <div className="mt-10">
      <div className="text-2xl text-blue-300 my-7">Media</div>
      <div className="">
        <span
          className={
            video
              ? "text-purple-600 border-b-2 border-b-purple-600  me-4 "
              : "text-white  me-4 "
          }
        >
          <Link onClick={vidoeClick}>
            VIDEOS({movieVideos.results && movieVideos.results.length})
          </Link>
        </span>
        <span
          className={
            backdrops
              ? "text-purple-600 border-b-2 border-b-purple-600  me-4 "
              : "text-white me-4 "
          }
        >
          <Link onClick={backdropsClick}>
            BACKDROPS(
            {moviePostersAndBackDrops.backdrops &&
              moviePostersAndBackDrops.backdrops.length}
            )
          </Link>
        </span>
        <span
          className={
            posters
              ? "text-purple-600 border-b-2 border-b-purple-600 "
              : "text-white "
          }
        >
          <Link onClick={postersClick}>
            POSTERS(
            {moviePostersAndBackDrops.posters &&
              moviePostersAndBackDrops.posters.length}
            )
          </Link>
        </span>
      </div>
      <div
        className={
          video
            ? "max-w-[60em] mt-4 bg-black h-[24em] overflow-x-auto flex gap-5 p-2"
            : "hidden"
        }
      >
        {movieVideos.results &&
          movieVideos.results.map((movie, index) => (
            <YouTube
              key={index}
              videoId={movie.key}
              opts={opts}
              onReady={onReady}
            />
          ))}
      </div>
      <div
        className={
          backdrops
            ? "max-w-[60em] mt-4 bg-black h-[20em] overflow-x-auto flex gap-4 p-2"
            : "hidden"
        }
      >
        {moviePostersAndBackDrops.backdrops &&
          moviePostersAndBackDrops.backdrops.map((movie, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w500${movie.file_path}`}
              alt=""
              className="max-w-[15em] border-spacing-y-52 rounded-md"
            />
          ))}
      </div>
      <div
        className={
          posters
            ? "max-w-[60em] mt-4 bg-black h-[20em] overflow-x-auto flex gap-4 p-2"
            : "hidden"
        }
      >
        {moviePostersAndBackDrops.posters &&
          moviePostersAndBackDrops.posters.map((movie, index) => (
            <img
              key={index}
              src={`https://image.tmdb.org/t/p/w500${movie.file_path}`}
              alt=""
              className="max-w-[15em] border-spacing-y-52 rounded-md"
            />
          ))}
      </div>
    </div>
  );
};

export default MovieMedia;
