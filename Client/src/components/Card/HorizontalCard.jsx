import React, { useRef } from "react";
import Cast from "./cast.jsx";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
function HorizontalCard() {
  const contaierRef = useRef();
  const data = [
    { index: 1 },
    { index: 2 },
    { index: 3 },
    { index: 4 },
    { index: 5 },
    { index: 6 },
    { index: 7 },
    { index: 8 },
  ];
  const handleNext = () => {
    contaierRef.current.scrollLeft += 300;
  };
  const handlePrevious = () => {
    contaierRef.current.scrollLeft -= 300;
  };
  return (
    
      <div className="relative">
        <div
          ref={contaierRef}
          className="grid grid-cols-[repeat(auto-fit,150px)] grid-flow-col gap-6 overflow-x-scroll relative scroll-smooth transition-all scrollbar-hide z-10"
        >
          {data.map((curr) => (
            <div className=" mt-5 hover:-translate-y-3 hover:z-15 duration-200 hover:scale-105 hover:translate-x-3 cursor-pointer">
              <Cast key={curr.index} />
            </div>
          ))}
        </div>

        <div className="absolute top-0 hidden lg:flex justify-between w-full h-full items-center">
          <button
            onClick={handlePrevious}
            className="bg-white p-1 text-black rounded-full -ml-6 z-10"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -mr-6 z-10"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

  );
}

export default HorizontalCard;
