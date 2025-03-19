import React, { useEffect, useState } from "react";
import { MovieCard } from "../index.js";
import { useSelector } from "react-redux";

function BestMovies() {
  const [movies, setMovies] = useState([]);
  const savedMovies = useSelector((state) => state.movieReducer.movies);

  useEffect(() => {
    setMovies(savedMovies);
  });
  return (
    <div className="flex overflow-x-auto mt-4 gap-6 px-2 py-4">
      {movies?.slice(0, 3).map((movie) => (
        <MovieCard key={movie._id} movie={movie} />
      ))}
    </div>
  );
}

export default BestMovies;
