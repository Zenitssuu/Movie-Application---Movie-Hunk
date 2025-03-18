import React, { useState, useEffect } from "react";
import { BestMovies, HomeBanner, Trending } from "./index.js";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setMovies as setMoviesMem } from "../store/MovieSlices.js";
import axios from "axios";

function Home() {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const savedMovies = useSelector((state) => state.movieReducer.movies);

  const findAllMovies = async () => {
    const allMovies = await axios.get("/movies/all-movies");
    dispatch(setMoviesMem(allMovies.data));
    setMovies(allMovies.data);
  };

  useEffect(() => {
    findAllMovies();
  }, []);

  return (
    <div className="py-8 px-4 lg:px-12 bg-neutral-900 text-white min-h-screen">
      <HomeBanner className="h-[70vh] rounded-lg overflow-hidden shadow-lg mb-12" />

      {/* Trending Section */}
      <div className="mt-8">
        <div className="flex justify-between items-center w-full lg:w-[60vw] px-2">
          <h1 className="text-4xl font-semibold">Trending</h1>
          <Link to="/movies/all-movies" className="text-xl text-orange-500 hover:text-orange-600 transition-colors">
            <div className="flex items-center">
              <h2 className="mr-1">View All</h2>
              <FaAngleRight />
            </div>
          </Link>
        </div>
        <div className="flex overflow-x-auto mt-4 gap-6 px-2 py-4">
          {movies?.map((movie) =>
            movie.trending === true ? (
              <Trending key={movie._id} movie={movie} />
            ) : null
          )}
        </div>
      </div>

      {/* Best of Bests Section */}
      <div className="mt-12">
        <div className="flex justify-between items-center w-full lg:w-[60vw] px-2">
          <h1 className="text-4xl font-semibold">Best of Bests</h1>
          <Link to="/movies/all-movies" className="text-xl text-orange-500 hover:text-orange-600 transition-colors">
            <div className="flex items-center">
              <h2 className="mr-1">View All</h2>
              <FaAngleRight />
            </div>
          </Link>
        </div>
        <div className="flex overflow-x-auto mt-4 gap-6 px-2 py-4">
          {movies?.slice(0, 3).map((movie) => (
            <BestMovies key={movie._id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
