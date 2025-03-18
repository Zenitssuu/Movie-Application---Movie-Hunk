import React from 'react'
import image from "../../assests/try.png"

function Cast() {
    return (
        <div 
        className='border rounded-t-2xl rounded-b-lg border-black min-w-[150px] max-w-[150px] p-2'>
            <div className='border border-slate-600 drop-shadow-2xl h-[100px] w-[100px] rounded-full overflow-hidden mx-auto'>
            <img src={image} alt="actor" className='h-full w-full object-cover'/>
            </div>
            <p className='text-center text-lg font-bold'>Name</p>
            <p className='text-center'>Role</p>
        </div>
    )
}

export default Cast
