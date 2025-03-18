
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import Input from './Input';
import toast from "react-hot-toast"
import authService from '../Services/AuthService';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unsetVerification } from '../store/OTPVerify';

export default function ChangePassword() {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const isOTPVerified = useSelector(state => state.otp.isOTPVerified);

  useEffect(() => {
    if (!isOTPVerified) {
      toast.error('You need to Verify OTP before Resetting Password !');
      navigate('/signin');
      return;
    }
  }, [location]);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    }
  });


  const submitHandler = async (data) => {
    try {
      // check password & confirmPassword
      if (data.password !== data.confirmPassword) {
        toast.error('Passwords are different ! Check Properly');
        return;
      }

      setDisable(true);

      let response = await authService.resetPassword({ password: data.password, email });
      setDisable(false)
      if (!response.data) {
        console.log("Error in Reset Password : ", response);
        const { data: { message } } = response.response;
        toast.error(message);
        return;
      }
      const { message } = response.data;
      toast.success(message);
      dispatch(unsetVerification())
      navigate(`/signin`);
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
        <h2 className='text-3xl'>Reset Your Password!</h2>
        <form action=""
          className='flex flex-col gap-5 p-5 items-center'
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            type="password"
            placeholder="Enter New Password !"
            {...register("password", {
              required: {
                value: true,
                message: "Enter New Password To Continue!"
              },
              minLength: {
                value: 5,
                message: "Password must be atleast 5 characters Long !"
              }
            })}
            className="p-3 bg-slate-600 text-white outline-none 
            md:text-xl text-sm rounded-md cursor-pointer border-2 border-slate-600 focus:border-white
            md:w-80 sm:w-52 w-36
            "
          />
          {errors.password && <p className='text-red-300'>{errors.password.message}</p>}
          <Input
            type="password"
            placeholder="Confirm Password !"
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Confirm Password !"
              },
              minLength: {
                value: 5,
                message: "Password must be atleast 5 characters Long !"
              }
            })}
            className="p-3 bg-slate-600 text-white outline-none 
            md:text-xl text-sm rounded-md cursor-pointer border-2 border-slate-600 focus:border-white
            md:w-80 sm:w-52 w-36
            "
          />
          {errors.confirmPassword && <p className='text-red-300'>{errors.confirmPassword.message}</p>}
          <button
            type="submit"
            className="bg-red-600 p-2 rounded-md font-bold text-xl hover:bg-red-500 transition-colors w-full disabled:cursor-not-allowed"
            disabled={disable}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  )
}

