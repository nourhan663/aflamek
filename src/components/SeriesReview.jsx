import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import Loding from "./Loding";

const SeriesReview = () => {
  const { seriesReview, loading } = useSelector((state) => state.seriesReview);
  const { seriesid } = useParams();

  if (loading) {
    return (
      <div>
        <Loding />
      </div>
    );
  }
  return (
    <div className="mt-10">
      <h1 className="text-2xl text-light-blue-300 mt-3"> Social</h1>
      <div className="text-purple-600 border-b-2 border-b-purple-600 w-[fit-content] border-spacing-2 my-5">
        Reviews({seriesReview.results && seriesReview.results.length})
      </div>
      <div>
        {seriesReview.results &&
          seriesReview.results.slice(0, 1).map((series, index) => (
            <div
              key={index}
              className="max-w-[60em] p-4 bg-black border-t-2 border-t-white flex sm:flex-col flex-col md:flex-row lg:flex-row items-center
              gap-7 container m-auto"
            >
              <div className="w-[4em] h-[4em] rounded-full bg-gray-100 flex justify-center items-center font-bold text-2xl text-black">
                R
              </div>
              <div className="max-w-[46em]">
                <div>
                  <span className="text-white text-2xl font-bold">
                    A Review written by
                  </span>
                  <span className="text-2xl text-light-blue-300 font-bold">
                    {series.author}
                  </span>
                </div>
                <div className="text-xl mt-2">
                  <span className="text-white">Written by </span>
                  <span className="text-light-blue-300 ">{series.author}</span>
                  <span className="text-white mx-2">on</span>
                  <span className="text-light-blue-300 ">
                    {series.created_at}
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
                  {series.content}
                </ShowMoreText>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-5">
        <Link
          className=" text-light-blue-300"
          to={`/series/${seriesid}/reviews`}
        >
          Read All Reviews
        </Link>
      </div>
    </div>
  );
};

export default SeriesReview;
