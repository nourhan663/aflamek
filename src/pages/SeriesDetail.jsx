import React, { useEffect, useRef, useState } from "react";
import { getSeriesDetails } from "../redux/slice/seriesDetail";
import { getSeriesCredits } from "../redux/slice/seriesCredits";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loding from "../components/Loding";
import { MdNoteAdd } from "react-icons/md";
import { MdOutlineStarBorderPurple500 } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import SeriesCast from "../components/SeriesCast";
import { getSeriesReview } from "../redux/slice/seriesReview";
import SeriesReview from "../components/SeriesReview";
import { getSeriesKeywords } from "../redux/slice/seriesKeywords";
import { getSeriesExternalId } from "../redux/slice/seriesExternalId";
import AsideSeriesDetails from "../components/AsideSeriesDetails";
import SeriesMedia from "../components/SeriesMedia";
import { getSeriesVideos } from "./../redux/slice/seriesVideos";
import { getseriesbackdrops_posters } from "../redux/slice/seriesImages";
import { getSeriesRecommendations } from "./../redux/slice/seriesRecommendarion";
import SeriesRecommendation from "../components/SeriesRecommendation";
import YouTube from "react-youtube";

const SeriesDetail = () => {
  const { seriesVideos } = useSelector((state) => state.seriesVideos);
  const [showVideo, setShowVideo] = useState(false);
  const divRef = useRef(null);

  const { loading, creditsCast, creditCrew } = useSelector(
    (state) => state.seriesCredits
  );
  const { seriesDetails } = useSelector((state) => state.seriesDetail);
  const dispatch = useDispatch();
  const { seriesid } = useParams();

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
    width: "550",
  };

  const onReady = (event) => {
    event.target.pauseVideo();
  };

  const showTrailer = () => {
    setShowVideo(true);
  };

  useEffect(() => {
    dispatch(getSeriesDetails(seriesid));
  }, [seriesid]);
  useEffect(() => {
    dispatch(getSeriesCredits(seriesid));
  }, [seriesid]);

  useEffect(() => {
    dispatch(getSeriesReview(seriesid));
  }, [seriesid]);

  useEffect(() => {
    dispatch(getSeriesKeywords(seriesid));
  }, [seriesid]);

  useEffect(() => {
    dispatch(getSeriesExternalId(seriesid));
  }, [seriesid]);

  useEffect(() => {
    dispatch(getSeriesVideos(seriesid));
  }, [seriesid]);

  useEffect(() => {
    dispatch(getseriesbackdrops_posters(seriesid));
  }, [seriesid]);

  useEffect(() => {
    dispatch(getSeriesRecommendations(seriesid));
  }, [seriesid]);

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
        className="bg-cover mt-10 pb-9"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${seriesDetails.backdrop_path})`,
        }}
      >
        {/* trailer */}
        {showVideo && (
          <div
            className={
              showVideo
                ? "absolute z-50 w-[100%] h-[100%] flex justify-center items-center bg-[rgba(0,0,0,.6)] "
                : "hidden"
            }
          >
            {seriesVideos.results &&
              seriesVideos.results.slice(0, 1).map((series, index) => (
                <div ref={divRef}>
                  <YouTube
                    key={index}
                    videoId={series.key}
                    opts={opts}
                    onReady={onReady}
                  />
                </div>
              ))}
          </div>
        )}

        <div className="pt-[4em] flex flex-col items-center container mx-auto">
          <h1 className="text-light-blue-300 font-bold text-3xl mb-5">
            Series Details
          </h1>
          <div className="flex sm:flex-col md:flex-col lg:flex-row flex-col items-center">
            <div
              className="flex justify-center"
              style={{ width: "-webkit-fill-available" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${seriesDetails.poster_path}`}
                alt=""
                width=""
                className="sm:w-[60%] md:w-[40%] lg:w-[65%] w-[60%] "
              />
            </div>

            <div className="ms-7 text-white flex flex-col justify-evenly">
              <h1 className=" font-bold text-3xl">{seriesDetails.title}</h1>
              <div>
                <span>
                  {seriesDetails.first_air_date}(
                  {seriesDetails.original_language})
                </span>
                <span>
                  👉
                  {seriesDetails.genres &&
                    seriesDetails.genres.map((detail, index) => (
                      <span key={index}>{detail.name},</span>
                    ))}
                  {seriesDetails.episode_run_time &&
                    seriesDetails.episode_run_time.length > 0 && (
                      <span>
                        Episode Run Time {seriesDetails.episode_run_time[0]}min
                        👈
                      </span>
                    )}
                </span>
              </div>
              <div className="my-5">
                <span className="text-light-blue-300 font-bold text-3xl">
                  Overview :
                </span>
                <span>{seriesDetails.overview}</span>
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
          <SeriesCast />
          <SeriesReview />
          <SeriesMedia />
          <SeriesRecommendation />
        </div>
        <div>
          <AsideSeriesDetails />
        </div>
      </div>
    </div>
  );
};

export default SeriesDetail;
