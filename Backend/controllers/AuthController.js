import UserModel from "../models/UserModel.js";
import errorHandler from "../utils/errorhandler.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { config } from "dotenv"
config();
import nodemailer from "nodemailer"
import OTPModel from "../models/OTPModel.js";
import otpGenerator from 'otp-generator'

async function sendEmail(email) {
    try {
        const OTP = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.NODEMAILER_ADMIN_EMAIL,
                pass: process.env.PASSKEY_NODEMAILER,
            },
        });

        const info = await transporter.sendMail({
            from: `"Movie-Website " <${process.env.NODEMAILER_ADMIN_EMAIL}>`, // sender address
            to: email, // list of receivers
            subject: "Password Recovery", // Subject line
            text: `OTP - ${OTP}`, // plain text body
            html: `<b>Your OTP for password recovery is : ${OTP}</b>`, // html body
        });

        // create OTP
        await OTPModel.create({
            email,
            otp: OTP,
        })
        return info;

    } catch (error) {
        console.log(error)
        return false;
    }
}


export async function signIn(req, res, next) {
    const { email, password } = req.body;
    try {
        let existingUser = await UserModel.findOne({ email });
        if (!existingUser) return next(errorHandler(404, "User Not Found !"));

        let result = await bcryptjs.compare(password, existingUser.password);
        if (!result) return next(errorHandler(404, "Incorrect Password !"));

        const tokenOptions = {
            expiresIn: 1000 * 60 * 60 * 24,
        }

        const token = jwt.sign({
            userId: existingUser._id,
            isAdmin: existingUser.isAdmin,
        }, process.env.JWT_SECRET, tokenOptions)

        const { password: hashedPassword, ...restUserDetails } = existingUser._doc;

        return res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24}).status(200).json({
            success: true,
            message: "User SignIn Successful !",
            userData: restUserDetails,
        })

    } catch (error) {
        next(error)
    }
}

export async function signUp(req, res, next) {
    console.log(req.body);
    const { username, email, password, contactNo, city } = req.body;
    try {
        try {
            const hashedPassword = await bcryptjs.hash(password, 10)

            const existingUser = await UserModel.findOne({ email });
            if (existingUser) next(errorHandler(400, "User Already Exists !"))


            const newUser = await UserModel.create({
                username, email, password: hashedPassword,
                contactNo, city
            })

            return res.status(200).json({ success: true, message: "User Created Successfully !" })
        } catch (error) {
            console.log(error);
            next(errorHandler(400, "Check Credentials ! Username & Email should be unique !"))
        }
    } catch (error) {
        next(error)
    }
}

export async function googleSignIn(req, res, next) {
    try {
        const { displayName, email, photoURL } = req.body;
        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            // already registered (signup)
            const tokenOptions = {
                expiresIn: 1000 * 60 * 60 * 2,
            }

            const token = jwt.sign({
                userId: existingUser._id,
                isAdmin: existingUser.isAdmin,
            }, process.env.JWT_SECRET, tokenOptions)

            const { password: hashedPassword, ...restUserDetails } = existingUser._doc;

            return res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 2, sameSite: 'None', httpOnly: true, secure: true }).status(200).json({
                success: true,
                message: "User SignIn Successful !",
                user: restUserDetails,
            })
        }
        else {
            // new joineee
            const randomPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)

            const hashedPassword = await bcryptjs.hash(randomPassword, 10);

            const newUser = await UserModel.create({
                username: displayName.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePic: photoURL,
            })

            const tokenOptions = {
                expiresIn: 1000 * 60 * 60 * 2,
            }

            const token = jwt.sign({
                userId: newUser._id,
                isAdmin: newUser.isAdmin,
            }, process.env.JWT_SECRET, tokenOptions)

            const { password: hash, ...restUserDetails } = newUser._doc;

            return res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 2, sameSite: 'None', httpOnly: true, secure: true }).status(200).json({
                success: true,
                message: "User SignUP Successful !",
                user: restUserDetails,
            })
        }
    } catch (error) {
        next(error)
    }
}

export async function sendOTP(req, res, next) {
    try {
        const { email } = req.body;

        let existingUser = await UserModel.findOne({ email });
        if (!existingUser) return next(errorHandler(404, "User Not Found !"));

        let info = await sendEmail(email);
        if (!info) {
            next(errorHandler(500, "Could not send OTP !"));
            return;
        }
        return res.status(200).json({
            success: true,
            message: "OTP Sent Successfully !",
        })

    } catch (error) {
        next(error)
    }
}

export async function verifyOTP(req, res, next) {
    try {
        const { otp, email } = req.body;
        const findOTP = await OTPModel.findOne({ email, otp });
        if (!findOTP) {
            next(400, "OTP is Not valid anymore!")
            return;
        }
        return res.status(200).json({
            success: true,
            message: "OTP VERIFIED !",
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export async function resetPassword(req, res, next) {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcryptjs.hash(password, 10);

        let existingUser = await UserModel.findOne({ email });
        if (!existingUser) return next(errorHandler(404, "User Not Found !"));

        let updatedUser = await UserModel.findOneAndUpdate({ email }, {
            password: hashedPassword,
        }, { new: true })

        return res.status(200).json({
            success: true,
            message: "Password Reset Success !",
        })
    } catch (error) {
        next(error);
    }
}