import React from "react";
import { useSelector } from "react-redux";
import Loding from "../components/Loding";

const MovieCast = () => {
  const { loading, creditsCast, creditCrew } = useSelector(
    (state) => state.credits
  );

  if (loading == true) {
    return (
      <div>
        <Loding />
      </div>
    );
  }
  return (
    <div className="mt-8">
      <div className="text-light-blue-300 font-bold text-2xl ">
        Top Billed Cast
      </div>
      <div className="max-w-[60em] overflow-x-scroll h-[50vh] flex">
        {creditsCast &&
          creditsCast.map((cast, index) => (
            <div key={index} className="me-2 bg-gray-900 mt-3 px-2 ">
              {cast.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                  alt=""
                  className="max-w-[10em] border-spacing-y-52 rounded-md"
                />
              )}
              {cast.profile_path == null && (
                <img
                  src="https://t3.ftcdn.net/jpg/01/65/63/94/360_F_165639425_kRh61s497pV7IOPAjwjme1btB8ICkV0L.jpg"
                  alt=""
                  className="max-w-[10em] border-spacing-y-52 rounded-md h-[15em]"
                />
              )}

              <div className="text-white text-xl font-bold ">{cast.name}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MovieCast;
