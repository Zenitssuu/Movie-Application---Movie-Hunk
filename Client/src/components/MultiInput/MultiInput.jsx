import React, { useState, forwardRef } from "react";
import { Input, Display } from "../index.js";
import { IoAdd } from "react-icons/io5";


function MultiInput({
  team,
  setTeam,
  label,
  placeholder
}) {
  // const [team, setTeam] = useState([]);
  const [tempValue, setTempValue] = useState("");

  const addTeam = () => {
    setTimeout(() => {
      const tempTeam = [
        ...team,
        {
          index: Date.now(),
          value: tempValue,
        },
      ];
      setTeam(tempTeam);
      setTempValue("");
    }, 500);
  };
  

  return (
    <div className="lg:w-[50dvw] max-w-[60dvw]">
        {label && <label>{label}:</label>}
      {/* add */}
      <div className="flex gap-4">
        <div className="w-full">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full py-3 px-4 rounded-lg"
            onChange={(e) => setTempValue(e.target.value)}
            value={tempValue}
          />
        </div>
        <button
        type="button"
          onClick={addTeam}
          className="bg-green-600 py-2 px-3 rounded-lg text-white text-xl font-bold"
        >
          <IoAdd />
        </button>
      </div>

      {/* display */}
      <div className="mt-5 ml-3 flex flex-col gap-2">
        {team &&
          team.map((curr) => (
            <div key={curr.index}>
            <Display curr={curr} team={team} setTeam={setTeam}/>
            </div>
          ))}
      </div>
      {/* delete warning */}
      <div></div>
    </div>
  );
}

export default MultiInput;
