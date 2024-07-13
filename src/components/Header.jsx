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
import { TiDelete } from "react-icons/ti";

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

  const { movies, movieSearch } = useSelector((state) => state.searchMovie);
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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 660) {
        setSearch(true);
      } else {
        setSearch(false);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className=" max-h-[768px] w-[calc(100%+48px)] ">
      <Navbar className="fixed top-0 z-10  max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 bg-black border-0 ">
        <div className="flex items-center justify-between text-white mx-5">
          <div className="flex">
            <Link
              to={"/"}
              className="mr-4 text-xl cursor-pointer py-1.5 font-medium "
            >
              Aflamek
            </Link>
          </div>

          <div className="flex items-center gap-4 text-white justify-between">
            <div className="mr-4 hidden lg:block flex-2 me-7">{navList}</div>

            {search ? (
              <div></div>
            ) : (
              <div className="flex items-center gap-x-1">
                <div className="flex flex-col relative ">
                  <div className="flex">
                    <input
                      type="text"
                      placeholder={placeHolder}
                      className="input input-bordered input-info w-full max-w-xs input-sm h-10 text-light-blue-400 relative"
                      onChange={(e) => setMovie(e.target.value)}
                      value={movie}
                    />
                    {movie && (
                      <TiDelete
                        className="text-2xl z-50 absolute right-1 top-2"
                        onClick={() => setMovie("")}
                      />
                    )}
                  </div>
                  <div className="absolute top-[3em] bg-black w-max  overflow-y-auto h-[18.5em]">
                    {movies &&
                      placeHolder == "Search Movie" &&
                      movies.map((movie, index) => (
                        <div
                          key={index}
                          className="border-2 border-light-blue-400 mb-2 rounded-lg p-3 cursor-pointer"
                          onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                          <h1>{movie.title}</h1>
                        </div>
                      ))}

                    {series &&
                      placeHolder == "Search Series" &&
                      series.map((singleSeries, index) => (
                        <div
                          key={index}
                          className="border-2 border-light-blue-400 mb-2 rounded-lg p-3 cursor-pointer"
                          onClick={() => navigate(`/series/${singleSeries.id}`)}
                        >
                          <h1>{singleSeries.name}</h1>
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
                  <div>
                    <input
                      type="text"
                      placeholder={placeHolder}
                      className="input input-bordered input-info w-full  input-sm h-10 text-light-blue-400"
                      onChange={(e) => setMovie(e.target.value)}
                      value={movie}
                    />
                    {movie && (
                      <TiDelete
                        className="text-2xl z-50 absolute right-1 top-2"
                        onClick={() => setMovie("")}
                      />
                    )}
                  </div>
                  <div className="absolute top-[3em] bg-black  overflow-y-auto h-[18.5em]">
                    {movies.map((movie, index) => (
                      <div
                        key={index}
                        className="border-2 border-light-blue-400 mb-2 rounded-lg p-3 cursor-pointer"
                      >
                        <h1>{movie.title}</h1>
                      </div>
                    ))}

                    {series &&
                      placeHolder == "Search Series" &&
                      series.map((singleSeries, index) => (
                        <div
                          key={index}
                          className="border-2 border-light-blue-400 mb-2 rounded-lg p-3 cursor-pointer"
                          onClick={() => navigate(`/series/${singleSeries.id}`)}
                        >
                          <h1>{singleSeries.name}</h1>
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
