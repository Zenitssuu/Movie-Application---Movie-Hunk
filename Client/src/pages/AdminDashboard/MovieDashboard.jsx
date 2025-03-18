import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies as setMoviesMem } from "../../store/MovieSlices.js";
import axios from "axios";

import SingleItem from "./SingleItem.jsx";
import { setMovies } from "../../store/MovieSlices.js";

function MovieDashboard() {
  const dispatch = useDispatch();
  // const todos = useSelector((state)=>state.todos)
  //   console.log(tempMovies);
  const [movies, setMovies] = useState([]);
  const tempMovies = useSelector((state) => state.movieReducer.movies);

  const findMovies = async () => {
    if (tempMovies.length === 0) {
      const response = await axios.get("/movies/all-movies");
      console.log(response.data);
      setMovies(response.data);
      dispatch(setMoviesMem(movies));
    }
  };

  useEffect(() => {
    findMovies();
  }, []);

  //   const allMovies = async () => {};

  return (
    <div className="w-full min-h-[100dvh]">
      <h1 className="mt-3 text-3xl font-bold italic ... text-black text-center">All Movies</h1>
      <div className="mt-4 w-full">
        <ul className="">
          {movies?.map((movie) => (
            <li className="w-full border-b-2 mb-4" key={movie?._id}>
              <SingleItem movie={movie} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MovieDashboard;
