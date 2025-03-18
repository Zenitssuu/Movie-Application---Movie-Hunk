import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MovieCard({ index, movie }) {
  console.log(movie);
  // console.log(movie._id);

  // const [id, setId] = useState()

  // useEffect(() => {
  //   setId(movie?._id)
  // })

  return (
    <Link
      to={`/movies/movie/${movie?._id}`}
      className="w-full min-w-[230px] max-w-[230px] h-80 overflow-hidden block rounded relative hover:scale-105 transition-all"
    >
      <img
        src={movie?.featuredImage}
        alt="poster"
        className="h-full w-full object-cover"
      />

      {index && (
        <div className="absolute top-4 ">
          <div className="py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden">
            #{index} Trending
          </div>
        </div>
      )}

      <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full  bg-black/60 p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold text-white">
          {movie?.title}
        </h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p>{movie?.releaseDate ? movie.releaseDate : "25 Sep 2024"}</p>
          <p className="bg-black px-2 py-1 rounded-full text-xs text-white">
            {movie?.rating ? movie.rating : "8.2+"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
