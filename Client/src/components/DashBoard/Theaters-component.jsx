import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import theaterService from '../../Services/TheaterService';
import React, { useEffect, useRef, useState } from 'react';
import Movies_pic from "../../../public/Theater.jpg";

const Theaters = () => {
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
     Name: "",
     City: "",
     Adress: "",
     Capacity: ""
    }
  });

  const submitHandler = async (data) => {
    setDisable(true);
    try {
      let response = await theaterService.addTheater(data);
      setDisable(false);
      if (!response.data) {
        console.log("Error in addTheater!:", response);
        const { data: { message } } = response.response;
        toast.error(message);
        return;
      }
      toast.success('Theater added successfully!');
      navigate('/AddTheater');
      return;
    } catch (error) {
      setDisable(false);
      console.log("Error:", error);
      const { data: { message } } = error.response;
      toast.error(message);
    }
  }

  return (
    <div className="flex relative justify-center items-center h-full w-full">
      <img src={Movies_pic} alt="Movies Background" className="h-screen w-screen object-cover -z-10"/>
      <div className="border-2 absolute border-white backdrop-blur-md py-10 px-8 justify-center items-center flex flex-col gap-6 rounded-lg shadow-xl z-10 bg-gradient-to-r from-purple-800 via-pink-500 to-red-500">
        <h2 className="text-4xl font-bold text-white mb-4">Add Theater Details</h2>
        <form 
          className="flex flex-col gap-6 p-5 justify-center items-center w-full"
          onSubmit={handleSubmit(submitHandler)}
        >
          <input 
            type="text"  
            placeholder="Theater Name"
            {...register("Name", { required: { value: true, message: "Enter Name To Continue!" } })}
            className="p-4 bg-gray-800 text-white outline-none md:text-xl text-base rounded-md cursor-pointer border-2 border-gray-800 focus:border-white w-full"
          />
          <input 
            type="text" 
            placeholder="City"
            {...register("City", { required: { value: true, message: "Enter City To Continue!" } })}
            className="p-4 bg-gray-800 text-white outline-none md:text-xl text-base rounded-md cursor-pointer border-2 border-gray-800 focus:border-white w-full"
          />
          <input 
            type="text"  
            placeholder="Theater Address"
            {...register("Adress", { required: { value: true, message: "Enter Address To Continue!" } })}
            className="p-4 bg-gray-800 text-white outline-none md:text-xl text-base rounded-md cursor-pointer border-2 border-gray-800 focus:border-white w-full"
          />
          <div className="flex gap-x-4 w-full">
            <input 
              type="text" 
              placeholder="Capacity (Rows)"
              {...register("row", { required: { value: true, message: "Enter Rows To Continue!" } })}
              className="p-4 bg-gray-800 text-white outline-none md:text-xl text-base rounded-md cursor-pointer border-2 border-gray-800 focus:border-white w-1/2"
            />
            <input 
              type="text" 
              placeholder="Capacity (Columns)"
              {...register("col", { required: { value: true, message: "Enter Columns To Continue!" } })}
              className="p-4 bg-gray-800 text-white outline-none md:text-xl text-base rounded-md cursor-pointer border-2 border-gray-800 focus:border-white w-1/2"
            />
          </div>
          <button
            type="submit"
            disabled={disable}
            className="bg-gradient-to-r text-white from-pink-600 to-blue-900 p-3 rounded-md font-bold text-xl transition-colors w-full hover:from-pink-700 hover:to-blue-800 disabled:cursor-not-allowed"
          >
            Add Theater
          </button>
        </form>
      </div>
    </div>
  );
}

export default Theaters;
