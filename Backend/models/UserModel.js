import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    city: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;