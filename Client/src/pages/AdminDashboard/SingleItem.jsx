import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { removeTodo, updateTodo } from '../../Features/todoSlice.js';
import { FaAngleRight } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { deleteMovie as deleteMovieMem } from "../../store/MovieSlices.js";
import parse from "html-react-parser";
import axios from "axios";

function Item({ movie }) {
  console.log(movie);

  const dispatch = useDispatch();
  // const [title, setTitle] = useState(movie?.title);
  // const [summary, setSummary] = useState(movie?.summary);
  const [isSelected, setIsSelected] = useState(false);
  const [display, setDisplay] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const updateTask = () => {};

  const handleDisplay = () => {
    setDisplay((prev) => !prev);
  };

  const handleDelete = async () => {
    const id = movie?._id;
    const response = await axios.delete(`/movies/delete-movie/${movie?._id}`);
    if (response.data.message === "deleted Successfully") {
      dispatch(deleteMovieMem(id));
    }
  };

  const handleChange = () => {};

  return (
    <div className="w-full">
      <div
        className={`w-3/4 flex justify-between p-2 gap-x-2 mx-auto ${
          isSelected ? "line-through bg-red-300" : ""
        }`}
      >
        {/* <input
          type="checkbox"
          checked={isSelected}
          onChange={() => setIsSelected((prev) => !prev)}
        /> */}
        <button
          className={`duration-150 ${
            display ? "rotate-90" : "rotate-0"
          } text-xl font-bold flex items-center`}
          onClick={handleDisplay}
        >
          <FaAngleRight />
        </button>

        <div className="w-9/12 border-green-500">
          <input
            className={`w-full py-2 px-3 h-full rounded-md ${
              isEditable ? "bg-white text-black" : "bg-slate-500 text-white"
            }`}
            type="text"
            readOnly={!isEditable}
            onChange={(e) => setTitle(e.target.value)}
            value={movie.title}
          />
        </div>
        <div className="flex gap-x-3 ">
          {/* <button
            className="bg-yellow-400 py-2 px-3 rounded-md font-semibold"
            onClick={() => {
              if (isEditable) {
                updateTask();
                setIsEditable(false);
              } else {
                setIsEditable(true);
              }
            }}
          >
            {isEditable ? <IoMdSave /> : <MdModeEditOutline />}
          </button> */}
          <button
            onClick={handleDelete}
            className="bg-red-600 py-2 px-3 rounded-md font-semibold"
          >
            <MdDelete />
          </button>
        </div>
      </div>
      <div
        className={`flex justify-start w-[full] mt-5 px-10 flex-col gap-2 ${
          display ? "visible" : "hidden"
        } duration-200`}
      >
        <h1 className="text-xl font-bold  mx-auto">Summary :</h1>
        <p className="w-[600px] min-h-[300px] text-lg bg-white p-2 rounded-lg drop-shadow-sm shadow-lg mx-auto">
          {parse(movie.summary)}
        </p>
      </div>
    </div>
  );
}

export default Item;
