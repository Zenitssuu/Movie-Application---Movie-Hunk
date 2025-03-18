
import React from 'react'
import Movies_pic from "../../../public/Movie-setup.jpg"

const Movies= () => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full' >
    
      <img src={Movies_pic} className='h-screen w-screen opacity-90 -z-10'/>
      <div>
        <div className="bg-green-500">
          <img src="" alt="" />
        </div>
        <h1>Title:</h1>
      </div>
    </div>
  )
}

export default Movies

