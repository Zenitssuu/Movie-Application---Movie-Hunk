import mongoose, { Schema } from "mongoose";

const castSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

const CastModel = mongoose.model("Cast", castSchema);

export default CastModel;
