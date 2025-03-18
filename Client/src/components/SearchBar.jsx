import React,{useState} from 'react'
import { IoSearch } from "react-icons/io5";


function SearchBar() {
    const [searchInput, setsearchInput] = useState("");
    console.log(searchInput);
    
    return (
        <div className="bg-slate-100 flex items-center h-full rounded-lg">
        <input
          placeholder="Seach for movies, tvshows and everything else ..."
          className=" p-2 border-black rounded-lg min-w-[500px] bg-transparent"
          onChange={e => {
            setInterval(() => {
                setsearchInput(e.target.value)
            }, 2000);
        }}
        />
        <button className="border-l-2 pl-2 border-black h-full text-3xl">
          <IoSearch />
        </button>
      </div>
    )
}

export default SearchBar
