import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieCard } from "../index.js";
import { FaAngleRight } from "react-icons/fa6";
import parse from "html-react-parser";
import axios from "axios";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allMovies, setAllMovies] = useState([]);

  const findAllMovies = async () => {
    const allMovies = await axios.get("/movies/all-movies");
    setAllMovies(allMovies.data);
  };

  const findMovie = async () => {
    try {
      const response = await axios.get(`/movies/single-movie/${id}`);
      setMovie(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch movie data", error);
    }
  };

  useEffect(() => {
    findAllMovies();
    findMovie();
  }, [id]);

  return loading ? (
    <h1 className="text-center text-white text-3xl font-bold mt-20">
      Loading...
    </h1>
  ) : (
    <div className="px-4 lg:px-10 py-8 bg-neutral-900 text-white mt-16">
      <div className="relative mb-8">
        <div className="hover:scale-105 duration-300 transition-transform">
          <div className="drop-shadow-2xl rounded-lg overflow-hidden">
            <img
              src={movie?.featuredImage}
              alt="Banner"
              className="h-[500px] w-full object-cover"
            />
          </div>
          <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-950 to-transparent"></div>
        </div>

        {/* Movie Details */}
        <div className="container mx-auto absolute bottom-0 left-0 right-0 px-5 lg:px-20 py-6 bg-black/70 rounded-lg backdrop-blur-lg">
          <h2 className="text-3xl lg:text-5xl font-extrabold">
            {movie?.title}
          </h2>
          <p className="text-lg lg:text-xl mt-4 line-clamp-3">
            {parse(movie?.summary)}
          </p>
          <div className="flex items-center gap-4 text-lg font-semibold mt-4">
            <p>Rating: {movie?.rating || "N/A"}</p>
            <p>Duration: {movie?.duration || "Unknown"}</p>
            <p>Release Date: {movie?.releaseDate || "Not Released"}</p>
          </div>
          <div className="flex gap-2 mt-4">
            {movie?.genre?.map((g, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-orange-600 rounded-full text-sm"
              >
                {g}
              </span>
            ))}
          </div>
          <div className="flex gap-4 mt-6">
            <Link to={movie?.trailer || "#"} target="_blank">
              <button className="bg-gradient-to-r from-red-600 to-orange-500 px-6 py-3 text-lg font-bold rounded-lg hover:opacity-90 transition-all">
                Watch Trailer
              </button>
            </Link>
            <Link to="/reservation">
              <button className="bg-gradient-to-r from-blue-600 to-purple-500 px-6 py-3 text-lg font-bold rounded-lg hover:opacity-90 transition-all">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="lg:mt-12 lg:px-12">
        {/* Casts Section */}
        <section className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">Casts</h1>
          <div className="w-full lg:w-[60vw] bg-neutral-800 p-4 rounded-lg">
            <ul className="list-disc pl-5">
              {movie?.casts?.map((cast, index) => (
                <li key={index} className="text-lg font-medium mb-2">
                  {cast}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="w-full lg:w-[60vw] border-t border-neutral-700 my-10"></div>

        {/* Crew Section */}
        <section className="mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">Crew</h1>
          <div className="w-full lg:w-[60vw] bg-neutral-800 p-4 rounded-lg">
            <ul className="list-disc pl-5">
              {movie?.crew?.map((crewMember, index) => (
                <li key={index} className="text-lg font-medium mb-2">
                  {crewMember}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="w-full lg:w-[60vw] border-t border-neutral-700 my-10"></div>

        {/* Recommended Movies Section */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-semibold">
              You Might Also Like
            </h1>
            <Link
              to="/movies/all-movies"
              className="text-xl text-orange-600 flex items-center"
            >
              <span>View All</span>
              <FaAngleRight className="ml-2" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {allMovies?.slice(0, 3).map((movie, index) => (
              <MovieCard key={movie._id} movie={movie} index={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Movie;
