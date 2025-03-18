
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Input from './Input';
import toast from "react-hot-toast"
import authService from '../Services/AuthService';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { setVerification, unsetVerification } from '../store/OTPVerify';


export default function OTPInput() {
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { email } = useParams();

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            otp: "",
        }
    });


    const submitHandler = async (data) => {
        setDisable(true);
        try {
            let response = await authService.verifyOTP({ ...data, email });
            setDisable(false)
            if (!response.data) {
                console.log("Error in OTP VERIFICATION : ", response);
                const { data: { message } } = response.response;
                toast.error(message);
                dispatch(unsetVerification(false))
                return;
            }
            const { message } = response.data;
            toast.success(message);
            dispatch(setVerification(true));
            navigate(`/changePassword/${email}`);
            return;
        } catch (error) {
            setDisable(false)
            console.log("Error :", error)
            const { data: { message } } = error.response;
            toast.error(message);
            dispatch(unsetVerification(false))
            return;
        }
    }

    return (
        <div
            className='min-h-screen w-screen relative flex justify-center items-center flex-wrap text-white font-montserrat p-5'
        >
            <img src="https://i.redd.it/zjgs096khv591.jpg" alt="BackGround-Image"
                className='absolute brightness-[60%] -z-10 h-full w-screen' />
            <div className='border-2 border-white backdrop-blur-2xl py-10 px-5 flex flex-col gap-5 rounded-md'>
                <h2 className='text-3xl'>Enter OTP!</h2>
                <form action=""
                    className='flex flex-col gap-5 p-5 items-center'
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <Input
                        type="text"
                        placeholder="Enter OTP To Verify !"
                        {...register("otp", {
                            required: {
                                value: true,
                                message: "Enter OTP To Continue!"
                            },
                            minLength: {
                                value: 4,
                                message: "OTP is of 4 chars length",
                            },
                            maxLength: {
                                value: 4,
                                message: "OTP is of 4 chars length",
                            }
                        })}
                        className="p-3 bg-slate-600 text-white outline-none 
            md:text-xl text-sm rounded-md cursor-pointer border-2 border-slate-600 focus:border-white
            md:w-80 sm:w-52 w-36
            "
                    />
                    {errors.otp && <p className='text-red-300'>{errors.otp.message}</p>}
                    <button
                        type="submit"
                        className="bg-red-600 p-2 rounded-md font-bold text-xl hover:bg-red-500 transition-colors w-full disabled:cursor-not-allowed"
                        disabled={disable}
                    >
                        Send OTP
                    </button>
                </form>
            </div>
        </div>
    )
}

