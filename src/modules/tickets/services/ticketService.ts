// import axios from "axios";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002"; // Change if needed

// ✅ Fetch tickets from the backend
// export const fetchTicketsFromAPI = async (category: string, city: string) => {
//   console.log("📡 Fetching tickets with:", { category, city }); // Debugging log

//   try {
//     const response = await axios.get(`${API_BASE_URL}/api/tickets`, {
//       params: { category, city },
//     });

//     console.log("✅ API Response:", response.data); // Debugging log
//     return response.data; // Returns tickets
//   } catch (error: any) {
//     if (error.response) {
//       console.error(
//         "❌ API Error:",
//         error.response.status,
//         error.response.data
//       );
//     } else {
//       console.error("❌ Network Error:", error.message);
//     }
//     throw error;
//   }
// };

// ✅ Return "Coming Soon" instead of API call
const fetchTicketsFromAPI = async () => {
  console.warn("🎟️ Ticket sales are coming soon! No events available.");
  return { tickets: [] }; // Return empty ticket list
};

export default fetchTicketsFromAPI;
