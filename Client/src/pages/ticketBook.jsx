import React, { useState } from 'react';
import { FaChair } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import StripeCheckout from 'react-stripe-checkout';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const TicketBooking = () => {
  const [rows, setRows] = useState(6); // Set initial rows
  const [cols, setCols] = useState(10); // Set initial columns
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rowLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').slice(0, rows); // Limit row labels to the number of rows

  // Function to determine if a column index is an aisle
  const isAisle = (colIndex) => {
    const middle = Math.floor(cols / 2);
    return colIndex === middle || colIndex === middle + 1;
  };

  // Generate column labels while skipping aisles
  const colLabels = [...Array(cols)].map((_, i) => i + 1).filter((col) => !isAisle(col));

  const handleSeatClick = (seatNumber) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatNumber)
        ? prevSelectedSeats.filter((seat) => seat !== seatNumber)
        : [...prevSelectedSeats, seatNumber]
    );
  };

  const handlePayment = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/api/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        credentials: "include",
        withCredentials: true,
        body: JSON.stringify({
          theaterId: 'theaterId', // Replace with actual theater ID
          movieId: 'movieId', // Replace with actual movie ID
          date: '2024-08-26',
          time: '10:00 AM',
          seats: selectedSeats,
          userId: 'userId', // Replace with actual user ID
          token: token.id,
        }),
      });

      const result = await response.json();

      if (result.ok) {
        console.log(result);
        // toast.success(result.message);
      } else {
        // toast.error(result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    //   toast.error("Payment failed");
    }
  };

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#3B1578] to-[#0B0C10] p-4'>
      <h1 className='text-3xl text-white font-bold mb-4'>Avengers: Infinity War</h1>
      <h2 className='text-2xl text-white mb-4'>Selected Theater: Theater 1</h2>
      <h3 className='text-xl text-white mb-4'>Date: 26 Aug | Time: 10:00 AM</h3>

      <div className='flex flex-col items-center overflow-y-auto'>
        {/* Column Labels */}
        <div className='flex mb-4 ml-8'>
          <div className='w-10'></div> {/* Empty space for row labels */}
          {Array.from({ length: cols }).map((_, index) => (
            !isAisle(index + 1) && (
              <div key={index} className='w-12 h-10 flex items-center justify-center text-white font-bold'>
                {index + 1}
              </div>
            )
          ))}
        </div>

        {/* Seat Grid with Row Labels */}
        <div className='overflow-x-auto'>
          {rowLabels.map((rowLabel, rowIndex) => (
            <div key={rowLabel} className='flex items-center mb-2'>
              {/* Row Label */}
              <div className='w-10 h-10 flex items-center justify-center text-white font-bold mr-2'>
                {rowLabel}
              </div>
              {/* Seats */}
              {Array.from({ length: cols }).map((_, colIndex) => {
                if (isAisle(colIndex + 1)) {
                  return <div key={colIndex} className='w-12 h-10'></div>; // Empty space for the aisle
                }

                const seatNumber = `${rowLabel}${colIndex + 1}`;
                return (
                  <div
                    key={colIndex}
                    className={`w-12 h-12 ${selectedSeats.includes(seatNumber) ? 'bg-green-500' : 'bg-blue-800'} rounded-lg cursor-pointer flex items-center justify-center mx-1`}
                    onClick={() => handleSeatClick(seatNumber)}
                  >
                    <FaChair className={`text-lg ${selectedSeats.includes(seatNumber) ? 'text-white' : 'text-gray-400'}`} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <StripeCheckout
        stripeKey={import.meta.env.VITE_STRIPE_SECRET_KEY} 
        token={handlePayment}
        name='Complete Your Payment'
        description='Payment for selected movie tickets'
        amount={selectedSeats.length * 10000} // Replace with actual price calculation
        billingAddress
        currency="INR"
      >
        <button className='mt-4 bg-gradient-to-r from-[#3B1578] to-[#B6116B] text-white text-xl font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gradient-to-l transition-all duration-500'>
          Pay
        </button>
      </StripeCheckout>
    </div>
  );
};

export default TicketBooking;
