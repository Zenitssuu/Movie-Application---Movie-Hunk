import express from "express"
const router = express.Router();
import {googleSignIn, signIn, signUp, sendOTP, verifyOTP, resetPassword} from "../controllers/AuthController.js";


router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/googleSignIn', googleSignIn)
router.post('/sendOTP', sendOTP)
router.post('/verifyOTP', verifyOTP)
router.post('/resetPassword', resetPassword)



export default router