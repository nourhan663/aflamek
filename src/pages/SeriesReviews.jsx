import React from "react";
import { getSeriesReview } from "../redux/slice/seriesReview";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineStar } from "react-icons/md";
import { FaArrowLeftLong } from "react-icons/fa6";
import ShowMore from "react-show-more";
import { useEffect } from "react";

const SeriesReviews = () => {
  const { seriesReview, loading } = useSelector((state) => state.seriesReview);
  const { seriesDetails } = useSelector((state) => state.seriesDetail);
  const { seriesId } = useParams();

  console.log(seriesDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSeriesReview(seriesId));
  }, [seriesId]);

  return (
    <div className="mt-[4.5em]">
      <div className="bg-black w-full mb-7">
        <div className="container m-auto flex gap-7 items-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${seriesDetails.poster_path}`}
            alt=""
            width=""
            className="w-[8em]"
          />
          <div>
            <div className="text-2xl font-bold ">
              {seriesDetails.original_name}
              <span className="text-blue-300">
                ({seriesDetails.first_air_date})
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
        {seriesReview &&
          seriesReview.results.map((series, index) => (
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
                    {series.author}
                  </span>
                  <span className="border-white px-3 border-2 rounded-md text-white ">
                    <MdOutlineStar className="inline-block" />
                    {series.author_details.rating}.0
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
                <ShowMore
                  lines={2}
                  more="Show more"
                  less="Show less"
                  anchorClass="text-light-blue-400 underline decoration-1"
                >
                  {series.content}
                </ShowMore>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SeriesReviews;
