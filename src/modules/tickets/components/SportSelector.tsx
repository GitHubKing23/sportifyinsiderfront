// import { useEffect, useState } from "react";
// import { getAvailableSports } from "../services/ticketService";

// interface SportSelectorProps {
//   onSelect: (sport: string) => void;
// }

// const SportSelector: React.FC<SportSelectorProps> = ({ onSelect }) => {
//   const [sports, setSports] = useState<string[]>([]);
//   const [selectedSport, setSelectedSport] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     fetchSports();
//   }, []);

//   // ✅ Fetch Sports Categories from API
//   const fetchSports = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       const data = await getAvailableSports();

//       if (Array.isArray(data)) {
//         setSports(data);
//       } else {
//         throw new Error("Invalid data format from API");
//       }
//     } catch (err) {
//       console.error("❌ Error fetching sports:", err);
//       setError("Failed to load sports.");
//     }

//     setLoading(false);
//   };

//   const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     const sport = event.target.value;
//     setSelectedSport(sport);
//     onSelect(sport);
//   };

//   return (
//     <div className="w-full">
//       <label className="block text-white font-semibold mb-2">Select a Sport</label>
//       {loading && <p className="text-gray-400">Loading sports...</p>}
//       {error && <p className="text-red-500">{error}</p>}

//       <select
//         value={selectedSport}
//         onChange={handleSelect}
//         className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
//         disabled={loading || error !== null}
//       >
//         <option value="">-- Select Sport --</option>
//         {sports.map((sport, index) => (
//           <option key={index} value={sport}>
//             {sport}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

const SportSelector: React.FC = () => {
  return (
    <div className="text-center py-4">
      <h2 className="text-2xl font-semibold text-white">🏆 Sport Selection Coming Soon!</h2>
      <p className="text-gray-400">
        We are working on adding more sports categories. Stay tuned!
      </p>
    </div>
  );
};

export default SportSelector;
