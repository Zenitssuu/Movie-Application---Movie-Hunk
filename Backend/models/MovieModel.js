import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema(
  {
    released: {
      type: Boolean,
      required: true,
      default: false,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      required: true,
      trim: true,
    },
    genre: [
      {
        type: String,
        required: true,
      },
    ],
    trailer: {
      type: String,
      required: true, //youtube trailer link
    },
    featuredImage: {
      type: String, //cloudinary url
      required: true,
    },
    // clipsImage: [
    //   //clips required if movie is released
    //   {
    //     type: String, //cloudinary url
    //   },
    // ],
    duration: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
    trending: {
      type: Boolean,
      required: true,
      default: false,
    },
    rating: {
      type: String,
    },
    casts: [
      {
        type: String,
        required: true,
      },
    ],
    crew: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);


const MovieModel = mongoose.model("Movie", movieSchema);

export default MovieModel;
