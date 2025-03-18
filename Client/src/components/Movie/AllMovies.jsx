import React, { useState } from "react";
import { useSelector } from "react-redux";
import { HomeBanner, MovieCard, Select } from "../index.js";
import { FaFilter } from "react-icons/fa";

function AllMovies() {
  const savedMovies = useSelector((state) => state.movieReducer.movies);
  const city = useSelector((state) => state.locationReducer.City);

  const genres = [
    "All",
    "Action",
    "Romance",
    "Comedy",
    "Adventure",
    "SciFi",
    "Thriller",
    "Horror",
  ];

  return (
    <div className="px-4 lg:px-10 py-8 bg-neutral-900 text-white min-h-screen">
      <div className="mt-5">
        <HomeBanner className="h-[30rem] rounded-lg overflow-hidden shadow-lg" />
      </div>

      <div className="flex flex-col lg:flex-row justify-between mt-16 gap-8">
        {/* Left: Filters */}
        <div className="w-full lg:w-1/4">
          <h1 className="text-3xl font-bold mb-6 flex items-center">
            <FaFilter className="mr-2 text-red-400" />
            Filters
          </h1>
          <div className="bg-neutral-800 p-6 rounded-lg shadow-lg space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Genre</h2>
              <Select
                className="w-full bg-neutral-700  rounded-lg outline-none p-3"
                options={genres}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Format</h2>
              <Select
                className="w-full bg-neutral-700  rounded-lg outline-none p-3"
                options={["2D", "3D"]}
              />
            </div>
          </div>
        </div>

        {/* Right: Movies Listing */}
        <div className="w-full lg:w-3/4">
          <h1 className="text-3xl font-bold mb-8">
            Movies Available in{" "}
            <span className="text-red-400 underline underline-offset-4">
              {city.name}
            </span>
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedMovies.length > 0 ? (
              savedMovies.map((movie) => (
                <MovieCard key={movie._id} movie={movie} />
              ))
            ) : (
              <p className="col-span-full text-center text-lg text-red-400">
                No movies available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllMovies;
