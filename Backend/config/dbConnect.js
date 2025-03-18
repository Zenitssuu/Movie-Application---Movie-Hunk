import mongoose, {Schema} from "mongoose";
import { config } from "dotenv";
config();


export const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Databse Connection Successful !");
    } catch (error) {
        console.log(error)
        console.log("Could not connect to DB !")
        process.exit(1)
    }
}