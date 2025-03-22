// import React, { useState } from "react";

// interface SearchTicketsProps {
//   onSearch: (category: string, city: string) => void;
// }

// const SearchTickets: React.FC<SearchTicketsProps> = ({ onSearch }) => {
//   const [category, setCategory] = useState("");
//   const [city, setCity] = useState("");

//   return (
//     <div>
//       <h2 className="text-2xl font-semibold text-center">Search for Tickets</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//         <select
//           className="p-3 bg-gray-700 text-white rounded-md"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="">Select Sport</option>
//           <option value="NBA">NBA</option>
//           <option value="NFL">NFL</option>
//           <option value="MLB">MLB</option>
//           <option value="PGA">PGA</option>
//           <option value="UEFA">UEFA</option>
//           <option value="Esports">Esports</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Enter City"
//           className="p-3 bg-gray-700 text-white rounded-md"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />
//       </div>

//       <button
//         className="mt-6 w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-md text-white font-semibold"
//         onClick={() => onSearch(category, city)}
//       >
//         Search Tickets
//       </button>
//     </div>
//   );
// };

const SearchTickets: React.FC = () => {
    return (
      <div className="text-center py-4">
        <h2 className="text-2xl font-semibold text-white">🎟️ Ticket Search Coming Soon!</h2>
        <p className="text-gray-400">
          We are working on bringing you the best sports ticket deals. Stay tuned!
        </p>
      </div>
    );
  };
  
  export default SearchTickets;
  