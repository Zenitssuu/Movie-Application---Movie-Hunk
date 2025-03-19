import React, { useEffect, useState } from "react";
import { Loading, MovieCard } from "../index.js";
import { useSelector } from "react-redux";

function Trending() {
  const [movies, setMovies] = useState([]);
  const savedMovies = useSelector((state) => state.movieReducer.movies);

  useEffect(() => {
    setMovies(savedMovies);
  });

  return (
    <div>
      {movies.length === 0 && (
        <div className="flex gap-4 relative w-[330px] h-80 mt-4">
          <Loading className="w-full h-full" />
          <Loading className="w-full h-full" />
          <Loading className="w-full h-full" />
        </div>
      )}
      <div className="flex overflow-x-auto mt-4 gap-6 px-2 py-4">
        {movies?.map((movie, index) => (
          <MovieCard key={movie._id} movie={movie} index={index + 1} />
        ))}
      </div>
    </div>
  );
}

export default Trending;
