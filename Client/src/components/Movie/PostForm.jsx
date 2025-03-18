import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { RTE, Input, Select, MultiInput } from "../index.js";

function PostForm({ movie }) {
  const [casts, setCasts] = useState([]);
  const [crew, setCrew] = useState([]);
  const [genre, setGenre] = useState([]);
  const { register, handleSubmit, setValue, getValues, control, reset } = useForm({
    defaultValues: {
      title: movie?.title || "",
      summary: movie?.content || "",
      trending: movie?.trending || false,
      released: movie?.released || false,
      genre: movie?.genre || [],
      trailer: movie?.trailer || "",
      poster: movie?.poster || "",
      duration: movie?.duration || "",
      rating: movie?.rating || "",
      crew: movie?.crew || [],
      cast: movie?.cast || [],
    },
  });

  const submit = async (data) => {
    let tempCrew = [];
    let tempCasts = [];
    let tempGenre = [];

    genre.map((curr) => {
      if (typeof curr === "object") {
        tempGenre.push(curr.value);
      }
    });
    casts.map((curr) => {
      if (typeof curr === "object") {
        tempCasts.push(curr.value);
      }
    });
    crew.map((curr) => {
      if (typeof curr === "object") {
        tempCrew.push(curr.value);
      }
    });

    const formData = new FormData();
    formData.append("released", data.released === "true" ? true : false);
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("genre", tempGenre);
    formData.append("trailer", data.trailer);
    formData.append("featuredImage", data.poster[0]);
    formData.append("duration", data.duration ? data.duration : "");
    formData.append("releaseDate", data.releaseDate ? data.releaseDate : "");
    formData.append("trending", data.trending === "true" ? true : false);
    formData.append("rating", data.rating ? data.rating : "");
    formData.append("casts", tempCasts);
    formData.append("crew", tempCrew);

    try {
      const response = await axios.post("/movies/add-movie", formData);
      if (response.data.message === 'added successfully') {
        reset();
      }
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen  py-10 px-5">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Movie</h1>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col gap-6"
          encType="multipart/form-data"
        >
          {/* Title */}
          <Input
            label="Title:"
            type="text"
            placeholder="Type your movie title"
            {...register("title", { required: "Title is required" })}
          />

          {/* Summary */}
          <RTE
            label="Summary:"
            name="summary"
            content={getValues("summary")}
            control={control}
            {...register("summary", { required: "Summary is required" })}
          />

          {/* Trailer Link */}
          <Input
            label="Trailer:"
            type="text"
            placeholder="Type your trailer link"
            {...register("trailer", { required: "Trailer link is required" })}
          />

          {/* Poster */}
          <Input
            label="Poster:"
            type="file"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("poster", { required: "Poster is required" })}
          />

          {/* Trending */}
          <Select
            options={["true", "false"]}
            label="Trending:"
            className="w-full"
            {...register("trending", { required: "Trending status is required" })}
          />

          {/* Released */}
          <Select
            options={["true", "false"]}
            label="Released:"
            className="w-full"
            {...register("released", { required: "Release status is required" })}
          />

          {/* Genre */}
          <MultiInput
            team={genre}
            setTeam={setGenre}
            label="Genre"
            placeholder="Add genres"
          />

          {/* Casts */}
          <MultiInput
            team={casts}
            setTeam={setCasts}
            label="Casts"
            placeholder="Add casts"
          />

          {/* Crew */}
          <MultiInput
            team={crew}
            setTeam={setCrew}
            label="Crew"
            placeholder="Add crew members"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {movie ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostForm;
