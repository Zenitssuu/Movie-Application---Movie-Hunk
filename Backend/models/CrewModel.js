import mongoose, { Schema } from "mongoose";

const crewSchema = new Schema({
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

const CrewModel = mongoose.model("Crew", castSchema);

export default CrewModel;
