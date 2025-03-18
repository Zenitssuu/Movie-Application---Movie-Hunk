import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieImage from '../../public/reservationPage.jpg';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const ReservationPage = () => {
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const theaters = ['Theater 1', 'Theater 2', 'Theater 3', 'Theater 4', 'Theater 5', 'Theater 6'];
  const dates = ['26 Aug', '27 Aug', '28 Aug', '29 Aug', '30 Aug', '31 Aug'];

  const handleTheaterSelect = (theater) => {
    setSelectedTheater(theater);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleBookTicket = () => {
    if (selectedDate && selectedTheater) {
      navigate('/ticketBooking'); // Navigate to the ticket booking page
    }
  };

  return (
    <div className="h-full w-full overflow-y-scroll flex items-center justify-center pt-96"> {/* Added padding-top */}
      <img
        src={MovieImage}
        className="absolute top-0 left-0 right-0 bottom-0 filter brightness-50 contrast-100 -z-10"
        alt="Movie Image"
      />
      <div className="flex flex-col justify-center items-center">
        <p className="text-white text-3xl font-bold">Avengers: Infinity War</p>
        <p className="text-white text-center max-w-2xl mt-2">
          The Avengers must stop Thanos, an intergalactic warlord, from getting his hands on all the infinity stones. However, Thanos is prepared to go to any lengths to carry out his insane plan.
        </p>
        <p className="text-white text-xl font-semibold m-4">Select a Date and Time</p>
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="h-48 w-screen text-3xl"
        >
          {dates.map((date, index) => (
            <SwiperSlide key={index} onClick={() => handleDateSelect(date)}>
              <div className={`bg-gradient-to-r from-[#3B1578] to-[#B6116B] p-8 rounded-lg shadow-xl transform-gpu hover:scale-105 transition-all duration-500 relative w-fit h-fit ${selectedDate === date ? 'border-4 border-yellow-500' : ''}`}>
                <div className="absolute inset-0 rounded-lg blur-lg opacity-75 bg-gradient-to-r from-[#3B1578] to-[#B6116B] animate-pulse"></div>
                <div className="relative z-10 flex flex-col justify-center items-center">
                  <h1 className="text-white text-2xl font-bold">{date}</h1>
                  <h1 className="text-white text-2xl font-bold">10:00 AM</h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <p className="text-white text-xl font-semibold m-4">Select a Theater</p>
        <Swiper
          slidesPerView={6}
          spaceBetween={10}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="h-48 w-screen text-3xl"
        >
          {theaters.map((theater, index) => (
            <SwiperSlide key={index} onClick={() => handleTheaterSelect(theater)}>
              <div className={`bg-gradient-to-r from-[#3B1578] to-[#B6116B] p-8 rounded-lg shadow-xl transform-gpu hover:scale-105 transition-all duration-500 relative w-fit h-fit ${selectedTheater === theater ? 'border-4 border-yellow-500' : ''}`}>
                <div className="absolute inset-0 rounded-lg blur-lg opacity-75 bg-gradient-to-r from-[#3B1578] to-[#B6116B] animate-pulse"></div>
                <div className="relative z-10 flex flex-col justify-center items-center">
                  <h1 className="text-white text-2xl font-bold">{theater}</h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {selectedDate && selectedTheater ? (
          <button
            onClick={handleBookTicket}
            className="mt-8 bg-gradient-to-r from-[#3B1578] to-[#B6116B] text-white text-xl font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gradient-to-l transition-all duration-500"
          >
            Book Ticket
          </button>
        ) : (
          <button
            disabled
            className="mt-8 bg-gray-500 text-white text-xl font-bold py-3 px-8 rounded-lg shadow-lg"
          >
            Select Date and Theater to Book
          </button>
        )}
      </div>
    </div>
  );
};

export default ReservationPage;
