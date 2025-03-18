import React from "react";
import { MdDelete } from "react-icons/md";


function Display({ 
  curr, 
  team, 
  setTeam }) {

  // console.log(team);

  const deleteCurr = () => {
  
    
    const tempTeam = team.filter(temp => temp.index !== curr.index);
    setTeam(tempTeam);
  };

  return (
    <div className="flex">
      <div className="bg-[#fff9c4] w-1/2 rounded-md">
        <p className="p-2">{curr.value}</p>
      </div>
      <button
        onClick={deleteCurr}
        className="ml-4 bg-red-500 py-2 px-3 rounded-md text-xl text-white"
      >
        <MdDelete />
      </button>
    </div>
  );
}

export default Display;
