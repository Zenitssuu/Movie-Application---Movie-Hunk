import mongoose, { Schema } from "mongoose";

const TheaterSchema = new Schema(
  {
   
    Name: {
      type: String,
      required: true,
      trim: true,
    },
   City: {
        type: String,
        required: true,
        trim: true,
      },
      Adress: {
        type: String,
        required: true,
        trim: true,
      },
  Capacity:{
    row:{
       type: Number,
    required: true,
    },
  col:{
       type: Number,
    required: true,
    }
  },
   ShowTime: [
    {
      movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
      time:String,
      price:Number,
      date:String
        
    }
   ]
  },
  { timestamps: true }
);

const TheaterModel = mongoose.model("Theater", TheaterSchema);

export default TheaterModel;
