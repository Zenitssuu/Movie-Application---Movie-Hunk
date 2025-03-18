import React from 'react'
import Sidebar from './Sidebar'
import ShowTime from "./Showtime-component"
import { useEffect,useState } from 'react';
import theaterService from '../../Services/TheaterService';

const ShowTimes = () => {
  const [theaters, setTheaters] = useState([]);
  useEffect(() => {
    theaterService.getTheater()
      .then(theaters => {setTheaters(theaters.data); console.log(theaters)})
      .catch(error => console.error('Error fetching theaters:', error));
  }, []);

  return (
    <div className='flex flex-row h-screen w-screen' >
      <Sidebar className='flex-1 overflow-y-auto p-6 py-16' /> {theaters.length>0&&<ShowTime data={theaters}/>}
    </div>
  )
}

export default ShowTimes