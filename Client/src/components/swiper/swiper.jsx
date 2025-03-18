import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../swiper/style.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies as setMoviesMem } from "../../store/MovieSlices.js";
import axios from "axios";
import parse from "html-react-parser";

export default function SwiperComponent({ className = "" }) {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();

  const findAllMovies = async () => {
    const allMovies = await axios.get("/movies/all-movies");
    console.log("Movies : ", allMovies.data);
    dispatch(setMoviesMem(allMovies.data));
    setMovies(allMovies.data);
  };

  useEffect(() => {
    findAllMovies();
  }, []);

  return (
    <>
      {movies.length > 0 && (
        <div className="mt-16">
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            className={`mySwiper ${className}`}
          >
            {movies.map((movie) => (
              <SwiperSlide key={movie?._id} className={`w-full ${className}`}>
                <div className="h-full w-full relative">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${movie.featuredImage})`,
                    }}
                  />
                  <div className="absolute top-0 w-full h-full bg-gradient-to-t from-black to-transparent rounded-md"></div>

                  {/* Movie Details */}
                  <div className="absolute bottom-0 left-0 p-8 max-w-md bg-opacity-50 bg-black rounded-br-lg">
                    <h2 className="font-bold text-4xl text-white shadow-md mb-4">
                      {movie.title}
                    </h2>
                    <p className="text-white text-lg line-clamp-3 mb-4">
                      {parse(movie.summary)}
                    </p>
                    <div className="flex items-center gap-4 text-white font-semibold mb-4">
                      <p>{movie.rating ? movie.rating : "8.3+"}</p>
                    </div>
                    <div className="flex justify-start">
                      <Link to="/reservation">
                        <button className="bg-gradient-to-r from-[#3B1578] to-[#B6116B] text-white px-6 py-3 font-bold rounded-lg shadow-lg hover:from-[#B6116B] hover:to-[#3B1578] transition-all hover:scale-105">
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
