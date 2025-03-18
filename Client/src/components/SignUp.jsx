import React, { useEffect, useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import Input from './Input';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import authService from '../Services/AuthService';


export default function SignUp() {

  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      contactNo: "",
      city: "",
    }
  });


  const submitHandler = async (data) => {
    setDisable(true);
    try {
      let response = await authService.signup(data);
      setDisable(false);
      if (!response.data) {
        console.log("Error in signup ! : ", response);
        const { data: { message } } = response.response;
        toast.error(message);
        return;
      }
      toast.success('User Signed up!');
      navigate('/signin');
      return;
    } catch (error) {
      setDisable(false);
      console.log("Error :", error)
      const { data: { message } } = error.response;
      toast.error(message);
    }
  }

  return (
    <div
      className='min-h-screen w-screen relative flex justify-center items-center flex-wrap text-white font-montserrat p-5'
    >
      <img src="https://i.redd.it/zjgs096khv591.jpg" alt="BackGround-Image"
        className='absolute brightness-[60%] -z-10 h-full w-screen' />
      <div className='border-2 border-white backdrop-blur-2xl py-10 px-5 flex flex-col gap-5 rounded-md'>
        <h2 className='text-3xl'>Sign Up Now!</h2>
        <form action=""
          className='flex flex-col gap-5 p-5 items-center'
          onSubmit={handleSubmit(submitHandler)}
        >
          <Input
            type="text"
            placeholder="Enter Username !"
            {...register("username", {
              required: {
                value: true,
                message: "Enter Username To Continue!"
              },
            })}
            className="p-3 bg-slate-600 text-white outline-none 
            md:text-xl text-sm rounded-md cursor-pointer border-2 border-slate-600 focus:border-white
            md:w-80 sm:w-52 w-36
            "
          />
          {errors.username && <p className='text-red-300'>{errors.username.message}</p>}
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
          <Input
            type="password"
            placeholder="Enter Password !"
            {...register("password", {
              required: {
                value: true,
                message: "Enter Password To Continue!"
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
            type="text"
            placeholder="Enter Contact No!"
            {...register("contactNo", {
              required: {
                value: true,
                message: "Enter Contact No. To Continue!"
              },
              pattern: {
                value: /^\d+$/g,
                message: "Only Numbers Allowed !",
              },
            })}
            className="p-3 bg-slate-600 text-white outline-none 
            md:text-xl text-sm rounded-md cursor-pointer border-2 border-slate-600 focus:border-white
            md:w-80 sm:w-52 w-36
            "
          />
          {errors.contactNo && <p className='text-red-300'>{errors.contactNo.message}</p>}
          <Input
            type="text"
            placeholder="Enter City!"
            {...register("city", {
              required: {
                value: true,
                message: "Enter City To Continue!"
              },
            })}
            className="p-3 bg-slate-600 text-white outline-none 
            md:text-xl text-sm rounded-md cursor-pointer border-2 border-slate-600 focus:border-white
            md:w-80 sm:w-52 w-36
            "
          />
          {errors.city && <p className='text-red-300'>{errors.city.message}</p>}
          <button
            type="submit"
            className="bg-red-600 p-2 rounded-md font-bold text-xl hover:bg-red-500 transition-colors w-full disabled:cursor-not-allowed"
            disabled={disable}
          >
            Sign Up
          </button>
        </form>
        <h2>Already Have An Account ?
          <Link to='/signin' className='ml-2 hover:underline underline-offset-2 font-bold'>
            <span>Sign In Now</span>
          </Link>
        </h2>
      </div>
    </div>
  )
}
