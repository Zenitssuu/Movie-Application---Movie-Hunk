import Movie from "../models/MovieModel.js";
import errorHandler from "../utils/errorhandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addNewMovie = async (req, res) => {
  try {
    // console.log(req.file);
    // console.log(req.body);

    const {
      released,
      title,
      summary,
      genre,
      releaseDate,
      rating,
      trending,
      casts,
      crew,
      trailer,
    } = req.body;

    if (!released || !title || !summary) {
      return res.json(errorHandler(404, "All fields required"));
    }

    if ([title, summary].some((field) => field?.trim() === "")) {
      return res.json(errorHandler(404, "All fields required"));
    }

    const existedMovie = await Movie.findOne({ title });
    if (existedMovie) {
      return res.json(
        errorHandler(404, "Movie is already present in database")
      );
    }

    const featuredImageLocalPath = req.file.path;

    if (!featuredImageLocalPath) {
      return res.json(errorHandler(404, "featured Image for movie required"));
    }

    const featuredImageUrl = await uploadOnCloudinary(featuredImageLocalPath);

    // let tempCasts = [];
    // casts.map(curr => tempCasts.push)

    const movie = await Movie.create({
      released,
      title,
      summary,
      genre,
      featuredImage: featuredImageUrl.url,
      trailer,
      // clipsImage: req.files.clips ? clipsImageUrlArray : [],
      duration: req.body.duration ? req.body.duration : "00:00",
      releaseDate,
      trending: trending ? trending : false,
      rating,
      casts,
      crew,
    });

    if (!movie) {
      throw err;
    }
    // return res.json({ message: "error while creating a new movie" });
    return res.status(201).json({ messgae: "added successfully" });

    // later add clips section
    /* 
    let clipsLocalPath;
    let clipsImageUrlArray = [];
    const uploadClipsOnCLoudinary = async (clip) => {
      return new Promise(async (resolve, reject) => {
        try {
          clipsLocalPath = clip.path;
          const clipsUrl = await uploadOnCloudinary(clipsLocalPath);
          clipsImageUrlArray.push(clipsUrl.url);
          return resolve("Done");
        } catch (error) {
          reject(error);
        }
      });
    };
    async function add() {
      await Promise.all(req.files?.clips?.map(clip => {
        return uploadClipsOnCLoudinary(clip);
      }))

      promise.all([f1, f2,. f3])
      
    }
    add(); 
    */
  } catch (error) {
    console.log("error while creating movie");
    return res.status(404).json({ message: error.message });
  }
};

const getAllMovie = async (req, res) => {
  try {
    const allMovies = await Movie.find();
    return res.status(200).json(allMovies);
  } catch (error) {
    console.log("error while fetching movie");
    return res.status(404).json({ message: error.message });
  }
};

const getMovie = async (req, res) => {
  try {
    const movieId = req.params.slug;
    console.log("id: ",movieId);
    
    if (!movieId) return null;

    const currMovie = await Movie.findById({ _id: movieId });
    return res.status(200).json(currMovie);
  } catch (error) {
    console.log("error while fetching movie ", error.message);
    return res
      .status(404)
      .json({ message: "error while fetching movie details" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.slug;
    if (!movieId) return null;

    await Movie.deleteOne({ _id: movieId });
    return res.status(201).json({ message: "deleted Successfully" });
  } catch (error) {
    console.log("error while deleting movie ", error.message);
    return res.status(400).json({ message: error.message });
  }
};
export { addNewMovie, getAllMovie, getMovie, deleteMovie };
