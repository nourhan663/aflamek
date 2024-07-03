import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AsideSeriesDetails = () => {
  const { extenalId } = useSelector((state) => state.seriesExternalId);
  const { loading, seriesDetails } = useSelector((state) => state.seriesDetail);
  const { seriesKeywords } = useSelector((state) => state.seriesKeywords);

  return (
    <div className="mt-8 w-[19em] flex flex-col">
      <div className="flex justify-between w-[100%] text-2xl">
        <Link to={`https://www.facebook.com/${extenalId.facebook_id}`}>
          <FaFacebook className="text-light-blue-300 hover:text-blue-900" />
        </Link>
        <Link to={`https://x.com/${extenalId.twitter_id}`}>
          <FaXTwitter className="text-light-blue-300 hover:text-blue-900 " />
        </Link>
        <Link to={`https://instagram.com/${extenalId.instagram_id}`}>
          <FaInstagram className="text-light-blue-300 hover:text-blue-900" />
        </Link>
        <Link
          to={`https://www.20thcenturystudios.com/movies/${extenalId.wikidata_id}`}
        >
          <MdHome className="text-light-blue-300 hover:text-blue-900" />
        </Link>
      </div>

      <div className="mt-6">
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-white">Original Name</h1>
          <h6 className="text-light-blue-300 mt-1">
            {seriesDetails.original_name}
          </h6>
        </div>
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-white">Status</h1>
          <h6 className="text-light-blue-300 mt-1">{seriesDetails.status}</h6>
        </div>
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-white">Type</h1>
          <h6 className="text-light-blue-300 mt-1">{seriesDetails.type}</h6>
        </div>
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-white">
            Oreginal Language
          </h1>
          <h6 className="text-light-blue-300 mt-1">
            {seriesDetails.original_language}
          </h6>
        </div>
      </div>

      <div>
        <h1 className="text-3xl text-light-blue-300 mt-7 font-medium">
          KeyWords
        </h1>
        <div className="mt-5">
          {seriesKeywords.results &&
            seriesKeywords.results.map((keyword, index) => (
              <button
                key={index}
                className="bg-white py-1 px-2 text-black rounded-md m-1 hover:bg-black hover:text-light-blue-300 hover:scale-125"
              >
                {keyword.name}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AsideSeriesDetails;
