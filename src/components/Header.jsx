import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchMovie, inputSearch } from "../redux/slice/searchMovie";
import { getSearchSeries } from "../redux/slice/searchSeries";

const navList = (
  <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <Link to={"/"} className="flex items-center text-white">
        Home
      </Link>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <Link to={"/movies"} className="flex items-center text-white">
        Movies
      </Link>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <Link to={"/series"} className="flex items-center text-white">
        Series
      </Link>
    </Typography>
    <Typography
      as="li"
      variant="small"
      color="blue-gray"
      className="p-1 font-normal"
    >
      <Link to={"/contactus"} className="flex items-center text-white">
        Contact US
      </Link>
    </Typography>
  </ul>
);

const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [search, setSearch] = React.useState(false);
  const [movie, setMovie] = useState("");
  const [placeHolder, setPlaceHolder] = useState("Search Movie");
  const [btnValue, setBtnValue] = useState("Search Series");
  const navigate = useNavigate();

  const { loading, movies, movieSearch } = useSelector(
    (state) => state.searchMovie
  );
  const { series } = useSelector((state) => state.searchseries);
  const dispatch = useDispatch();
  const data = movie;
  const changePlaceHolder = () => {
    if (placeHolder == "Search Movie") {
      setPlaceHolder("Search Series");
      setBtnValue("search Movie");
    } else {
      setPlaceHolder("Search Movie");
      setBtnValue("search Series");
    }
  };

  useEffect(() => {
    dispatch(getSearchMovie(data));
  }, [movie]);
  useEffect(() => {
    dispatch(getSearchSeries(data));
  }, [movie]);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth <= 650 && setSearch(true)
    );
  }, []);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 650 && setSearch(false)
    );
  }, []);

  return (
    <div className=" max-h-[768px] w-[calc(100%+48px)] ">
      <Navbar className="fixed top-0 z-10  max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-black border-0 ">
        <div className="flex items-center justify-between text-white mx-5">
          <div className="flex">
            <label className="swap swap-rotate me-4">
              <input
                type="checkbox"
                className="theme-controller"
                value="light"
              />
              <svg
                className="swap-off fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-on fill-current w-10 h-10"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>

            <Typography
              as="Link"
              to={"/"}
              className="mr-4 text-xl cursor-pointer py-1.5 font-medium "
            >
              Aflamek
            </Typography>
          </div>

          <div className="flex items-center gap-4 text-white justify-between">
            <div className="mr-4 hidden lg:block flex-2 me-7">{navList}</div>

            {search ? (
              <div></div>
            ) : (
              <div className="flex items-center gap-x-1">
                <div className="flex flex-col relative ">
                  <input
                    type="text"
                    placeholder={placeHolder}
                    className="input input-bordered input-info w-full max-w-xs input-sm h-10 text-light-blue-400"
                    onChange={(e) => setMovie(e.target.value)}
                  />
                  <div className="absolute top-[3em] bg-black w-max  overflow-y-auto h-[18.5em]">
                    {movies &&
                      placeHolder == "Search Movie" &&
                      movies.map((movie, index) => (
                        <div
                          key={index}
                          className="border-2 border-light-blue-400 mb-2 rounded-lg p-3 "
                          onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                          <h1>{movie.original_title}</h1>
                        </div>
                      ))}

                    {series &&
                      placeHolder == "Search Series" &&
                      series.map((singleSeries, index) => (
                        <div
                          key={index}
                          className="border-2 border-light-blue-400 mb-2 rounded-lg p-3 "
                          onClick={() => navigate(`/series/${singleSeries.id}`)}
                        >
                          <h1>{singleSeries.original_name}</h1>
                        </div>
                      ))}
                  </div>
                </div>
                <button className="btn btn-outline btn-success btn-sm  h-10">
                  Search
                </button>
                <button
                  className="btn btn-outline btn-error btn-sm  h-10"
                  onClick={changePlaceHolder}
                >
                  {btnValue}
                </button>
                <button className="btn btn-outline btn-info btn-sm  h-10">
                  Login
                </button>
              </div>
            )}
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}

          {search && (
            <div className="flex items-center gap-x-1 flex-col">
              <div className="w-full">
                <div className="flex flex-col relative ">
                  <input
                    type="text"
                    placeholder={placeHolder}
                    className="input input-bordered input-info w-full max-w-xs input-sm h-10 text-light-blue-400"
                    onChange={(e) => setMovie(e.target.value)}
                  />
                  <div className="absolute top-[3em] bg-black  overflow-y-auto h-[18.5em]">
                    {movies.map((movie, index) => (
                      <div
                        key={index}
                        className="border-2 border-light-blue-400 mb-2 rounded-lg p-3 "
                      >
                        <h1>{movie.original_title}</h1>
                      </div>
                    ))}

                    {series &&
                      placeHolder == "Search Series" &&
                      series.map((singleSeries, index) => (
                        <div
                          key={index}
                          className="border-2 border-light-blue-400 mb-2 rounded-lg p-3 "
                          onClick={() => navigate(`/series/${singleSeries.id}`)}
                        >
                          <h1>{singleSeries.original_name}</h1>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-outline btn-success me-4">
                  Search
                </button>
                <button
                  className="btn btn-outline btn-error"
                  onClick={changePlaceHolder}
                >
                  {btnValue}
                </button>
              </div>
              <div>
                <button className="btn btn-outline btn-info mt-4 w-[8em]">
                  Login
                </button>
              </div>
            </div>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
