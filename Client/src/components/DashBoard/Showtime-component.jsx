import PropTypes from 'prop-types';

const Showtimes = ({ data = [] }) => {
  // Ensure `data` is an array, use default empty array if `data` is undefined
  return (
    <div
      className="relative flex flex-wrap justify-center items-start h-full w-full overflow-y-scroll bg-gradient-to-b from-[#3B1578] to-[#0B0C10] -z-10 p-8 gap-6 mt-16" // Adjust mt-16 based on your header's height
    >
      {data.length > 0 ? (
        data.map(d => (
          <div
            key={d._id}
            className="flex flex-col items-center bg-white bg-opacity-80 border border-gray-300 rounded-3xl shadow-xl p-6 w-[350px] max-w-full transform transition duration-300 hover:scale-105"
          >
            <h2 className="font-bold text-gray-800 text-3xl mb-4">Theater Name</h2>
            <h1 className="font-semibold text-gray-700 text-xl mb-2 text-center">{d.Name}, {d.City}</h1>
            <p className="text-gray-600 text-md mb-2 italic text-center">Address: {d.Adress}</p>
            <p className="text-gray-600 text-md mb-4">
              Capacity: {d.Capacity.row} rows x {d.Capacity.col} columns
            </p>
            {/* <button className="bg-gradient-to-r from-pink-500 to-blue-900 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:from-pink-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
              Set Show Time
            </button> */}
            <button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold py-2 px-8 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Set Show Time
            </button>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full w-full text-gray-800 text-2xl">
          No Showtimes Available
        </div>
      )}
    </div>
  );
};

Showtimes.propTypes = {
  data: PropTypes.array
};

export default Showtimes;
