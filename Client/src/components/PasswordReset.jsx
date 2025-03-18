import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import Input from './Input';
import toast from "react-hot-toast"
import authService from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';


export default function PasswordReset() {
    const [disable, setDisable] = useState(false);
    const navigate = useNavigate();;

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        defaultValues: {
            email: "",
        }
    });

    const submitHandler = async (data) => {
        setDisable(true);
        try {
            const email = data.email;
            let response = await authService.sendOTP(data);
            setDisable(false)
            if (!response.data) {
                console.log("Error in Send OTP : ", response);
                const { data: { message } } = response.response;
                toast.error(message);
                return;
            }
            const { message } = response.data;
            toast.success(message);
            navigate(`/otp/${email}`);
            return;
        } catch (error) {
            setDisable(false)
            console.log("Error :", error)
            const { data: { message } } = error.response;
            toast.error(message);
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
                <h2 className='text-3xl'>Password Recovery!</h2>
                <form action=""
                    className='flex flex-col gap-5 p-5 items-center'
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <Input
                        type="text"
                        placeholder="Enter Email !"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Enter Email To Continue!"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
                                message: "Invalid Email Format!"
                            }
                        })}
                        className="p-3 bg-slate-600 text-white outline-none 
            md:text-xl text-sm rounded-md cursor-pointer border-2 border-slate-600 focus:border-white
            md:w-80 sm:w-52 w-36
            "
                    />
                    {errors.email && <p className='text-red-300'>{errors.email.message}</p>}
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
